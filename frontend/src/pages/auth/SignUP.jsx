import React, { useState } from 'react';
// import axios from '../../api/axios';
import AuthLayout from '../../components/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUP = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/signup`, formData);
      setMessage(res.data.message || "Signup successful!");
      navigate('/signin')
    } catch (err) {
      setMessage(err.response?.data?.error || err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create an Account">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Name" onChange={handleChange}
          className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-md" />
        <input name="email" type="email" placeholder="Email" onChange={handleChange}
          className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-md" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange}
          className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-md" />
        <button type="submit" disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition cursor-pointer">
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
        <p>Already have an account?  <Link to="/signin" className="text-sm text-purple-300 hover:underline">Login here</Link></p>
      </form>
      {message && <p className="mt-4 text-sm text-center text-red-300">{message}</p>}
    </AuthLayout>
  );
};

export default SignUP;
