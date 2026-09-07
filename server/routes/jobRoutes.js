import express from 'express';
import { analyzeJob, getJob } from '../controllers/jobController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.use(authenticateToken);

router.post('/analyze', upload.single('jobFile'), analyzeJob);
router.get('/', getJob);

export default router;
