import { generateJSONWithGemini } from './geminiClient.js';
import { MockAIEngine } from './mockAIFallback.js';

export async function evaluateCandidateAnswer(context, customApiKey = null) {
  const {
    questionText,
    candidateAnswer,
    topic,
    difficultyLevel = 2,
    personality = "Professional",
    interviewType = "Technical"
  } = context;

  const systemInstruction = `You are an elite Senior Staff Engineer / Hiring Manager evaluating a candidate's interview response.
Evaluate the answer thoroughly for technical depth, correctness, structure, clarity, and communication effectiveness.
CRITICAL: If the candidate states 'I don't know', 'I have no idea', 'pass', 'skip', 'not sure', or provides an evasive/blank answer:
- Score it accurately low (1 or 2 out of 10). Do NOT give high scores or generic compliments for non-answers.
- Praise their honesty in admitting knowledge boundaries under 'strengths'.
- Under 'improvements' and 'mistakeExplanation', clearly explain that this represents a knowledge gap.
- Under 'betterAnswer', provide a clear, concise model answer explaining what they should have said.
- Under 'interviewerPerspective', state what a hiring manager actually thinks when a candidate passes on this question.
- Set 'difficultyAdjustment' to 'decrease'.
If interview type is Behavioral/HR, evaluate using the STAR framework (Situation, Task, Action, Result).
Explain mistakes constructively under 'mistakeExplanation' (What was missing, what was incorrect, why it matters, how to improve).

Strictly output JSON conforming to this schema:
{
  "score": number (1 to 10),
  "technicalKnowledge": number (1 to 10),
  "clarity": number (1 to 10),
  "relevance": number (1 to 10),
  "depth": number (1 to 10),
  "strengths": ["string", "string"],
  "improvements": ["string", "string"],
  "betterAnswer": "string (exemplary model answer)",
  "interviewerPerspective": "string (what the interviewer is really thinking)",
  "mistakeExplanation": {
    "missing": ["string"],
    "incorrect": ["string"],
    "whyItMatters": "string",
    "howToImprove": "string"
  },
  "starAnalysis": {
    "situation": "string",
    "task": "string",
    "action": "string",
    "result": "string",
    "feedback": "string"
  },
  "difficultyAdjustment": "increase" | "maintain" | "decrease",
  "suggestedFollowUp": "string (intelligent follow up question based on this answer)"
}`;

  const prompt = `Question: "${questionText}"
Topic: ${topic}
Current Difficulty (1-3): ${difficultyLevel}
Personality: ${personality}
Interview Type: ${interviewType}
Candidate Answer: "${candidateAnswer}"

Evaluate this answer.`;

  try {
    const aiResponse = await generateJSONWithGemini(prompt, systemInstruction, customApiKey);
    if (aiResponse && aiResponse.score !== undefined) {
      return aiResponse;
    }
  } catch (error) {
    console.warn("Falling back to evaluation engine fallback:", error.message);
  }

  return MockAIEngine.evaluateAnswer({
    questionText,
    candidateAnswer,
    topic,
    difficultyLevel,
    personality,
    interviewType
  });
}

export async function generateFinalInterviewEvaluation(questions = [], role = "Software Engineer", customApiKey = null) {
  const systemInstruction = `You are a Lead Bar Raiser generating the final comprehensive interview evaluation report and 'Interview Mirror' perception profile for a candidate.

Strictly output JSON matching this schema:
{
  "overallScore": number (0 to 100),
  "technicalScore": number (0 to 100),
  "communicationScore": number (0 to 100),
  "problemSolvingScore": number (0 to 100),
  "clarityScore": number (0 to 100),
  "answerStructureScore": number (0 to 100),
  "topStrengths": ["string", "string", "string"],
  "topWeaknesses": ["string", "string", "string"],
  "interviewMirror": {
    "technicalImpression": "string",
    "communicationImpression": "string",
    "problemSolvingImpression": "string",
    "overallImpression": "string"
  },
  "recommendedActionPlan": ["string", "string", "string"]
}`;

  const prompt = `Role: ${role}
Questions & Candidate Answers:
${JSON.stringify(questions.map(q => ({
  q: q.questionText,
  answer: q.candidateAnswer,
  score: q.evaluation?.score
})))}

Generate the comprehensive final interview report.`;

  try {
    const aiResponse = await generateJSONWithGemini(prompt, systemInstruction, customApiKey);
    if (aiResponse && aiResponse.overallScore !== undefined) {
      return aiResponse;
    }
  } catch (error) {
    console.warn("Falling back to overall evaluation fallback:", error.message);
  }

  return MockAIEngine.generateOverallEvaluation(questions);
}
