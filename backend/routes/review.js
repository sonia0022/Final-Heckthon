import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
    createReview,
    getReviewsForStyle,
    updateReview,
    deleteReview,
} from '../controller/reviewController.js';

const router = express.Router();

// Connect routes to controller functions + middleware
router.post('/:hijabId', protect, createReview);
router.get('/:hijabId', getReviewsForStyle);
router.put('/:reviewId', protect, updateReview);
router.delete('/:reviewId', protect, deleteReview);

export default router;
