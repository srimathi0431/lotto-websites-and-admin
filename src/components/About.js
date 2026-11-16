import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <div className="section-label reveal">
              <span>About Lotto Link</span>
            </div>
            
            <h2 className="reveal">
              Your Trusted <span className="text-gradient">Lottery Information</span> Platform
            </h2>
            
            <p className="reveal">
              Lotto Link is your comprehensive source for lottery information, providing users with 
              valuable insights, strategic packages, and up-to-date resources to enhance their 
              lottery experience.
            </p>
            
            <p className="reveal">
              We are dedicated to delivering premium content, detailed analysis, and carefully 
              curated packages that help lottery enthusiasts make informed decisions. Our platform 
              combines cutting-edge technology with expert knowledge to provide you with the best 
              lottery information service available.
            </p>
            
            <div className="about-highlights reveal">
              <div className="highlight-item">
                <div className="highlight-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div className="highlight-text">
                  <h4>Premium Content</h4>
                  <p>Exclusive lottery information and analysis</p>
                </div>
              </div>
              
              <div className="highlight-item">
                <div className="highlight-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div className="highlight-text">
                  <h4>Expert Curation</h4>
                  <p>Professionally researched and compiled packages</p>
                </div>
              </div>
              
              <div className="highlight-item">
                <div className="highlight-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div className="highlight-text">
                  <h4>Regular Updates</h4>
                  <p>Stay current with the latest lottery information</p>
                </div>
              </div>
            </div>
            
            <a href="#packages" className="btn btn-primary reveal">
              Explore Our Packages
            </a>
          </div>
          
          <div className="about-visual">
            <div className="about-card card-1 reveal">
              <div className="card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
              </div>
              <h4>Comprehensive Data</h4>
              <p>Access detailed lottery statistics and insights</p>
            </div>
            
            <div className="about-card card-2 reveal">
              <div className="card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
              </div>
              <h4>Strategic Information</h4>
              <p>Get expert analysis and winning strategies</p>
            </div>
            
            <div className="about-card card-3 reveal">
              <div className="card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="7"></circle>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
              </div>
              <h4>Proven Results</h4>
              <p>Join thousands of satisfied users</p>
            </div>
            
            {/* Decorative gradient elements */}
            <div className="about-gradient-blob blob-pink"></div>
            <div className="about-gradient-blob blob-blue"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
