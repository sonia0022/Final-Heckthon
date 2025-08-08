import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import DashboardHome from './DashboardHome';
import Profile from './Profile';
import Settings from './Setting';
import Analytics from './Analytics';
import Logout from './Logout';

const Dashboard = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-4">
                <Routes>
                    <Route path="/" element={<DashboardHome />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="logout" element={<Logout />} />
                </Routes>
            </div>
        </div>
    );
};

export default Dashboard;
