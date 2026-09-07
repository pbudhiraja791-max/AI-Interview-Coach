import { generateJSONWithGemini } from './geminiClient.js';

export async function matchJobDescription(jobText, candidateSkills = [], candidateExperience = "", customApiKey = null) {
  const systemInstruction = `You are an AI Talent Acquisition Lead & Technical Career Strategist.
Analyze the provided Job Description against the candidate's skills and experience.
Calculate an accurate Job Match Score (0-100%), identify matched skills, identify skill gaps (missing requirements), and provide tailored interview prep recommendations.

Strictly output JSON matching this schema:
{
  "company": "string (company name if mentioned or 'Target Company')",
  "role": "string (role title)",
  "requiredSkills": ["string"],
  "preferredSkills": ["string"],
  "matchScore": number (0 to 100),
  "matchedSkills": ["string"],
  "missingSkills": ["string"],
  "gapAnalysis": [
    {
      "skill": "string",
      "status": "matched" | "partial" | "missing",
      "impact": "high" | "medium" | "low",
      "recommendation": "string"
    }
  ],
  "recommendations": ["string", "string", "string"]
}`;

  const prompt = `Candidate Skills: ${candidateSkills.join(', ')}
Candidate Experience Summary: ${candidateExperience}

Job Description:
${jobText}

Perform skill extraction, match comparison, and gap analysis.`;

  try {
    const aiResponse = await generateJSONWithGemini(prompt, systemInstruction, customApiKey);
    if (aiResponse && aiResponse.matchScore !== undefined) {
      return aiResponse;
    }
  } catch (error) {
    console.warn("Job matching AI fallback:", error.message);
  }

  // Fallback Rule-Based Parser & Matcher
  const knownSkills = [
    "React", "Node.js", "JavaScript", "TypeScript", "Python", "Java", "SQL", "PostgreSQL",
    "MongoDB", "AWS", "Docker", "Kubernetes", "Redis", "Kafka", "System Design", "GraphQL", "CI/CD"
  ];
  
  const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const required = [];
  knownSkills.forEach(s => {
    if (new RegExp(`(?:^|\\W)${escapeRegex(s)}(?:$|\\W)`, 'i').test(jobText)) {
      required.push(s);
    }
  });

  if (required.length === 0) {
    required.push("JavaScript", "React", "Node.js", "SQL", "System Design");
  }

  const matched = [];
  const missing = [];
  const gapAnalysis = [];

  required.forEach(skill => {
    const hasSkill = candidateSkills.some(cs => cs.toLowerCase() === skill.toLowerCase());
    if (hasSkill) {
      matched.push(skill);
      gapAnalysis.push({
        skill,
        status: "matched",
        impact: "high",
        recommendation: `Strong match. Be ready to discuss production architecture with ${skill}.`
      });
    } else {
      missing.push(skill);
      gapAnalysis.push({
        skill,
        status: "missing",
        impact: "high",
        recommendation: `Skill gap detected. Review core syntax and practice 5 interview questions on ${skill}.`
      });
    }
  });

  const score = Math.round((matched.length / Math.max(1, required.length)) * 100);

  return {
    company: "Target Company",
    role: "Software Engineer",
    requiredSkills: required,
    preferredSkills: ["AWS", "Docker", "Redis"],
    matchScore: Math.max(45, Math.min(95, score)),
    matchedSkills: matched,
    missingSkills: missing,
    gapAnalysis,
    recommendations: [
      `Review core fundamentals for missing skill: ${missing[0] || 'System Design'}`,
      "Practice STAR behavioral questions highlighting leadership and ownership",
      "Do a Job-Specific mock interview focusing on full-stack architecture"
    ]
  };
}
