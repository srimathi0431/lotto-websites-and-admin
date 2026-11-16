import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Cookies from './pages/Cookies';
import Prize from './pages/Prize';
import PackagesPage from './pages/PackagesPage';

// User Panel imports
import { UserProvider, useUser } from './user/contexts/UserContext';
import UserDashboard from './pages/user/UserDashboard';

// Admin imports
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './admin/components/layout/Layout';
import AdminDashboard from './pages/admin/Dashboard/Dashboard';
import AdminUsers from './pages/admin/Users/Users';
import AdminDeposits from './pages/admin/Deposits/Deposits';
import AdminWithdrawals from './pages/admin/Withdrawals/Withdrawals';
import AdminTransactions from './pages/admin/Transactions/Transactions';
import AdminReports from './pages/admin/Reports/Reports';
import AdminNotifications from './pages/admin/Notifications/Notifications';
import AdminManagement from './pages/admin/AdminManagement/AdminManagement';
import ActivityLogs from './pages/admin/ActivityLogs/ActivityLogs';
import AdminSettings from './pages/admin/Settings/Settings';
import AdminProfile from './pages/admin/Profile/Profile';
import DrawManagement from './pages/admin/DrawManagement/DrawManagement';
import PrizeManagement from './pages/admin/PrizeManagement/PrizeManagement';
import { isAuthenticated } from './admin/utils/storage';

// Protected Route for Admin
const AdminProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/adminlogin" replace />;
};

// Public Route for Admin Login (redirect if already logged in)
const AdminPublicRoute = ({ children }) => {
  return !isAuthenticated() ? children : <Navigate to="/admin/dashboard" replace />;
};

// Protected Route for User Panel
const UserProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useUser();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Routes>
          {/* ========== USER ROUTES (Public Website) ========== */}
          <Route path="/" element={
            <>
              <div className="global-zoom-circles">
                <div className="global-zoom-circle global-zoom-circle-1"></div>
                <div className="global-zoom-circle global-zoom-circle-2"></div>
                <div className="global-zoom-circle global-zoom-circle-3"></div>
                <div className="global-zoom-circle global-zoom-circle-4"></div>
                <div className="global-zoom-circle global-zoom-circle-5"></div>
                <div className="global-zoom-circle global-zoom-circle-6"></div>
                <div className="global-zoom-circle global-zoom-circle-7"></div>
                <div className="global-zoom-circle global-zoom-circle-8"></div>
              </div>
              <Navbar />
              <Home />
              <Footer />
            </>
          } />
          
          {/* Temporary: /login redirects to admin login */}
          <Route path="/login" element={<Navigate to="/adminlogin" replace />} />
          
          <Route path="/register" element={
            <>
              <div className="global-zoom-circles">
                <div className="global-zoom-circle global-zoom-circle-1"></div>
                <div className="global-zoom-circle global-zoom-circle-2"></div>
                <div className="global-zoom-circle global-zoom-circle-3"></div>
                <div className="global-zoom-circle global-zoom-circle-4"></div>
                <div className="global-zoom-circle global-zoom-circle-5"></div>
                <div className="global-zoom-circle global-zoom-circle-6"></div>
                <div className="global-zoom-circle global-zoom-circle-7"></div>
                <div className="global-zoom-circle global-zoom-circle-8"></div>
              </div>
              <Navbar />
              <Register />
              <Footer />
            </>
          } />
          
          <Route path="/terms" element={
            <>
              <Navbar />
              <Terms />
              <Footer />
            </>
          } />
          
          <Route path="/privacy" element={
            <>
              <Navbar />
              <Privacy />
              <Footer />
            </>
          } />
          
          <Route path="/cookies" element={
            <>
              <Navbar />
              <Cookies />
              <Footer />
            </>
          } />
          
          <Route path="/prize" element={
            <>
              <div className="global-zoom-circles">
                <div className="global-zoom-circle global-zoom-circle-1"></div>
                <div className="global-zoom-circle global-zoom-circle-2"></div>
                <div className="global-zoom-circle global-zoom-circle-3"></div>
                <div className="global-zoom-circle global-zoom-circle-4"></div>
                <div className="global-zoom-circle global-zoom-circle-5"></div>
                <div className="global-zoom-circle global-zoom-circle-6"></div>
                <div className="global-zoom-circle global-zoom-circle-7"></div>
                <div className="global-zoom-circle global-zoom-circle-8"></div>
              </div>
              <Navbar />
              <Prize />
              <Footer />
            </>
          } />
          
          <Route path="/packages" element={
            <>
              <div className="global-zoom-circles">
                <div className="global-zoom-circle global-zoom-circle-1"></div>
                <div className="global-zoom-circle global-zoom-circle-2"></div>
                <div className="global-zoom-circle global-zoom-circle-3"></div>
                <div className="global-zoom-circle global-zoom-circle-4"></div>
                <div className="global-zoom-circle global-zoom-circle-5"></div>
                <div className="global-zoom-circle global-zoom-circle-6"></div>
                <div className="global-zoom-circle global-zoom-circle-7"></div>
                <div className="global-zoom-circle global-zoom-circle-8"></div>
              </div>
              <Navbar />
              <PackagesPage />
              <Footer />
            </>
          } />

          {/* ========== ADMIN ROUTES ========== */}
          {/* Admin Login - Public */}
          <Route path="/adminlogin" element={
            <AdminPublicRoute>
              <AdminLogin />
            </AdminPublicRoute>
          } />

          {/* Admin Panel - Protected */}
          <Route path="/admin" element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="deposits" element={<AdminDeposits />} />
            <Route path="withdrawals" element={<AdminWithdrawals />} />
            <Route path="transactions" element={<AdminTransactions />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="notifications" element={<AdminNotifications />} />
            <Route path="admin-management" element={<AdminManagement />} />
            <Route path="activity-logs" element={<ActivityLogs />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="draw-management" element={<DrawManagement />} />
            <Route path="prize-management" element={<PrizeManagement />} />
          </Route>

          {/* ========== USER PANEL ROUTES ========== */}
          <Route path="/user/dashboard" element={
            <UserProtectedRoute>
              <UserDashboard />
            </UserProtectedRoute>
          } />

          {/* Catch all - 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
    </UserProvider>
  );
}

export default App;
