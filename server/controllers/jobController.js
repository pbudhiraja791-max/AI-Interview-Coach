import { db } from '../services/memoryDbService.js';
import { extractTextFromFile } from '../services/fileParserService.js';
import { matchJobDescription } from '../services/ai/jobMatcherEngine.js';

export async function analyzeJob(req, res) {
  try {
    let rawText = req.body.jobText || "";
    const company = req.body.company || "Target Company";
    const role = req.body.role || "Software Engineer";

    if (req.file) {
      rawText = await extractTextFromFile(req.file.buffer, req.file.mimetype, req.file.originalname);
    }

    if (!rawText || rawText.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide job description text or upload a file' });
    }

    const user = req.user;
    const { customApiKey } = req.body;
    const matchResults = await matchJobDescription(
      rawText,
      user.skills || [],
      `${user.targetRole} with ${user.experienceLevel} experience`,
      customApiKey
    );

    const savedJob = await db.saveJobDescription({
      userId: user._id,
      company: matchResults.company || company,
      role: matchResults.role || role,
      rawText,
      requiredSkills: matchResults.requiredSkills,
      preferredSkills: matchResults.preferredSkills,
      matchScore: matchResults.matchScore,
      matchedSkills: matchResults.matchedSkills,
      missingSkills: matchResults.missingSkills,
      gapAnalysis: matchResults.gapAnalysis,
      recommendations: matchResults.recommendations
    });

    res.json({
      success: true,
      message: 'Job description analyzed and matched successfully',
      job: savedJob
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getJob(req, res) {
  try {
    const job = await db.getJobDescriptionByUserId(req.user._id);
    res.json({ success: true, job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
