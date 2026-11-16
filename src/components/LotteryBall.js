import React from 'react';
import './LotteryBall.css';

const LotteryBall = ({ id, number, color, top, bottom, left, right, delay, size = 'medium' }) => {
  const colorMap = {
    pink: 'var(--color-hot-pink)',
    blue: 'var(--color-electric-blue)',
    cyan: 'var(--color-cyan)',
    violet: 'var(--color-vibrant-violet)',
    orange: 'var(--color-sunset-orange)',
    turquoise: 'var(--color-turquoise)'
  };

  const style = {
    top,
    bottom,
    left,
    right,
    animationDelay: `${delay}s`,
    '--ball-color': colorMap[color] || colorMap.blue
  };

  return (
    <div 
      className={`lottery-ball lottery-ball-${size}`} 
      style={style}
    >
      <div className="ball-3d">
        <div className="ball-shine"></div>
        <div className="ball-number">{number}</div>
        <div className="ball-shadow-inner"></div>
      </div>
    </div>
  );
};

export default LotteryBall;
