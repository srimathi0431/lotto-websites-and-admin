import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    // Scroll to top when route changes (except hash navigation)
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  // Scroll to section when hash changes
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.substring(1); // Remove #
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          const navHeight = 60;
          const targetPosition = section.getBoundingClientRect().top + window.pageYOffset - navHeight;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
      }, 100); // Small delay to ensure page is loaded
    }
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    // If not on home page, navigate to home first with hash
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      return;
    }
    
    // Already on home, just scroll
    const section = document.getElementById(sectionId);
    if (section) {
      const navHeight = 60;
      const targetPosition = section.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar-colorful ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container-colorful">
        {/* Logo */}
        <Link to="/" className="navbar-logo-colorful">
          <div className="navbar-logo-icon">
            <svg viewBox="0 0 40 20" className="logo-infinity-mini">
              <defs>
                <linearGradient id="navInfinityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{stopColor: '#ec4899', stopOpacity: 1}} />
                  <stop offset="50%" style={{stopColor: '#f97316', stopOpacity: 1}} />
                  <stop offset="100%" style={{stopColor: '#fbbf24', stopOpacity: 1}} />
                </linearGradient>
              </defs>
              <path 
                d="M 10,10 C 10,5 15,3 20,10 C 25,17 30,15 30,10 C 30,5 25,3 20,10 C 15,17 10,15 10,10 Z" 
                fill="url(#navInfinityGradient)"
              />
            </svg>
          </div>
          <span className="navbar-logo-text">
            <span className="logo-lotto-nav">LOTTO</span>
            <span className="logo-link-nav">LINK</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="navbar-menu-colorful desktop-menu">
          <li>
            <Link to="/" className={`nav-link-colorful ${isActive('/')}`}>
              Home
            </Link>
          </li>
          <li>
            <a href="#how-it-works" onClick={(e) => scrollToSection(e, 'how-it-works')} className="nav-link-colorful">
              How It Works
            </a>
          </li>
          <li>
            <Link to="/packages" className={`nav-link-colorful ${isActive('/packages')}`}>
              Packages
            </Link>
          </li>
          <li>
            <Link to="/prize" className={`nav-link-colorful ${isActive('/prize')}`}>
              Prize
            </Link>
          </li>
          <li>
            <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} className="nav-link-colorful">
              FAQ
            </a>
          </li>
        </ul>

        {/* Desktop Actions */}
        <div className="navbar-actions-colorful desktop-actions">
          <Link to="/login" className="nav-btn nav-login-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>Login</span>
          </Link>
          
          <Link to="/register" className="nav-btn nav-register-btn">
            <span className="btn-text">Get Started</span>
            <svg className="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className={`mobile-hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && <div className="mobile-overlay" onClick={toggleMenu}></div>}

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <ul className="mobile-menu-list">
          <li>
            <Link to="/" className={`mobile-menu-link ${isActive('/')}`} onClick={toggleMenu}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <a href="#how-it-works" onClick={(e) => scrollToSection(e, 'how-it-works')} className="mobile-menu-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
              <span>How It Works</span>
            </a>
          </li>
          <li>
            <Link to="/packages" className={`mobile-menu-link ${isActive('/packages')}`} onClick={toggleMenu}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
              </svg>
              <span>Packages</span>
            </Link>
          </li>
          <li>
            <Link to="/prize" className={`mobile-menu-link ${isActive('/prize')}`} onClick={toggleMenu}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
              </svg>
              <span>Prize</span>
            </Link>
          </li>
          <li>
            <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} className="mobile-menu-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
              </svg>
              <span>FAQ</span>
            </a>
          </li>
        </ul>

        <div className="mobile-menu-actions">
          <Link to="/login" className="nav-btn nav-login-btn" onClick={toggleMenu}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>Login</span>
          </Link>
          
          <Link to="/register" className="nav-btn nav-register-btn" onClick={toggleMenu}>
            <span className="btn-text">Get Started</span>
            <svg className="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
