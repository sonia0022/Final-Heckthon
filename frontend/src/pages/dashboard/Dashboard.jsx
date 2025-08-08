import { Routes, Route } from 'react-router-dom';
import DashboardHome from './DashboardHome';
import Logout from './Logout';
import Navbar from '../../components/Navbar';
import HijabDetail from './HijabDetail';

const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <div>
                <Routes>
                    <Route path="/" element={<DashboardHome />} />
                    <Route path="/hijabs/:id" element={<HijabDetail />} />
                    <Route path="logout" element={<Logout />} />
                </Routes>
            </div>
        </div>
    );
};

export default Dashboard;
