// ===================================
// HEADER COMPONENT
// ===================================

import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, 
  Search, 
  Bell, 
  ChevronRight,
  User,
  LogOut,
  Moon,
  Sun
} from 'lucide-react';
import { getInitials } from '../../utils/helpers';
import { useTheme } from '../../contexts/ThemeContext';

const Header = ({ onToggleSidebar, adminProfile, unreadNotifications = 0 }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme, isDark } = useTheme();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get breadcrumb from current path
  const getBreadcrumb = () => {
    const path = location.pathname;
    const segments = path.split('/').filter(Boolean);
    
    if (segments.length === 0) return ['Dashboard'];
    
    return segments.map(segment => 
      segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    );
  };

  const breadcrumbs = getBreadcrumb();

  const handleLogout = () => {
    localStorage.removeItem('lottolink_auth');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="header-toggle" onClick={onToggleSidebar}>
          <Menu size={24} />
        </button>

        <nav className="breadcrumb">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="breadcrumb-item">
              {index > 0 && (
                <ChevronRight size={16} className="breadcrumb-separator" />
              )}
              <span className={index === breadcrumbs.length - 1 ? 'breadcrumb-active' : ''}>
                {crumb}
              </span>
            </div>
          ))}
        </nav>
      </div>

      <div className="header-right">
        <div className="header-search">
          <Search className="header-search-icon" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Theme Toggle */}
        <button 
          className="header-icon-btn"
          onClick={toggleTheme}
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button 
          className="header-notification"
          onClick={() => navigate('/notifications')}
        >
          <Bell size={20} />
          {unreadNotifications > 0 && (
            <span className="notification-badge" />
          )}
        </button>

        <div className="header-profile" ref={dropdownRef}>
          <div onClick={() => setShowProfileDropdown(!showProfileDropdown)}>
            <div className="profile-avatar">
              {getInitials(adminProfile?.fullName || 'Admin')}
            </div>
            <div className="profile-info">
              <div className="profile-name">{adminProfile?.fullName || 'Admin'}</div>
            </div>
          </div>

          {showProfileDropdown && (
            <div className="profile-dropdown">
              <button 
                className="dropdown-item"
                onClick={() => {
                  navigate('/profile');
                  setShowProfileDropdown(false);
                }}
              >
                <User size={18} />
                <span>My Profile</span>
              </button>
              <div className="dropdown-divider" />
              <button 
                className="dropdown-item"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
