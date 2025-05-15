import express from 'express';
import {
  register,
  login,
  logout,
  getCurrentUser
} from '../controllers/authController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// Protected routes
router.get('/me', auth, getCurrentUser);

export default router;