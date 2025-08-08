import React, { useState } from 'react';
import axios from '../../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/AuthLayout';

const SignIN = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        try {
            const res = await axios.post('/auth/signin', formData);
            console.log(res.data);  // <-- Check this output

            setMessage(res.data.message || "Login successful!");
            localStorage.setItem('token', res.data.token);

            if (res.data.user) {
                localStorage.setItem('loggedInUser', JSON.stringify(res.data.user));
                localStorage.setItem('userRole', res.data.user.role);
                localStorage.setItem('token', res.data.token);

            }

            navigate('/dashboard');
        } catch (err) {
            console.error('Error:', err); 
            setMessage(err.response?.data?.message || "Invalid credentials");
        }
        finally {
            setLoading(false);
        }
    };



    return (
        <AuthLayout title="Login to Your Account">
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="email" type="email" placeholder="Email" onChange={handleChange}
                    className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-md" />
                <input name="password" type="password" placeholder="Password" onChange={handleChange}
                    className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-md" />
                <div className="text-right">
                    <Link to="/forgot-password" className="text-sm text-purple-300 hover:underline">
                        Forgot Password?
                    </Link>
                </div>
                <button type="submit" disabled={loading}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition cursor-pointer">
                    {loading ? 'Logging in...' : 'Sign In'}
                </button>
                <p>Don't have an account?   <Link to="/signup" className="text-sm text-purple-300 hover:underline" >Signup here</Link></p>

            </form>
            {message && <p className="mt-4 text-sm text-center text-red-300">{message}</p>}
        </AuthLayout>
    );
};

export default SignIN;
