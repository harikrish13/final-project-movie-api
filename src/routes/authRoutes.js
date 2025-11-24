import express from 'express';
import { validateSignup, validateLogin } from '../middleware/authValidators.js';
import { signUpHandler, logInHandler } from '../controllers/authController.js';
import LogInLimiter from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/signup', validateSignup, signUpHandler);
router.post('/login', LogInLimiter, validateLogin, logInHandler);

export default router;



