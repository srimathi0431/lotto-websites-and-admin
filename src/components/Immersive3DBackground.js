import React from 'react';
import './Immersive3DBackground.css';
import LotteryBall from './LotteryBall';

const Immersive3DBackground = () => {
  // Generate lottery balls with random numbers
  const lotteryBalls = [
    { id: 1, number: 7, color: 'pink', top: '15%', left: '10%', delay: 0, size: 'large' },
    { id: 2, number: 23, color: 'blue', top: '25%', right: '15%', delay: 2, size: 'medium' },
    { id: 3, number: 42, color: 'cyan', bottom: '20%', left: '20%', delay: 4, size: 'medium' },
    { id: 4, number: 15, color: 'violet', top: '50%', right: '8%', delay: 1, size: 'small' },
    { id: 5, number: 8, color: 'orange', bottom: '30%', right: '25%', delay: 3, size: 'large' },
    { id: 6, number: 33, color: 'turquoise', top: '70%', left: '15%', delay: 5, size: 'small' },
  ];

  return (
    <div className="immersive-3d-background">
      {/* Layered Atmospheric Gradients */}
      <div className="atmosphere-layer layer-1"></div>
      <div className="atmosphere-layer layer-2"></div>
      <div className="atmosphere-layer layer-3"></div>

      {/* Giant Liquid Gradient Blobs */}
      <div className="liquid-blob blob-cosmic blob-1"></div>
      <div className="liquid-blob blob-ocean blob-2"></div>
      <div className="liquid-blob blob-sunset blob-3"></div>
      <div className="liquid-blob blob-aurora blob-4"></div>
      <div className="liquid-blob blob-fire blob-5"></div>

      {/* Floating Geometric Shapes */}
      <div className="geometric-shape shape-1">
        <div className="shape-inner"></div>
      </div>
      <div className="geometric-shape shape-2">
        <div className="shape-inner"></div>
      </div>
      <div className="geometric-shape shape-3">
        <div className="shape-inner"></div>
      </div>
      <div className="geometric-shape shape-4">
        <div className="shape-inner"></div>
      </div>

      {/* Glossy Gradient Spheres */}
      <div className="gradient-sphere sphere-1"></div>
      <div className="gradient-sphere sphere-2"></div>
      <div className="gradient-sphere sphere-3"></div>
      <div className="gradient-sphere sphere-4"></div>
      <div className="gradient-sphere sphere-5"></div>

      {/* Lottery Balls */}
      <div className="lottery-balls-container">
        {lotteryBalls.map(ball => (
          <LotteryBall key={ball.id} {...ball} />
        ))}
      </div>

      {/* Floating Particles */}
      <div className="particles-container">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="floating-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div>

      {/* Light Rays */}
      <div className="light-rays">
        <div className="light-ray ray-1"></div>
        <div className="light-ray ray-2"></div>
        <div className="light-ray ray-3"></div>
      </div>

      {/* Animated Gradient Rings */}
      <svg className="gradient-rings" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ringGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#0066ff', stopOpacity: 0.3}} />
            <stop offset="100%" style={{stopColor: '#d946ef', stopOpacity: 0.3}} />
          </linearGradient>
          <linearGradient id="ringGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#06d6f9', stopOpacity: 0.3}} />
            <stop offset="100%" style={{stopColor: '#14b8a6', stopOpacity: 0.3}} />
          </linearGradient>
        </defs>
        <circle className="animated-ring ring-1" cx="200" cy="200" r="150" stroke="url(#ringGrad1)" strokeWidth="3" fill="none" />
        <circle className="animated-ring ring-2" cx="800" cy="600" r="200" stroke="url(#ringGrad2)" strokeWidth="4" fill="none" />
      </svg>
    </div>
  );
};

export default Immersive3DBackground;
