import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; // adjust path as needed

const GetStarted = () => {
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <div className="min-h-screen pt-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-black flex flex-col items-center justify-center text-white px-4">
                <h1 className="text-5xl font-extrabold mb-4 text-center">Welcome to HijabGallery ✨</h1>
                <p className="text-lg text-gray-300 mb-8 text-center max-w-xl">
                    Explore stylish hijabs, leave reviews, and get inspired. Sign up or log in to start your journey.
                </p>
                <div className="flex gap-6">
                    <button
                        onClick={() => navigate('/signup')}
                        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition cursor-pointer"
                    >
                        Sign Up
                    </button>
                    <button
                        onClick={() => navigate('/signin')}
                        className="px-6 py-3 bg-white text-black hover:bg-gray-100 rounded-lg font-semibold transition cursor-pointer"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </>
    );
};

export default GetStarted;
