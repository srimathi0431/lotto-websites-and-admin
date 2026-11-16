import React from 'react';
import './LotterySphere.css';

const LotterySphere = () => {
  // Lottery balls inside the sphere
  const insideBalls = [
    { id: 1, number: 7, color: 'pink', position: { top: '30%', left: '20%' } },
    { id: 2, number: 23, color: 'yellow', position: { top: '45%', left: '35%' } },
    { id: 3, number: 42, color: 'cyan', position: { top: '25%', right: '25%' } },
    { id: 4, number: 15, color: 'orange', position: { bottom: '30%', left: '30%' } },
    { id: 5, number: 8, color: 'green', position: { bottom: '35%', right: '28%' } },
  ];

  // Floating balls outside the sphere
  const floatingBalls = [
    { id: 6, number: 33, color: 'cyan', size: 'small', position: { top: '10%', left: '5%' } },
    { id: 7, number: 19, color: 'pink', size: 'medium', position: { top: '15%', right: '8%' } },
    { id: 8, number: 5, color: 'yellow', size: 'small', position: { bottom: '15%', left: '10%' } },
  ];

  const ballColors = {
    pink: 'var(--color-ball-pink)',
    yellow: 'var(--color-ball-yellow)',
    cyan: 'var(--color-ball-cyan)',
    orange: 'var(--color-ball-orange)',
    green: 'var(--color-ball-green)',
    purple: 'var(--color-ball-purple)'
  };

  return (
    <div className="lottery-sphere-container">
      {/* Floating balls outside */}
      {floatingBalls.map(ball => (
        <div
          key={ball.id}
          className={`floating-lottery-ball ball-${ball.size}`}
          style={{
            ...ball.position,
            '--ball-color': ballColors[ball.color]
          }}
        >
          <div className="ball-3d-outer">
            <div className="ball-shine-outer"></div>
            <div className="ball-number-outer">{ball.number}</div>
          </div>
        </div>
      ))}

      {/* Main glass sphere */}
      <div className="glass-sphere">
        <div className="sphere-glass-overlay"></div>
        <div className="sphere-highlight"></div>
        <div className="sphere-shadow"></div>
        
        {/* Balls inside the sphere */}
        <div className="balls-inside-sphere">
          {insideBalls.map(ball => (
            <div
              key={ball.id}
              className="lottery-ball-inside"
              style={{
                ...ball.position,
                '--ball-color': ballColors[ball.color]
              }}
            >
              <div className="ball-3d-inside">
                <div className="ball-shine-inside"></div>
                <div className="ball-number-inside">{ball.number}</div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Purple ambient glow */}
        <div className="sphere-ambient-glow"></div>
      </div>
    </div>
  );
};

export default LotterySphere;
