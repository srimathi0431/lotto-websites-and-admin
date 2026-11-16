// ===================================
// MAIN APP COMPONENT
// React Router setup with protected routes
// ===================================

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Users from './pages/Users/Users';
import Deposits from './pages/Deposits/Deposits';
import Withdrawals from './pages/Withdrawals/Withdrawals';
import Transactions from './pages/Transactions/Transactions';
import Reports from './pages/Reports/Reports';
import Notifications from './pages/Notifications/Notifications';
import AdminManagement from './pages/AdminManagement/AdminManagement';
import ActivityLogs from './pages/ActivityLogs/ActivityLogs';
import Settings from './pages/Settings/Settings';
import Profile from './pages/Profile/Profile';
import { isAuthenticated } from './utils/storage';
import './styles/globals.css';
import './styles/layout.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

// Public Route Component (redirect if already logged in)
const PublicRoute = ({ children }) => {
  return !isAuthenticated() ? children : <Navigate to="/dashboard" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />

        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="deposits" element={<Deposits />} />
          <Route path="withdrawals" element={<Withdrawals />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="reports" element={<Reports />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="admin-management" element={<AdminManagement />} />
          <Route path="activity-logs" element={<ActivityLogs />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Catch all - redirect to dashboard or login */}
        <Route path="*" element={<Navigate to={isAuthenticated() ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
