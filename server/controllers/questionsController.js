import { db } from '../services/memoryDbService.js';
import { evaluateCandidateAnswer } from '../services/ai/evaluationEngine.js';

export async function getQuestions(req, res) {
  try {
    const { topic, difficulty, role, category, search } = req.query;
    let questions = db.getAllQuestions();
    const bookmarkedIds = db.getBookmarkedQuestionIds(req.user?._id);

    if (category && category !== 'All') {
      questions = questions.filter(q => q.category?.toLowerCase() === category.toLowerCase());
    }

    if (topic && topic !== 'All') {
      questions = questions.filter(q => q.topic?.toLowerCase().includes(topic.toLowerCase()));
    }

    if (difficulty && difficulty !== 'All') {
      questions = questions.filter(q => q.difficulty?.toLowerCase() === difficulty.toLowerCase());
    }

    if (role && role !== 'All') {
      questions = questions.filter(q => q.role === 'All' || q.role?.toLowerCase().includes(role.toLowerCase()));
    }

    if (search && search.trim()) {
      const s = search.toLowerCase();
      questions = questions.filter(q =>
        q.question.toLowerCase().includes(s) ||
        q.topic.toLowerCase().includes(s) ||
        q.sampleAnswer?.toLowerCase().includes(s)
      );
    }

    const decorated = questions.map(q => ({
      ...q,
      isBookmarked: bookmarkedIds.includes(q.id)
    }));

    res.json({
      success: true,
      count: decorated.length,
      questions: decorated
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function toggleBookmark(req, res) {
  try {
    const { questionId } = req.params;
    const result = db.toggleBookmark(req.user._id, questionId);
    res.json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getBookmarked(req, res) {
  try {
    const bookmarkedIds = db.getBookmarkedQuestionIds(req.user._id);
    const questions = db.getAllQuestions()
      .filter(q => bookmarkedIds.includes(q.id))
      .map(q => ({ ...q, isBookmarked: true }));

    res.json({ success: true, questions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function practiceAnswer(req, res) {
  try {
    const { questionText, candidateAnswer, topic, difficulty, customApiKey } = req.body;

    if (!candidateAnswer || candidateAnswer.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide an answer' });
    }

    const evaluation = await evaluateCandidateAnswer({
      questionText,
      candidateAnswer,
      topic: topic || "Technical",
      difficultyLevel: difficulty === "Hard" ? 3 : difficulty === "Easy" ? 1 : 2,
      personality: "Professional",
      interviewType: "Technical"
    }, customApiKey);

    // Award XP
    const user = await db.findUserById(req.user._id);
    if (user) {
      await db.updateUser(user._id, { xp: (user.xp || 0) + 20 });
    }

    res.json({
      success: true,
      message: 'Practice response evaluated',
      evaluation
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
