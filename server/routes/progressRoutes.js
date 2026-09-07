import express from 'express';
import {
  getDashboardData,
  getProgressAnalytics,
  getPreparationPlan,
  updatePlanTask,
  generatePreparationPlan
} from '../controllers/progressController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/dashboard', getDashboardData);
router.get('/analytics', getProgressAnalytics);
router.get('/plan', getPreparationPlan);
router.post('/plan/generate', generatePreparationPlan);
router.put('/plan/task', updatePlanTask);

export default router;
