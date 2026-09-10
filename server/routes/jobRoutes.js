import express from 'express';
import { analyzeJob, getJob } from '../controllers/jobController.js';
import { optionalAuthenticateToken } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.use(optionalAuthenticateToken);

router.post('/analyze', upload.single('jobFile'), analyzeJob);
router.get('/', getJob);

export default router;
