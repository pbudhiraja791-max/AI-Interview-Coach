import express from 'express';
import {
  getProblems,
  getProblemById,
  executeCode,
  evaluateSubmission
} from '../controllers/codingController.js';
import { optionalAuthenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(optionalAuthenticateToken);

router.get('/problems', getProblems);
router.get('/problems/:id', getProblemById);
router.post('/execute', executeCode);
router.post('/evaluate', evaluateSubmission);

export default router;
