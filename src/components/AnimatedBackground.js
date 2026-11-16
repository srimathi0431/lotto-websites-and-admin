import React from 'react';
import './AnimatedBackground.css';

const AnimatedBackground = () => {
  return (
    <div className="animated-background">
      {/* Large Liquid Gradient Blobs */}
      <div className="gradient-blob blob-1"></div>
      <div className="gradient-blob blob-2"></div>
      <div className="gradient-blob blob-3"></div>
      <div className="gradient-blob blob-4"></div>
      <div className="gradient-blob blob-5"></div>
      
      {/* Floating Particles */}
      <div className="floating-particles">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
        <div className="particle particle-6"></div>
        <div className="particle particle-7"></div>
        <div className="particle particle-8"></div>
      </div>
      
      {/* Decorative SVG Shapes */}
      <svg className="decorative-shapes" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#ff006e', stopOpacity: 0.6}} />
            <stop offset="100%" style={{stopColor: '#8338ec', stopOpacity: 0.6}} />
          </linearGradient>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#06fef9', stopOpacity: 0.5}} />
            <stop offset="100%" style={{stopColor: '#3a86ff', stopOpacity: 0.5}} />
          </linearGradient>
          <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#fb5607', stopOpacity: 0.5}} />
            <stop offset="100%" style={{stopColor: '#ff7c51', stopOpacity: 0.5}} />
          </linearGradient>
        </defs>
        
        {/* Decorative curved lines */}
        <path 
          className="decorative-path path-1" 
          d="M 0 200 Q 400 100 800 200" 
          stroke="url(#grad1)" 
          strokeWidth="3" 
          fill="none"
          opacity="0.4"
        />
        <path 
          className="decorative-path path-2" 
          d="M 200 0 Q 400 300 600 100" 
          stroke="url(#grad2)" 
          strokeWidth="2" 
          fill="none"
          opacity="0.3"
        />
        
        {/* Decorative circles */}
        <circle 
          className="decorative-circle circle-1" 
          cx="100" 
          cy="100" 
          r="50" 
          fill="url(#grad3)" 
          opacity="0.2"
        />
        <circle 
          className="decorative-circle circle-2" 
          cx="700" 
          cy="400" 
          r="80" 
          fill="url(#grad1)" 
          opacity="0.15"
        />
      </svg>
    </div>
  );
};

export default AnimatedBackground;
