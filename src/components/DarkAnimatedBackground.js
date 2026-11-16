import React from 'react';
import './DarkAnimatedBackground.css';

const DarkAnimatedBackground = () => {
  return (
    <div className="dark-animated-background">
      {/* Ambient Purple/Blue Light Orbs */}
      <div className="ambient-orb orb-purple-1"></div>
      <div className="ambient-orb orb-purple-2"></div>
      <div className="ambient-orb orb-blue-1"></div>
      <div className="ambient-orb orb-blue-2"></div>
      <div className="ambient-orb orb-purple-3"></div>
      
      {/* Floating Particles */}
      <div className="particles-container-dark">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i} 
            className="dark-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${20 + Math.random() * 15}s`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`
            }}
          ></div>
        ))}
      </div>
      
      {/* Purple Glow Effect */}
      <div className="purple-glow-layer"></div>
    </div>
  );
};

export default DarkAnimatedBackground;
