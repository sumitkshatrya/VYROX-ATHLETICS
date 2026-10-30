import { Router } from 'express';
import { chatHandler, fitnessPlanHandler, aiStatusHandler } from '../controllers/aiController.js';
import { aiRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/chat', aiRateLimiter, chatHandler);
router.post('/fitness-plan', aiRateLimiter, fitnessPlanHandler);
router.get('/status', aiStatusHandler);

export default router;

