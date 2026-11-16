import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Enrollment.css';

gsap.registerPlugin(ScrollTrigger);

const Enrollment = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card entrance animation
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1.5,
        },
        opacity: 0,
        y: 100,
        scale: 0.9,
        rotateY: -15,
        filter: 'blur(10px)',
        ease: 'power3.out'
      });

      // Title animation
      gsap.from('.enrollment-title', {
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 75%',
          end: 'top 55%',
          scrub: 1,
        },
        opacity: 0,
        y: 50,
        filter: 'blur(8px)',
        ease: 'power3.out'
      });

      // Steps stagger
      gsap.from('.enrollment-step', {
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 70%',
          end: 'top 45%',
          scrub: 1,
        },
        opacity: 0,
        x: -50,
        stagger: 0.1,
        ease: 'power2.out'
      });

      // Button animation
      gsap.from('.enrollment-button', {
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 65%',
          end: 'top 50%',
          scrub: 1,
        },
        opacity: 0,
        scale: 0.8,
        ease: 'back.out(1.7)'
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const enrollmentSteps = [
    { number: '01', text: 'Fill registration form with your details' },
    { number: '02', text: 'Choose your preferred lottery package' },
    { number: '03', text: 'Complete secure payment process' },
    { number: '04', text: 'Start playing and win big rewards' },
  ];

  return (
    <section ref={sectionRef} className="enrollment-section">
      <div className="enrollment-bg">
        <div className="enrollment-orb enrollment-orb-1"></div>
        <div className="enrollment-orb enrollment-orb-2"></div>
        <div className="enrollment-orb enrollment-orb-3"></div>
      </div>

      <div className="enrollment-container">
        <div ref={cardRef} className="enrollment-card">
          <div className="enrollment-glow"></div>
          
          <div className="enrollment-badge">
            <span className="badge-dot"></span>
            <span className="badge-text">QUICK ENROLLMENT</span>
            <span className="badge-dot"></span>
          </div>

          <h2 className="enrollment-title">
            <span className="title-line">Start Your</span>
            <span className="title-gradient">Lottery Journey Today</span>
          </h2>

          <p className="enrollment-subtitle">
            Join thousands of winners. Simple, fast, and secure enrollment process.
          </p>

          <div className="enrollment-steps">
            {enrollmentSteps.map((step, index) => (
              <div key={index} className="enrollment-step">
                <div className="step-number">{step.number}</div>
                <div className="step-text">{step.text}</div>
                <div className="step-line"></div>
              </div>
            ))}
          </div>

          <button className="enrollment-button">
            <span className="button-text">Enroll Now</span>
            <span className="button-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </button>

          <div className="enrollment-features">
            <div className="feature-item">
              <span className="feature-dot"></span>
              <span>No Hidden Fees</span>
            </div>
            <div className="feature-item">
              <span className="feature-dot"></span>
              <span>Instant Activation</span>
            </div>
            <div className="feature-item">
              <span className="feature-dot"></span>
              <span>Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Enrollment;
