import express from 'express';
import { createUser } from '../controllers/userController.js';
import { verifyToken , isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/users-create', verifyToken ,  isAdmin , createUser); // Protected route

export default router;