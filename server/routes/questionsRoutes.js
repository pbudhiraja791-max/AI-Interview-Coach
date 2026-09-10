import express from 'express';
import {
  getQuestions,
  toggleBookmark,
  getBookmarked,
  practiceAnswer
} from '../controllers/questionsController.js';
import { authenticateToken, optionalAuthenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', optionalAuthenticateToken, getQuestions);
router.post('/practice-answer', optionalAuthenticateToken, practiceAnswer);
router.get('/bookmarked', authenticateToken, getBookmarked);
router.post('/:questionId/bookmark', authenticateToken, toggleBookmark);

export default router;
