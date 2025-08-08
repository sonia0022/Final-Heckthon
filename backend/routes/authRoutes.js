// routes/authRoutes.js
import express from "express";
import * as authController from "../controller/authController.js";
import { signupValidation, loginValidation, forgotPasswordValidation } from "../middleware/validation.js";
import { protect } from '../middleware/authMiddleware.js'
import User from "../models/User.js";

const router = express.Router();

// Apply validation middleware before controller
router.post('/signup', signupValidation, authController.signup);
router.post('/signin', loginValidation, authController.signin);
router.post('/forgot-password', forgotPasswordValidation, authController.forgotPassword);
router.post('/reset-password/:token', authController.ResetPassword);

// Profile
router.get('/profile', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch user profile' });
    }
});

// Other routes (no validation required)
router.get('/logout', authController.logout);


export default router;


