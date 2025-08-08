import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import AuthLayout from '../../components/AuthLayout';

const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        try {
            const res = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password })
            });

            const data = await res.json();

            if (res.ok) {
                setMessage("Password reset successful!");
                setTimeout(() => {
                    navigate("/signin");
                }, 1500);
            } else {
                setMessage(data.error || "Something went wrong");
            }
        } catch (err) {
            setMessage("Error resetting password", err);
        }
    };

    return (
        <AuthLayout title="Reset Your Password">
            <form className="space-y-4" onSubmit={handleSubmit}>
                <p className="text-sm text-purple-200">
                    Enter your new password below.
                </p>
                <input
                    type="password"
                    placeholder="New Password"
                    className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-md"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-md"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md"
                >
                    Reset Password
                </button>
                {message && <p className="text-sm text-red-300">{message}</p>}
            </form>
        </AuthLayout>
    );
};

export default ResetPassword;
