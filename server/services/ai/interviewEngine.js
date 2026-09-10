import { generateJSONWithGemini } from './geminiClient.js';
import { MockAIEngine } from './mockAIFallback.js';

export async function generateAdaptiveQuestion(context, customApiKey = null) {
  const {
    role,
    experienceLevel,
    skills,
    interviewType,
    difficulty,
    currentDifficultyScore,
    personality,
    previousQuestions = [],
    previousAnswers = [],
    previousScores = [],
    jobData = null
  } = context;

  const systemInstruction = `You are a Principal Software Engineer & Bar Raiser Interviewer acting as a realistic AI Interview Coach.
Your task is to generate the next interview question tailored dynamically to the candidate's exact background, current interview flow, personality style, and previous answers.
CRITICAL RULES:
1. Do NOT repeat any question from 'Previous Questions Asked'. Every question MUST be fresh and distinct.
2. Rotate across diverse technical domains (e.g., System Design, Database Indexing, JavaScript/React internals, Java Memory/Concurrency, Asynchronous Runtimes, Algorithms).
3. If previous answer was weak or 'I don't know', do not push deeper into that same failure point; pivot to a different foundational concept.
4. If previous answer was strong, ask a deeper architectural trade-off or pivot to another technical domain.
Interviewer Personality: ${personality || "Professional"}
Interview Type: ${interviewType || "Technical"}
Target Role: ${role || "Software Engineer"}
Experience Level: ${experienceLevel || "1-3 years"}
Difficulty Level (1=Easy, 2=Medium, 3=Hard): ${currentDifficultyScore || 2}

Strictly return JSON matching this schema:
{
  "questionText": "string (the interviewer's spoken question)",
  "topic": "string (e.g. Java, System Design, React, Conflict Resolution)",
  "difficultyLevel": number (1, 2, or 3),
  "isFollowUp": boolean,
  "expectedConcepts": ["array", "of", "key", "concepts"]
}`;

  const prompt = `Context:
- Candidate Skills: ${Array.isArray(skills) ? skills.join(', ') : skills || 'General'}
- Job Description: ${jobData ? JSON.stringify(jobData.rawText || '') : 'None'}
- Previous Questions Asked: ${JSON.stringify(previousQuestions.map(q => q.questionText || q))}
- Previous Candidate Answers & Scores: ${JSON.stringify(previousAnswers.map((a, i) => ({ answer: a, score: previousScores[i] })))}
- Current Question Number: ${previousQuestions.length + 1}

Generate the single next adaptive question.`;

  try {
    const aiResponse = await generateJSONWithGemini(prompt, systemInstruction, customApiKey);
    if (aiResponse && aiResponse.questionText) {
      return aiResponse;
    }
  } catch (error) {
    console.warn("Falling back to smart adaptive engine:", error.message);
  }

  // Fallback to smart contextual mock engine
  return MockAIEngine.generateQuestion({
    role,
    interviewType,
    difficultyLevel: currentDifficultyScore || 2,
    personality,
    previousQuestions,
    previousAnswers,
    jobData
  });
}
