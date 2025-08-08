import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    const token = localStorage.getItem('token');
    if (user && token) setLoggedInUser(JSON.parse(user));
    else setLoggedInUser(null);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div onClick={() => navigate('/')} className="cursor-pointer font-bold text-2xl text-purple-600">
          HijabGallery
        </div>

        <div className="flex items-center space-x-6 text-gray-700">
          <button onClick={() => navigate('/')} className="hover:text-blue-600">Home</button>
          <button onClick={() => navigate('/styles')} className="hover:text-blue-600">Styles</button>

          {/* {loggedInUser ? (
            <>
              <button onClick={() => navigate('/user/dashboard')} className="hover:text-blue-600">Dashboard</button>
              <button onClick={handleLogout} className="hover:text-red-600">Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/signin')} className="hover:text-blue-600">Login</button>
              <button onClick={() => navigate('/signup')} className="hover:text-blue-600">Signup</button>
            </>
          )} */}
          {!loggedInUser ? (
            <>
              <button onClick={() => navigate('/signin')}>Login</button>
              <button onClick={() => navigate('/signup')}>Signup</button>
            </>
          ) : (
            <>
              <FaSignOutAlt
                className="hover:text-red-600 cursor-pointer transition"
                title="Logout"
                onClick={handleLogout}
              />
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
