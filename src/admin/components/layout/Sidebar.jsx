// ===================================
// SIDEBAR COMPONENT
// ===================================

import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  ArrowDownToLine,
  ArrowUpFromLine,
  Receipt,
  FileText,
  Bell,
  Shield,
  Activity,
  Settings,
  UserCircle,
  LogOut,
  Ticket,
  Calendar,
  Award
} from 'lucide-react';

const Sidebar = ({ isCollapsed, isMobileOpen, onClose }) => {
  const navItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/users', icon: Users, label: 'Users' },
    { path: '/admin/deposits', icon: ArrowDownToLine, label: 'Deposits' },
    { path: '/admin/withdrawals', icon: ArrowUpFromLine, label: 'Withdrawals' },
    { path: '/admin/transactions', icon: Receipt, label: 'Transactions' },
    { path: '/admin/draw-management', icon: Calendar, label: 'Draw Management' },
    { path: '/admin/prize-management', icon: Award, label: 'Prize Management' },
    { path: '/admin/reports', icon: FileText, label: 'Reports' },
    { path: '/admin/notifications', icon: Bell, label: 'Notifications' },
    { path: '/admin/activity-logs', icon: Activity, label: 'Activity Logs' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
    { path: '/admin/profile', icon: UserCircle, label: 'Profile' }
  ];

  const handleNavClick = () => {
    if (window.innerWidth <= 768) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`mobile-overlay ${isMobileOpen ? 'active' : ''}`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Ticket size={24} />
          </div>
          <div className="sidebar-brand">
            Lotto Link
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              <item.icon className="nav-item-icon" />
              <span className="nav-item-text">{item.label}</span>
            </NavLink>
          ))}
          
          {/* Logout */}
          <NavLink
            to="/adminlogin"
            className="nav-item"
            onClick={() => {
              localStorage.removeItem('adminAuth');
              handleNavClick();
            }}
            style={{ marginTop: 'auto' }}
          >
            <LogOut className="nav-item-icon" />
            <span className="nav-item-text">Logout</span>
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
