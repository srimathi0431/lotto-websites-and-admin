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

const Layout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [adminProfile, setAdminProfile] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const { toasts, removeToast } = useToast();

  useEffect(() => {
    // Load admin profile
    const profile = getAdminProfile();
    if (profile) {
      setAdminProfile(profile);
    } else {
      // Set default profile
      setAdminProfile({
        fullName: 'Super Admin',
        email: 'admin@lottolink.com',
        role: 'Super Admin'
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
  );
};

export default Layout;
