// ===================================
// USER SIDEBAR NAVIGATION
// Mobile-friendly slide menu
// ===================================

import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Ticket,
  User,
  Wallet,
  ShoppingBag,
  Trophy,
  History,
  Bell,
  Settings,
  LogOut,
  X
} from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import './UserSidebar.css';

const UserSidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useUser();

  const navItems = [
    { path: '/user/dashboard', icon: LayoutDashboard, label: 'Dashboard', color: '#6366F1' },
    { path: '/user/draws', icon: Ticket, label: 'Draw Packages', color: '#8B5CF6' },
    { path: '/user/wallet', icon: Wallet, label: 'Personal Wallet', color: '#10B981' },
    { path: '/user/my-tickets', icon: ShoppingBag, label: 'My Tickets', color: '#F59E0B' },
    { path: '/user/results', icon: Trophy, label: 'Results', color: '#EF4444' },
    { path: '/user/transactions', icon: History, label: 'Transactions', color: '#06B6D4' },
    { path: '/user/notifications', icon: Bell, label: 'Notifications', color: '#EC4899' },
    { path: '/user/profile', icon: User, label: 'Profile', color: '#14B8A6' },
    { path: '/user/settings', icon: Settings, label: 'Settings', color: '#64748B' }
  ];

  const handleLogout = () => {
    logout();
    onClose();
    window.location.href = '/';
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`user-sidebar-overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <aside className={`user-sidebar ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="user-sidebar-header">
          <div className="user-sidebar-profile">
            <div className="user-avatar">
              {user?.fullName?.charAt(0) || 'U'}
            </div>
            <div className="user-info">
              <h3>{user?.fullName || 'User'}</h3>
              <p>{user?.email || 'user@example.com'}</p>
            </div>
          </div>
          <button className="user-sidebar-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="user-sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `user-nav-item ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <div 
                className="user-nav-icon"
                style={{ backgroundColor: `${item.color}20`, color: item.color }}
              >
                <item.icon size={20} />
              </div>
              <span className="user-nav-label">{item.label}</span>
            </NavLink>
          ))}
          
          {/* Logout */}
          <button
            className="user-nav-item user-logout"
            onClick={handleLogout}
          >
            <div className="user-nav-icon" style={{ backgroundColor: '#FEE2E2', color: '#EF4444' }}>
              <LogOut size={20} />
            </div>
            <span className="user-nav-label">Logout</span>
          </button>
        </nav>
      </aside>
    </>
  );
};

export default UserSidebar;
