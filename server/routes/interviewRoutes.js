import express from 'express';
import {
  setupInterview,
  getInterview,
  getNextQuestion,
  submitAnswer,
  completeInterview,
  listInterviews
} from '../controllers/interviewController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateToken);

router.post('/setup', setupInterview);
router.get('/', listInterviews);
router.get('/:id', getInterview);
router.post('/:id/next-question', getNextQuestion);
router.post('/:id/answer', submitAnswer);
router.post('/:id/complete', completeInterview);

export default router;
