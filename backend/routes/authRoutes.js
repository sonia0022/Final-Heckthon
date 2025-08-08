// routes/authRoutes.js
import express from "express";
import * as authController from "../controller/authController.js";
import { signupValidation, loginValidation ,forgotPasswordValidation} from "../middleware/validation.js";

const router = express.Router();

// Apply validation middleware before controller
router.post('/signup', signupValidation, authController.signup);     
router.post('/signin', loginValidation, authController.signin); 
router.post('/forgot-password', forgotPasswordValidation, authController.forgotPassword);


router.post('/reset-password/:token', authController.ResetPassword);

// Other routes (no validation required)
router.get('/logout', authController.logout);
export default router;
