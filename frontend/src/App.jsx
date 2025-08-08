import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GetStarted from './pages/GetStarted';
import SignUP from './pages/auth/SignUP';
import SignIN from './pages/auth/SignIN';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Dashboard from './pages/dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<GetStarted />} />
        <Route path="/signup" element={<SignUP />} />
        <Route path="/signin" element={<SignIN />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
