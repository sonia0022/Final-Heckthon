// // src/constants/sidebarLinks.js
// import { FaHome, FaFileAlt, FaEnvelope, FaBell, FaMapMarkerAlt, FaChartBar, FaSignOutAlt } from 'react-icons/fa';

// export const sidebarLinks = [
    // { name: 'Home', path: '/home', icon: FaHome },
//     { name: 'Files', path: '/files', icon: FaFileAlt },
//     { name: 'Messages', path: '/messages', icon: FaEnvelope },
//     { name: 'Notifications', path: '/notifications', icon: FaBell },
//     { name: 'Location', path: '/location', icon: FaMapMarkerAlt },
//     { name: 'Graph', path: '/graph', icon: FaChartBar },
//     { name: 'Logout', path: '/logout', icon: FaSignOutAlt, isLogout: true },
// ];

import { Home, User, Settings, BarChart2, LogOut } from 'lucide-react';

export const sidebarLinks = [
    { name: 'Home', path: '/dashboard', icon: Home },
    { name: 'Profile', path: '/dashboard/profile', icon: User  },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings  },
    { name: 'Analytics', path: '/dashboard/analytics', icon: BarChart2 },
    { name: 'Logout', path: '/dashboard/logout', icon: LogOut  },
];
