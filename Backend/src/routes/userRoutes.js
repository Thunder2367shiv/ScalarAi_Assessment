import express from 'express';
import { authUser, registerUser } from '../controllers/userController.js';

const router = express.Router();

// Public routes
router.post('/login', authUser);
router.post('/register', registerUser);

export default router;