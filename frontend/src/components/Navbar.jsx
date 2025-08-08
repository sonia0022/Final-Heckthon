import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaSignOutAlt,
  FaBars,
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    if (user) setLoggedInUser(JSON.parse(user));
  }, []);

  const handleSuccess = (msg) => toast.success(msg);
// ************************Logout********************************
  const handleLogout = () => {
    if (!localStorage.getItem('token')) return;
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User logged out');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };
// ******************** Profile page admin or user *********************************
const handleProfileRedirect = () => {
  const role = localStorage.getItem("userRole") || "user";

  toast.info(`Redirecting to ${role === "admin" ? "Admin" : "User"} Dashboard...`);

  setTimeout(() => {
    if (role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/user/dashboard");
    }
  }, 1000);
};
// **************************** Return ****************************************
  return (
    <nav className="bg-white shadow-md px-4 py-3 flex justify-between items-center relative z-50">
      {/* Left - Logo */}
      <div
        className="text-2xl font-bold text-blue-600 hover:scale-105 transition-transform duration-300 cursor-pointer"
        onClick={() => navigate('/')}
      >
        My<span className="text-purple-600">Website</span>
      </div>

      {/* Center - Desktop Nav Links */}
      <ul className="hidden md:flex space-x-6 font-medium text-gray-700 relative items-center">
        {['Home', 'FAQs', 'About', 'Contact'].map((item) => (
          <li key={item} className="relative group cursor-pointer">
            <span
              onClick={() => navigate(`/${item.toLowerCase()}`)}
              className="hover:text-blue-600 transition duration-300"
            >
              {item}
            </span>
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </li>
        ))}

        {/* Products with dropdown */}
        <li
          className="relative group cursor-pointer"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <span className="hover:text-blue-600 transition duration-300">Products</span>
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>

          {showDropdown && (
            <ul className="absolute top-8 left-0 w-40 bg-white shadow-lg rounded-md py-2 z-20">
              {['All Products', 'New Arrivals', 'Best Sellers'].map((subItem) => (
                <li
                  key={subItem}
                  className="px-4 py-2 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-all"
                  onClick={() =>
                    navigate(`/products/${subItem.toLowerCase().replace(' ', '-')}`)
                  }
                >
                  {subItem}
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>

      {/* Right - Desktop Icons */}
      <div className="hidden md:flex items-center space-x-4 text-gray-700 text-lg">
        <FaUser
          className="hover:text-blue-600 cursor-pointer transition"
          title="Profile"
          onClick={handleProfileRedirect}
        />
        <FaHeart
          className="hover:text-blue-600 cursor-pointer transition"
          title="Wishlist"
          onClick={() => navigate('/wishlist')}
        />
        <FaShoppingCart
          className="hover:text-blue-600 cursor-pointer transition"
          title="Cart"
          onClick={() => navigate('/cart')}
        />
        <FaSignOutAlt
          className="hover:text-red-600 cursor-pointer transition"
          title="Logout"
          onClick={handleLogout}
        />
      </div>

      {/* Burger menu icon (Mobile) */}
      <div
        className="md:hidden text-2xl text-gray-700 ml-4 cursor-pointer"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <FaBars />
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden py-4 px-6 space-y-4 z-40">
          {['Home', 'FAQs', 'About', 'Contact'].map((item) => (
            <p
              key={item}
              className="hover:text-blue-600 cursor-pointer"
              onClick={() => {
                navigate(`/${item.toLowerCase()}`);
                setShowMobileMenu(false);
              }}
            >
              {item}
            </p>
          ))}
          <p
            className="hover:text-blue-600 cursor-pointer"
            onClick={() => {
              navigate('/products/all-products');
              setShowMobileMenu(false);
            }}
          >
            Products
          </p>
          {/* Icons in mobile */}
          <div className="flex space-x-4 pt-2 text-xl text-gray-700">
            <FaUser
              className="hover:text-blue-600 cursor-pointer"
              title="Profile"
              onClick={() => {
                handleProfileRedirect();
                setShowMobileMenu(false);
              }}
            />
            <FaHeart
              className="hover:text-blue-600 cursor-pointer"
              title="Wishlist"
              onClick={() => {
                navigate('/wishlist');
                setShowMobileMenu(false);
              }}
            />
            <FaShoppingCart
              className="hover:text-blue-600 cursor-pointer"
              title="Cart"
              onClick={() => {
                navigate('/cart');
                setShowMobileMenu(false);
              }}
            />
            <FaSignOutAlt
              className="hover:text-red-600 cursor-pointer"
              title="Logout"
              onClick={() => {
                handleLogout();
                setShowMobileMenu(false);
              }}
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;