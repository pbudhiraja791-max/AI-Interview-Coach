import { db } from '../services/memoryDbService.js';
import { generateAdaptiveQuestion } from '../services/ai/interviewEngine.js';
import { evaluateCandidateAnswer, generateFinalInterviewEvaluation } from '../services/ai/evaluationEngine.js';

export async function setupInterview(req, res) {
  try {
    const {
      role,
      interviewType,
      difficulty,
      personality,
      mode,
      durationMinutes,
      totalQuestions,
      customApiKey
    } = req.body;

    const user = req.user;
    const resumeData = await db.getResumeByUserId(user._id);
    const jobData = await db.getJobDescriptionByUserId(user._id);

    const interview = await db.createInterview({
      userId: user._id,
      role: role || user.targetRole || "Software Engineer",
      interviewType: interviewType || "Technical",
      difficulty: difficulty || "Adaptive",
      personality: personality || "Professional",
      mode: mode || "Text",
      durationMinutes: Number(durationMinutes) || 20,
      totalQuestions: Number(totalQuestions) || 5,
      questions: []
    });

    // Generate First Question immediately
    const firstQ = await generateAdaptiveQuestion({
      role: interview.role,
      experienceLevel: user.experienceLevel,
      skills: user.skills,
      interviewType: interview.interviewType,
      difficulty: interview.difficulty,
      currentDifficultyScore: interview.currentDifficultyScore,
      personality: interview.personality,
      previousQuestions: [],
      previousAnswers: [],
      previousScores: [],
      resumeData,
      jobData
    }, customApiKey);

    const questionObj = {
      questionId: `q_${Date.now()}_1`,
      questionText: firstQ.questionText,
      topic: firstQ.topic,
      difficultyLevel: firstQ.difficultyLevel || interview.currentDifficultyScore,
      isFollowUp: false,
      expectedConcepts: firstQ.expectedConcepts || [],
      candidateAnswer: null,
      speechMetrics: null,
      evaluation: null,
      answeredAt: null
    };

    interview.questions.push(questionObj);
    await db.updateInterview(interview._id, { questions: interview.questions });

    res.status(201).json({
      success: true,
      message: 'Interview session initialized',
      interview
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getInterview(req, res) {
  try {
    const { id } = req.params;
    const interview = await db.getInterviewById(id);
    if (!interview) {
      return res.status(404).json({ success: false, message: 'Interview session not found' });
    }
    res.json({ success: true, interview });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function submitAnswer(req, res) {
  try {
    const { id } = req.params;
    const { questionIndex, answer, speechMetrics, customApiKey } = req.body;

    const interview = await db.getInterviewById(id);
    if (!interview) {
      return res.status(404).json({ success: false, message: 'Interview session not found' });
    }

    const currentQ = interview.questions[questionIndex];
    if (!currentQ) {
      return res.status(400).json({ success: false, message: 'Invalid question index' });
    }

    currentQ.candidateAnswer = answer;
    currentQ.answeredAt = new Date();

    // Evaluate answer with AI engine
    const evaluation = await evaluateCandidateAnswer({
      questionText: currentQ.questionText,
      candidateAnswer: answer,
      topic: currentQ.topic,
      difficultyLevel: currentQ.difficultyLevel,
      personality: interview.personality,
      interviewType: interview.interviewType
    }, customApiKey);

    currentQ.evaluation = evaluation;

    // Adaptive difficulty adjustment
    let newDiffScore = interview.currentDifficultyScore;
    if (evaluation.difficultyAdjustment === "increase" && newDiffScore < 3) {
      newDiffScore += 1;
    } else if (evaluation.difficultyAdjustment === "decrease" && newDiffScore > 1) {
      newDiffScore -= 1;
    }
    interview.currentDifficultyScore = newDiffScore;

    // Award User XP for completing answer
    const user = await db.findUserById(interview.userId);
    if (user) {
      const earnedXP = (evaluation.score >= 8 ? 50 : evaluation.score >= 5 ? 35 : 20);
      await db.updateUser(user._id, { xp: (user.xp || 0) + earnedXP });
    }

    await db.updateInterview(interview._id, {
      questions: interview.questions,
      currentDifficultyScore: newDiffScore
    });

    res.json({
      success: true,
      message: 'Answer evaluated successfully',
      evaluation,
      currentDifficultyScore: newDiffScore,
      interview
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getNextQuestion(req, res) {
  try {
    const { id } = req.params;
    const { customApiKey } = req.body;

    const interview = await db.getInterviewById(id);
    if (!interview) {
      return res.status(404).json({ success: false, message: 'Interview session not found' });
    }

    const user = await db.findUserById(interview.userId);
    const resumeData = await db.getResumeByUserId(interview.userId);
    const jobData = await db.getJobDescriptionByUserId(interview.userId);

    const previousQuestions = interview.questions;
    const previousAnswers = previousQuestions.map(q => q.candidateAnswer).filter(Boolean);
    const previousScores = previousQuestions.map(q => q.evaluation?.score).filter(Boolean);

    // If candidate reached total questions limit
    if (interview.questions.length >= interview.totalQuestions) {
      return res.json({
        success: true,
        isCompleted: true,
        message: 'All questions in this session have been answered.'
      });
    }

    // Check if previous answer was strong enough for a deep-dive follow-up probe
    const lastQ = previousQuestions[previousQuestions.length - 1];
    let nextQ;

    const isStrongAnswer = lastQ && lastQ.evaluation?.score >= 8;
    const shouldProbeFollowUp = isStrongAnswer && !lastQ.isFollowUp && Math.random() > 0.6;

    if (shouldProbeFollowUp && lastQ.evaluation?.suggestedFollowUp) {
      nextQ = {
        questionText: lastQ.evaluation.suggestedFollowUp,
        topic: lastQ.topic,
        difficultyLevel: Math.min(3, interview.currentDifficultyScore + 1),
        isFollowUp: true,
        expectedConcepts: ["Deeper trade-offs & edge cases", "System resilience & optimization"]
      };
    } else {
      nextQ = await generateAdaptiveQuestion({
        role: interview.role,
        experienceLevel: user?.experienceLevel || "1-3 years",
        skills: user?.skills || [],
        interviewType: interview.interviewType,
        difficulty: interview.difficulty,
        currentDifficultyScore: interview.currentDifficultyScore,
        personality: interview.personality,
        previousQuestions,
        previousAnswers,
        previousScores,
        resumeData,
        jobData
      }, customApiKey);
    }

    const questionObj = {
      questionId: `q_${Date.now()}_${interview.questions.length + 1}`,
      questionText: nextQ.questionText,
      topic: nextQ.topic,
      difficultyLevel: nextQ.difficultyLevel || interview.currentDifficultyScore,
      isFollowUp: Boolean(nextQ.isFollowUp),
      expectedConcepts: nextQ.expectedConcepts || [],
      candidateAnswer: null,
      speechMetrics: null,
      evaluation: null,
      answeredAt: null
    };

    interview.questions.push(questionObj);
    await db.updateInterview(interview._id, { questions: interview.questions });

    res.json({
      success: true,
      question: questionObj,
      interview
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function completeInterview(req, res) {
  try {
    const { id } = req.params;
    const { customApiKey } = req.body;

    const interview = await db.getInterviewById(id);
    if (!interview) {
      return res.status(404).json({ success: false, message: 'Interview session not found' });
    }

    const overallEvaluation = await generateFinalInterviewEvaluation(
      interview.questions,
      interview.role,
      customApiKey
    );

    const completed = await db.updateInterview(interview._id, {
      status: "completed",
      completedAt: new Date(),
      overallEvaluation
    });

    // Update user readiness score and award completion XP
    const user = await db.findUserById(interview.userId);
    if (user) {
      const newScore = Math.round((user.readinessScore * 0.4) + (overallEvaluation.overallScore * 0.6));
      const breakdown = {
        technical: overallEvaluation.technicalScore || user.readinessBreakdown?.technical || 75,
        communication: overallEvaluation.communicationScore || user.readinessBreakdown?.communication || 75,
        problemSolving: overallEvaluation.problemSolvingScore || user.readinessBreakdown?.problemSolving || 75,
        confidence: overallEvaluation.clarityScore || user.readinessBreakdown?.confidence || 70,
        clarity: overallEvaluation.clarityScore || user.readinessBreakdown?.clarity || 75
      };

      await db.updateUser(user._id, {
        readinessScore: newScore,
        readinessBreakdown: breakdown,
        xp: (user.xp || 0) + 100
      });
    }

    res.json({
      success: true,
      message: 'Interview completed and finalized successfully',
      interview: completed
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function listInterviews(req, res) {
  try {
    const interviews = await db.listUserInterviews(req.user._id);
    res.json({ success: true, interviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
