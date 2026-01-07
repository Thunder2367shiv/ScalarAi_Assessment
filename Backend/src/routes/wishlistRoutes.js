import express from 'express';
import { toggleWishlist } from '../controllers/wishlistController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Ensure 'protect' is before 'toggleWishlist'
router.route('/').post(protect, toggleWishlist);

export default router;