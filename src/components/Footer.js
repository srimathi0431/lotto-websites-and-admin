import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => (e) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      const navHeight = 80;
      const targetPosition = section.offsetTop - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section footer-brand">
            <Link to="/" className="footer-logo">
              <div className="footer-logo-icon">🎰</div>
              <span>Lotto Link</span>
            </Link>
            <p className="footer-tagline">
              Your trusted source for premium lottery information and expert insights.
            </p>
            <div className="footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                <span>f</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
                <span>𝕏</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                <span>📷</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                <span>in</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><a href="#about" onClick={scrollToSection('about')}>About Us</a></li>
              <li><a href="#how-it-works" onClick={scrollToSection('how-it-works')}>How It Works</a></li>
              <li><a href="#packages" onClick={scrollToSection('packages')}>Packages</a></li>
              <li><a href="#features" onClick={scrollToSection('features')}>Features</a></li>
              <li><a href="#faq" onClick={scrollToSection('faq')}>FAQ</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-section">
            <h4 className="footer-heading">Support</h4>
            <ul className="footer-links">
              <li><a href="mailto:support@lottolink.com">Contact Us</a></li>
              <li><a href="#faq" onClick={scrollToSection('faq')}>Help Center</a></li>
              <li><a href="mailto:support@lottolink.com">Customer Support</a></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-contact">
              <li>
                <span className="contact-icon">📧</span>
                <a href="mailto:support@lottolink.com" style={{color: 'inherit', textDecoration: 'none'}}>
                  support@lottolink.com
                </a>
              </li>
              <li>
                <span className="contact-icon">📞</span>
                <a href="tel:+15551234567" style={{color: 'inherit', textDecoration: 'none'}}>
                  +1 (555) 123-4567
                </a>
              </li>
              <li>
                <span className="contact-icon">📍</span>
                <span>123 Lottery Ave, Suite 100</span>
              </li>
              <li>
                <span className="contact-icon">🕐</span>
                <span>24/7 Support Available</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Lotto Link. All rights reserved.
          </p>
          <div className="footer-legal">
            <Link to="/terms">Terms</Link>
            <span className="separator">•</span>
            <Link to="/privacy">Privacy</Link>
            <span className="separator">•</span>
            <Link to="/cookies">Cookies</Link>
          </div>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="footer-gradient"></div>
    </footer>
  );
};

export default Footer;
