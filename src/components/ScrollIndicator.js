import React from 'react';
import './ScrollIndicator.css';

const ScrollIndicator = () => {
  return (
    <div className="scroll-indicator">
      <div className="mouse-icon">
        <div className="mouse-wheel"></div>
      </div>
      <span className="scroll-text">Scroll Down</span>
      <svg className="scroll-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 5v14M19 12l-7 7-7-7"/>
      </svg>
    </div>
  );
};

export default ScrollIndicator;
