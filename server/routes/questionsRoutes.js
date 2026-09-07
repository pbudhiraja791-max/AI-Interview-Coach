import express from 'express';
import {
  getQuestions,
  toggleBookmark,
  getBookmarked,
  practiceAnswer
} from '../controllers/questionsController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/', getQuestions);
router.get('/bookmarked', getBookmarked);
router.post('/:questionId/bookmark', toggleBookmark);
router.post('/practice-answer', practiceAnswer);

export default router;
