import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HowItWorks.css';

gsap.registerPlugin(ScrollTrigger);

const getIcon = (iconName) => {
  const icons = {
    user: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    ),
    target: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="12" cy="12" r="6"></circle>
        <circle cx="12" cy="12" r="2"></circle>
      </svg>
    ),
    card: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
        <line x1="1" y1="10" x2="23" y2="10"></line>
      </svg>
    ),
    play: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
      </svg>
    ),
  };
  return icons[iconName] || icons.play;
};

const steps = [
  {
    number: 1, icon: 'user', title: 'Create Account',
    description: 'Sign up for free and create your Lotto Link account in just a few seconds.',
    color: '#3b82f6', gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)'
  },
  {
    number: 2, icon: 'target', title: 'Choose Package',
    description: 'Select from our daily, weekly, or monthly lottery packages that fit your needs.',
    color: '#a855f7', gradient: 'linear-gradient(135deg, #a855f7, #ec4899)'
  },
  {
    number: 3, icon: 'card', title: 'Make Payment',
    description: 'Secure payment process with multiple payment options available.',
    color: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b, #f97316)'
  },
  {
    number: 4, icon: 'play', title: 'Start Playing',
    description: 'Get your lottery tickets and wait for the draw results at 5:30 PM UTC.',
    color: '#10b981', gradient: 'linear-gradient(135deg, #10b981, #06b6d4)'
  }
];

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const [flipped, setFlipped] = useState(null);
  const [isAutoPaused, setIsAutoPaused] = useState(false);

  const startCycle = useCallback(() => {
    if (isAutoPaused) return; // Don't start if manually paused
    
    clearInterval(intervalRef.current);
    clearTimeout(timeoutRef.current);
    
    let currentCard = 0;
    
    const flipNext = () => {
      if (isAutoPaused) return; // Check before each flip
      
      currentCard = (currentCard % 4) + 1;
      setFlipped(currentCard);
      
      // Close after 2 seconds and immediately open next
      timeoutRef.current = setTimeout(() => {
        if (isAutoPaused) return; // Check before closing
        
        setFlipped(null);
        // Immediately flip to next card (no wait)
        setTimeout(flipNext, 100);
      }, 2000);
    };
    
    flipNext();
  }, [isAutoPaused]);

  useEffect(() => {
    const t = setTimeout(() => {
      startCycle();
    }, 600);
    return () => { 
      clearTimeout(t); 
      clearInterval(intervalRef.current); 
      clearTimeout(timeoutRef.current);
    };
  }, [startCycle]);

  const handleTap = (num) => {
    // If tapping the already open card, close it and resume auto
    if (flipped === num) {
      setFlipped(null);
      setIsAutoPaused(false); // Resume auto-play
      setTimeout(() => startCycle(), 300);
    } else {
      // Opening a new card - pause auto-play
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
      setIsAutoPaused(true); // Pause auto-play
      setFlipped(num);
      // Auto-play will NOT resume until user closes the card
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hiw-badge', {
        scrollTrigger: { trigger: '.how-it-works-header', start: 'top 85%' },
        opacity: 0, y: 20, duration: 0.5, ease: 'power3.out'
      });
      gsap.from('.hiw-title', {
        scrollTrigger: { trigger: '.how-it-works-header', start: 'top 82%' },
        opacity: 0, y: 25, duration: 0.5, delay: 0.1, ease: 'power3.out'
      });
      gsap.from('.hiw-subtitle', {
        scrollTrigger: { trigger: '.how-it-works-header', start: 'top 80%' },
        opacity: 0, y: 15, duration: 0.45, delay: 0.2, ease: 'power3.out'
      });
      gsap.from(gsap.utils.toArray('.hiw-step'), {
        scrollTrigger: { trigger: '.hiw-steps-grid', start: 'top 85%' },
        opacity: 0, y: 40, duration: 0.45, stagger: 0.1, ease: 'power3.out'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="how-it-works" id="how-it-works">
      <div className="hiw-bg">
        <div className="hiw-orb hiw-orb-1"></div>
        <div className="hiw-orb hiw-orb-2"></div>
        <div className="hiw-orb hiw-orb-3"></div>
      </div>

      <div className="container">
        <div className="how-it-works-header">
          <div className="hiw-badge">
            <span className="hiw-badge-text">HOW IT WORKS</span>
          </div>
          <h2 className="hiw-title">
            Get Started in <span className="hiw-gradient-text">Four Simple Steps</span>
          </h2>
          <p className="hiw-subtitle">
            Join thousands of players and start your lottery journey today
          </p>
        </div>

        <div className="hiw-steps-grid">
          {steps.map((step) => {
            const isFlipped = flipped === step.number;
            return (
              <div
                key={step.number}
                className="hiw-step"
                onClick={() => handleTap(step.number)}
              >
                <div className={`hiw-flip-inner${isFlipped ? ' hiw-flipped' : ''}`}>

                  {/* FRONT — number + icon + title */}
                  <div className="hiw-face hiw-front">
                    <div className="hiw-number" style={{ background: step.gradient }}>
                      {step.number}
                    </div>
                    <div className="hiw-icon-circle" style={{ color: step.color, border: `2px solid ${step.color}33` }}>
                      {getIcon(step.icon)}
                    </div>
                    <h3 className="hiw-step-title">{step.title}</h3>
                    <span className="hiw-tap-hint">tap to see more</span>
                  </div>

                  {/* BACK — description */}
                  <div className="hiw-face hiw-back" style={{ background: step.gradient }}>
                    <div className="hiw-back-num">{step.number}</div>
                    <h3 className="hiw-back-title">{step.title}</h3>
                    <p className="hiw-back-desc">{step.description}</p>
                    <span className="hiw-back-hint">tap to flip back</span>
                    {/* Progress bar */}
                    <div className="hiw-progress-bar">
                      <div className="hiw-progress-fill"></div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="hiw-dots">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`hiw-dot${flipped === step.number ? ' hiw-dot-active' : ''}`}
              style={{ background: flipped === step.number ? step.color : 'rgba(0,0,0,0.15)' }}
              onClick={() => handleTap(step.number)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
