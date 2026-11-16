import React from 'react';
import './CSS3DBalls.css';

const CSS3DBalls = () => {
  const balls = [
    // Left side
    { number: 7, color: 'purple', size: 'large', position: { top: '15%', left: '10%' }, delay: '0s' },
    { number: 5, color: 'blue', size: 'medium', position: { bottom: '25%', left: '5%' }, delay: '1s' },
    { number: 3, color: 'orange', size: 'small', position: { bottom: '10%', left: '25%' }, delay: '2s' },
    
    // Right side
    { number: 9, color: 'pink', size: 'large', position: { top: '10%', right: '8%' }, delay: '0.5s' },
    { number: 1, color: 'cyan', size: 'medium', position: { bottom: '20%', right: '15%' }, delay: '1.5s' },
    { number: 8, color: 'dark', size: 'large-alt', position: { bottom: '5%', right: '0%' }, delay: '2.5s' },
  ];

  return (
    <div className="css-3d-balls-container">
      {balls.map((ball, index) => (
        <div
          key={index}
          className={`css-3d-ball ball-${ball.color} ball-${ball.size}`}
          style={{
            ...ball.position,
            animationDelay: ball.delay
          }}
        >
          <div className="ball-sphere">
            <div className="ball-shine"></div>
            <div className="ball-shadow-inner"></div>
            <div className="ball-number-circle">
              <span className="ball-number">{ball.number}</span>
            </div>
            <div className="ball-highlight-top"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CSS3DBalls;
