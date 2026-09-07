import { db } from '../services/memoryDbService.js';
import { extractTextFromFile } from '../services/fileParserService.js';
import { parseAndAnalyzeResume } from '../services/ai/resumeEngine.js';

export async function uploadResume(req, res) {
  try {
    let rawText = req.body.rawText || "";
    let fileName = "Pasted_Resume.txt";

    if (req.file) {
      fileName = req.file.originalname;
      rawText = await extractTextFromFile(req.file.buffer, req.file.mimetype, req.file.originalname);
    }

    if (!rawText || rawText.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Could not extract text from the provided resume' });
    }

    const { customApiKey } = req.body;
    const analysis = await parseAndAnalyzeResume(rawText, customApiKey);

    const savedResume = await db.saveResume({
      userId: req.user._id,
      fileName,
      rawText,
      parsedData: analysis.parsedData,
      summary: analysis.summary,
      generatedQuestions: analysis.generatedQuestions
    });

    // Merge detected skills into user profile
    if (analysis.parsedData?.skills?.length > 0) {
      const user = await db.findUserById(req.user._id);
      const currentSkills = new Set(user?.skills || []);
      analysis.parsedData.skills.forEach(s => currentSkills.add(s));
      await db.updateUser(req.user._id, { skills: Array.from(currentSkills) });
    }

    res.json({
      success: true,
      message: 'Resume analyzed successfully',
      resume: savedResume
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getResume(req, res) {
  try {
    const resume = await db.getResumeByUserId(req.user._id);
    res.json({ success: true, resume });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
