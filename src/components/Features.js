import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Features.css';

gsap.registerPlugin(ScrollTrigger);

const getIcon = (iconName) => {
  const icons = {
    'lightning': (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
      </svg>
    ),
    'lock': (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    ),
    'chart': (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="20" x2="18" y2="10"></line>
        <line x1="12" y1="20" x2="12" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="14"></line>
      </svg>
    ),
    'dollar': (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
    ),
    'mobile': (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
        <line x1="12" y1="18" x2="12.01" y2="18"></line>
      </svg>
    ),
    'support': (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
    ),
  };
  return icons[iconName] || icons['support'];
};

const Features = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header - zoom in with blur
      gsap.from('.features-badge', {
        scrollTrigger: {
          trigger: '.features-header',
          start: 'top 85%',
        },
        scale: 0,
        opacity: 0,
        filter: 'blur(20px)',
        duration: 0.8,
        ease: 'power4.out'
      });

      gsap.from('.features-title', {
        scrollTrigger: {
          trigger: '.features-header',
          start: 'top 82%',
        },
        opacity: 0,
        scale: 0.5,
        filter: 'blur(15px)',
        duration: 0.9,
        delay: 0.15,
        ease: 'power3.out'
      });

      gsap.from('.features-subtitle', {
        scrollTrigger: {
          trigger: '.features-header',
          start: 'top 80%',
        },
        opacity: 0,
        y: 30,
        duration: 0.7,
        delay: 0.35,
        ease: 'power2.out'
      });

      // Cards - wave slide from sides
      const cards = gsap.utils.toArray('.feature-card');
      cards.forEach((card, index) => {
        const fromLeft = index % 2 === 0;
        
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 92%',
          },
          x: fromLeft ? -200 : 200,
          opacity: 0,
          rotation: fromLeft ? -25 : 25,
          scale: 0.6,
          duration: 1,
          delay: index * 0.15,
          ease: 'back.out(1.4)'
        });
      });

      // Icons - bounce with delay
      gsap.utils.toArray('.feature-icon').forEach((icon, index) => {
        gsap.from(icon, {
          scrollTrigger: {
            trigger: icon,
            start: 'top 90%',
          },
          y: -100,
          opacity: 0,
          scale: 0,
          duration: 1,
          delay: index * 0.12,
          ease: 'bounce.out'
        });
      });

      // Title text wave
      gsap.utils.toArray('.feature-title').forEach((title, index) => {
        gsap.from(title, {
          scrollTrigger: {
            trigger: title,
            start: 'top 88%',
          },
          opacity: 0,
          x: -50,
          duration: 0.7,
          delay: index * 0.1 + 0.3,
          ease: 'power2.out'
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: 'lightning',
      title: 'Instant Access',
      description: 'Get immediate access to your lottery tickets and information',
      color: '#3b82f6',
      gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)'
    },
    {
      icon: 'lock',
      title: 'Secure Platform',
      description: 'Bank-level security to protect your data and transactions',
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981, #059669)'
    },
    {
      icon: 'chart',
      title: 'Live Results',
      description: 'Real-time lottery draw results at 5:30 PM UTC every day',
      color: '#a855f7',
      gradient: 'linear-gradient(135deg, #a855f7, #ec4899)'
    },
    {
      icon: 'dollar',
      title: 'Multiple Packages',
      description: 'Choose from daily, weekly, and monthly lottery packages',
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b, #f97316)'
    },
    {
      icon: 'mobile',
      title: 'Mobile Friendly',
      description: 'Play from anywhere on any device - phone, tablet, or desktop',
      color: '#ec4899',
      gradient: 'linear-gradient(135deg, #ec4899, #a855f7)'
    },
    {
      icon: 'support',
      title: '24/7 Support',
      description: 'Round-the-clock customer support for all your queries',
      color: '#06b6d4',
      gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)'
    }
  ];

  return (
    <section ref={sectionRef} className="features-section" id="features">
      {/* Background */}
      <div className="features-bg">
        <div className="features-orb features-orb-1"></div>
        <div className="features-orb features-orb-2"></div>
      </div>

      <div className="container">
        <div className="features-header">
          <div className="features-badge">
            <span className="features-badge-text">FEATURES</span>
          </div>
          
          <h2 className="features-title">
            Why Choose <span className="features-gradient-text">Lotto Link</span>
          </h2>
          
          <p className="features-subtitle">
            Experience the best lottery platform with premium features
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card"
              style={{ '--feature-color': feature.color }}
            >
              <div className="feature-card-inner">
                <div className="feature-icon" style={{ background: feature.gradient }}>
                  {getIcon(feature.icon)}
                </div>
                
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.description}</p>

                <div className="feature-glow" style={{ background: feature.gradient }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
