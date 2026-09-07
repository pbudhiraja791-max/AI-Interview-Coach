import express from 'express';
import { uploadResume, getResume } from '../controllers/resumeController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.use(authenticateToken);

router.post('/upload', upload.single('resume'), uploadResume);
router.get('/', getResume);

export default router;
