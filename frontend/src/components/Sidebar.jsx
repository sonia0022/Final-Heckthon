import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { sidebarLinks } from '../constant/sidebarLinks';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/signin');
    };

    return (
        <div className="fixed top-0 left-0 h-screen w-60 bg-[#1F1F2E] text-white p-6 z-50 shadow-lg">
            <div className="text-center mb-10">
                <div className="bg-white rounded-full w-16 h-16 mx-auto mb-3"></div>
                <h3 className="text-lg font-bold">JOHN DON</h3>
                <p className="text-sm text-gray-300">johndon@company.com</p>
            </div>

            <nav className="space-y-3">
                {sidebarLinks.map((link, index) => {
                    const Icon = link.icon;

                    if (link.isLogout) {
                        return (
                            <button
                                key={index}
                                onClick={handleLogout}
                                className="flex items-center gap-3 w-full text-left px-4 py-2 rounded-md hover:bg-red-600 bg-[#2A2A3D] transition cursor-pointer"
                            >
                                <Icon className="text-lg" />
                                <span>{link.name}</span>
                            </button>
                        );
                    }

                    return (
                        <NavLink
                            key={index}
                            to={link.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-2 rounded-md hover:bg-purple-600 transition ${isActive ? 'bg-purple-700' : 'bg-[#2A2A3D]'
                                }`
                            }
                        >
                            <Icon className="text-lg" />
                            <span>{link.name}</span>
                        </NavLink>
                    );
                })}
            </nav>
        </div>
    );
};

export default Sidebar;
