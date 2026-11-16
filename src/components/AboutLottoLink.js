import React, { useEffect, useRef, useState } from 'react';
import './AboutLottoLink.css';

const AboutLottoLink = () => {
  const cardsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px'
      }
    );

    if (cardsRef.current) {
      observer.observe(cardsRef.current);
    }

    return () => {
      if (cardsRef.current) {
        observer.unobserve(cardsRef.current);
      }
    };
  }, []);

  const scrollToPackages = () => {
    const packagesSection = document.getElementById('packages');
    if (packagesSection) {
      packagesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="about-lotto-link-section">
      {/* Animated Background with Zoom Circles */}
      <div className="about-bg-animation">
        {/* Zoom In Circles - New from center */}
        <div className="zoom-circle zoom-circle-1"></div>
        <div className="zoom-circle zoom-circle-2"></div>
        <div className="zoom-circle zoom-circle-3"></div>
        <div className="zoom-circle zoom-circle-4"></div>
        <div className="zoom-circle zoom-circle-5"></div>
        <div className="zoom-circle zoom-circle-6"></div>
      </div>

      <div className="about-lotto-container">
        {/* Badge */}
        <div className="about-badge-wrapper">
          <div className="about-badge">
            <span className="about-badge-line"></span>
            <span className="about-badge-text">ABOUT LOTTO LINK</span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="about-content-grid">
          {/* Left Side */}
          <div className="about-left-content">
            <h2 className="about-main-heading">
              <span className="about-heading-dark">Play Today</span>
              <span className="about-heading-gradient">For a Brighter Tomorrow</span>
            </h2>

            <p className="about-description">
              Lotto Link is a trusted online lottery platform where you can play your favourite lottery games, check results instantly and win exciting rewards. We make it simple, secure and transparent for everyone.
            </p>

            {/* Trust Features */}
            <div className="about-trust-features">
              <div className="about-trust-item">
                <div className="about-trust-icon about-icon-purple">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <span className="about-trust-title">Safe & Secure Platform</span>
              </div>

              <div className="about-trust-item">
                <div className="about-trust-icon about-icon-pink">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="8" width="18" height="12" rx="2" ry="2"></rect>
                    <path d="M7 8V6a5 5 0 0110 0v2"></path>
                    <circle cx="12" cy="13" r="1"></circle>
                  </svg>
                </div>
                <span className="about-trust-title">Exciting Rewards</span>
              </div>

              <div className="about-trust-item">
                <div className="about-trust-icon about-icon-blue">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <span className="about-trust-title">Transparent Results</span>
              </div>

              <div className="about-trust-item">
                <div className="about-trust-icon about-icon-orange">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" y1="19" x2="12" y2="22"></line>
                  </svg>
                </div>
                <span className="about-trust-title">24/7 Support</span>
              </div>
            </div>

            {/* CTA Button */}
            <button className="about-cta-button" onClick={scrollToPackages}>
              <span>Start Playing Now</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          {/* Right Side - Statistics Card */}
          <div className="about-right-content">
            <div className="about-stats-card">
              <div className="about-stats-main">
                <div className="about-stats-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                    <path d="M4 22h16"></path>
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                  </svg>
                </div>
                <div className="about-stats-number">100K+</div>
                <div className="about-stats-label">Happy Players</div>
              </div>

              <div className="about-stats-divider"></div>

              <div className="about-stats-grid">
                <div className="about-stat-item">
                  <div className="about-stat-number">500+</div>
                  <div className="about-stat-label">Exciting Draws</div>
                </div>
                <div className="about-stat-item">
                  <div className="about-stat-number">$10M+</div>
                  <div className="about-stat-label">Rewards Given</div>
                </div>
                <div className="about-stat-item">
                  <div className="about-stat-number">99.9%</div>
                  <div className="about-stat-label">Secure Platform</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Cards */}
        <div ref={cardsRef} className={`about-how-it-works ${isVisible ? 'cards-visible' : ''}`}>
          <div className="about-process-card about-card-purple">
            <div className="about-card-number">1</div>
            <div className="about-card-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <line x1="19" y1="8" x2="19" y2="14"></line>
                <line x1="22" y1="11" x2="16" y2="11"></line>
              </svg>
            </div>
            <h3 className="about-card-title">Register</h3>
            <p className="about-card-description">Create your account in minutes</p>
          </div>

          <div className="about-arrow-connector">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </div>

          <div className="about-process-card about-card-pink">
            <div className="about-card-number">2</div>
            <div className="about-card-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="8" width="18" height="12" rx="2" ry="2"></rect>
                <path d="M7 8V6a5 5 0 0110 0v2"></path>
                <circle cx="12" cy="13" r="1"></circle>
              </svg>
            </div>
            <h3 className="about-card-title">Choose Package</h3>
            <p className="about-card-description">Pick the package that fits you</p>
          </div>

          <div className="about-arrow-connector">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </div>

          <div className="about-process-card about-card-blue">
            <div className="about-card-number">3</div>
            <div className="about-card-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <text x="12" y="16" textAnchor="middle" fontSize="10" fill="currentColor" fontWeight="bold">7</text>
              </svg>
            </div>
            <h3 className="about-card-title">Play & Win</h3>
            <p className="about-card-description">Get your lucky numbers and participate</p>
          </div>

          <div className="about-arrow-connector">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </div>

          <div className="about-process-card about-card-orange">
            <div className="about-card-number">4</div>
            <div className="about-card-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                <path d="M4 22h16"></path>
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
              </svg>
            </div>
            <h3 className="about-card-title">See Results</h3>
            <p className="about-card-description">Check results and win rewards</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutLottoLink;
