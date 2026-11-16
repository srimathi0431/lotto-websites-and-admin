import React, { useEffect } from 'react';
import CSS3DBalls from './CSS3DBalls';
import ScrollIndicator from './ScrollIndicator';
import './Hero.css';

const Hero = () => {
  useEffect(() => {
    // Add smooth scroll behavior for anchor links
    const handleSmoothScroll = (e) => {
      const href = e.target.closest('a')?.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const navHeight = 80;
          const targetPosition = target.offsetTop - navHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  const scrollToPackages = (e) => {
    e.preventDefault();
    const packagesSection = document.getElementById('packages');
    if (packagesSection) {
      const navHeight = 80;
      const targetPosition = packagesSection.offsetTop - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="hero-cinematic">
      {/* Static Background Image */}
      <div className="hero-background-static"></div>

      {/* CSS 3D Balls - TEMPORARILY DISABLED */}
      {/* <CSS3DBalls /> */}

      {/* Main Content */}
      <div className="hero-content">
        {/* Central Logo */}
        <div className="hero-logo-container">
          <div className="logo-infinity-symbol">
            <svg viewBox="0 0 120 60" className="infinity-svg">
              <defs>
                <linearGradient id="infinityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#FF1B9E', stopOpacity: 1}} />
                  <stop offset="25%" style={{stopColor: '#FF6B00', stopOpacity: 1}} />
                  <stop offset="50%" style={{stopColor: '#FFD93D', stopOpacity: 1}} />
                  <stop offset="75%" style={{stopColor: '#00D9FF', stopOpacity: 1}} />
                  <stop offset="100%" style={{stopColor: '#681BFA', stopOpacity: 1}} />
                </linearGradient>
              </defs>
              <path 
                d="M 30,30 C 30,15 45,10 60,30 C 75,50 90,45 90,30 C 90,15 75,10 60,30 C 45,50 30,45 30,30 Z" 
                fill="url(#infinityGradient)"
                className="infinity-path"
              />
            </svg>
          </div>
          
          <h1 className="hero-logo-text">
            <span className="logo-lotto">LOTTO</span>
            <span className="logo-link">LINK</span>
          </h1>
        </div>

        {/* Main Headline */}
        <div className="hero-headline">
          <h2 className="headline-line-1">Your Next Moment</h2>
          <h2 className="headline-line-2">Starts Here</h2>
        </div>

        {/* Tagline */}
        <p className="hero-tagline">
          <span>Play Smarter</span>
          <span className="tagline-dot">•</span>
          <span>More Opportunities</span>
          <span className="tagline-dot">•</span>
          <span>A Brighter Tomorrow</span>
        </p>

        {/* CTA Buttons */}
        <div className="hero-cta-buttons">
          <button className="cta-btn cta-primary" onClick={scrollToPackages}>
            <svg className="btn-icon-left" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <path d="M12 8v8M8 12h8"></path>
            </svg>
            <span className="btn-text">Explore Packages</span>
            <svg className="btn-icon-right" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          
          <button className="cta-btn cta-secondary">
            <svg className="btn-icon-left" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span className="btn-text">Get Started</span>
            <svg className="btn-icon-right" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
};

export default Hero;
