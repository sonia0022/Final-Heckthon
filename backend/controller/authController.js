import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { signInToken } from "../utils/token.js";

// forgot password utility
import crypto from 'crypto';
import sendEmail from '../utils/sendEmail.js';



//********************************************************************************/ SignUp
export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        user = await User.create({ name, email, password });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token).status(201).json({ message: 'Signup successful' });
    } catch (error) {
        res.status(500).json({ message: 'Signup failed', error: error.message });
    }
};


// ********************************************************************************/ SignIn
export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Step 1: Get user with password
        const user = await User.findOne({ email }).select("+password"); // get password for comparison

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        // Step 2: Remove password before sending user data to client
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;


        const token = signInToken(user);

        res.status(200).json({
            message: 'Login successful',
            token,
            user: userWithoutPassword,
            success: true
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Signin Failed",
            error: error.message
        });
    }
};


// ********************************************************************************/ Logout
export const logout = (req, res) => {
    res.clearCookie('token').json({ message: 'Logged out successfully' });
};


// ********************************************************************************/ Forgot Password
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
        await user.save();

        const resetURL = `http://localhost:5173/reset-password/${resetToken}`;

        const html = `
    <div style="max-width:600px;margin:0 auto;padding:20px;font-family:sans-serif;">
        <h2 style="color:#333;">Reset Your Password</h2>
        <p>Click the button below to reset your password. This link will expire in 10 minutes.</p>
        <a href="${resetURL}" style="display:inline-block;background:#007bff;color:#fff;padding:10px 20px;text-decoration:none;border-radius:5px;">Reset Password</a>
        <p>If you didn’t request a password reset, you can safely ignore this email.</p>
    </div>
    `;

        await sendEmail({
            to: email,
            subject: 'Password Reset',
            html
        });

        res.status(200).json({ message: "Reset link sent to your email" });

    } catch (error) {
        console.error("Forgot password error:", error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};


// **************************************************************************** Reset Password
export const ResetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) return res.status(400).json({ message: "Invalid or expired token" });

        user.password = password; // hashing handled in model middleware
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({ message: "Password reset successfully" });

    } catch (err) {
        console.error("Reset password error:", err);
        res.status(500).json({ message: "Server error" });
    }
};


