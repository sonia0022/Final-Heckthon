
import { useState } from "react";
import axios from "axios";
import AuthLayout from '../../components/AuthLayout';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            const res = await axios.post(`${import.meta.env.FrontEnd}/api/auth/forgot-password`, { email });
            setMessage(res.data.message);
            setError("");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
            setMessage("");
        }
    };

    return (
        <AuthLayout title="Reset Your Password">
            <form onSubmit={handleSubmit} className="space-y-4">
                <p className="text-sm text-purple-200">
                    Enter your email and we'll send you a link to reset your password.
                </p>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-md focus:outline-none"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition cursor-pointer"
                >
                    Send Reset Link
                </button>

                {message && <p className="text-green-400 text-sm">{message}</p>}
                {error && <p className="text-red-400 text-sm">{error}</p>}
            </form>
        </AuthLayout>
    );
};

export default ForgotPassword;
