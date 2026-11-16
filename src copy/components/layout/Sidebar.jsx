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
  Ticket
} from 'lucide-react';

const Sidebar = ({ isCollapsed, isMobileOpen, onClose }) => {
  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/users', icon: Users, label: 'Users' },
    { path: '/deposits', icon: ArrowDownToLine, label: 'Deposits' },
    { path: '/withdrawals', icon: ArrowUpFromLine, label: 'Withdrawals' },
    { path: '/transactions', icon: Receipt, label: 'Transactions' },
    { path: '/reports', icon: FileText, label: 'Reports' },
    { path: '/notifications', icon: Bell, label: 'Notifications' },
    { path: '/admin-management', icon: Shield, label: 'Admin Management' },
    { path: '/activity-logs', icon: Activity, label: 'Activity Logs' },
    { path: '/settings', icon: Settings, label: 'Settings' },
    { path: '/profile', icon: UserCircle, label: 'Admin Profile' }
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
            to="/login"
            className="nav-item"
            onClick={handleNavClick}
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
