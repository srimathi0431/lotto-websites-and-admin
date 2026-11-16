// ===================================
// MAIN LAYOUT COMPONENT
// ===================================

import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import ToastContainer from '../common/Toast';
import { useToast } from '../../hooks/useToast';
import { getAdminProfile } from '../../utils/storage';
import { getNotifications } from '../../utils/storage';
import { demoNotifications } from '../../data/demoData';
import { ThemeProvider } from '../../contexts/ThemeContext';
import '../../styles/globals.css';
import '../../styles/layout.css';

const Layout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [adminProfile, setAdminProfile] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const { toasts, removeToast } = useToast();

  useEffect(() => {
    // Force clear old admin profile data
    const oldProfile = getAdminProfile();
    if (oldProfile && oldProfile.role === 'Super Admin') {
      localStorage.removeItem('lottolink_admin_profile');
      localStorage.removeItem('lottolink_auth');
    }

    // Load admin profile
    const profile = getAdminProfile();
    if (profile) {
      setAdminProfile(profile);
    } else {
      // Set default profile
      setAdminProfile({
        fullName: 'Admin',
        email: 'admin@lottolink.com',
        role: 'Admin'
      });
    }

    // Load notifications to count unread
    const notifications = getNotifications(demoNotifications);
    const unread = notifications.filter(n => !n.read).length;
    setUnreadCount(unread);
  }, []);

  const toggleSidebar = () => {
    if (window.innerWidth <= 768) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  return (
    <ThemeProvider>
      <div className="app-layout">
        <Sidebar 
          isCollapsed={isSidebarCollapsed}
          isMobileOpen={isMobileOpen}
          onClose={closeMobileSidebar}
        />
        
        <div className={`main-content ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <Header 
            onToggleSidebar={toggleSidebar}
            adminProfile={adminProfile}
            unreadNotifications={unreadCount}
          />
          
          <main>
            <Outlet />
          </main>
        </div>

        <ToastContainer toasts={toasts} onClose={removeToast} />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
