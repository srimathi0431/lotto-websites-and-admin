import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Packages.css';

gsap.registerPlugin(ScrollTrigger);

const Packages = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Badge - pop in
      gsap.from('.packages-badge', {
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
        },
        scale: 0,
        opacity: 0,
        rotation: 360,
        duration: 0.7,
        ease: 'back.out(1.7)'
      });

      // Main heading - slide and blur
      gsap.from('.packages-main-heading', {
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 82%',
        },
        opacity: 0,
        y: 40,
        scale: 0.8,
        filter: 'blur(10px)',
        duration: 0.9,
        delay: 0.15,
        ease: 'power3.out'
      });

      // Subtitle fade
      gsap.from('.packages-subtitle', {
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 20,
        duration: 0.7,
        delay: 0.35,
        ease: 'power2.out'
      });

      // Card animations - wave from sides
      const cards = gsap.utils.toArray('.package-card');
      cards.forEach((card, index) => {
        const fromLeft = index % 2 === 0;
        
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 92%',
          },
          x: fromLeft ? -150 : 150,
          opacity: 0,
          rotation: fromLeft ? -20 : 20,
          scale: 0.7,
          duration: 0.9,
          delay: index * 0.12,
          ease: 'back.out(1.3)'
        });

        // Icon bounce
        const icon = card.querySelector('.package-icon');
        if (icon) {
          gsap.from(icon, {
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
            },
            y: -80,
            opacity: 0,
            scale: 0,
            duration: 0.8,
            delay: index * 0.12 + 0.3,
            ease: 'bounce.out'
          });
        }

        // Price pop
        const price = card.querySelector('.package-price');
        if (price) {
          gsap.from(price, {
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
            },
            scale: 0,
            rotation: 360,
            opacity: 0,
            duration: 0.7,
            delay: index * 0.12 + 0.4,
            ease: 'back.out(1.5)'
          });
        }

        // Button slide
        const button = card.querySelector('.package-button');
        if (button) {
          gsap.from(button, {
            scrollTrigger: {
              trigger: card,
              start: 'top 86%',
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.12 + 0.5,
            ease: 'power2.out'
          });
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const packages = [
    {
      id: 1,
      name: 'Daily Package',
      price: '$1',
      priceLabel: 'per ticket',
      description: 'Start small, win big! Perfect for daily players.',
      features: [
        'Ticket Price: $1',
        'Min. Tickets: 300',
        'Max: Unlimited',
        'Draw: 5:30 PM UTC',
        'Every single day',
        'Instant notifications',
        'Multiple entries allowed'
      ],
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      bgGradient: 'linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%)',
      theme: 'blue',
      icon: '🎯'
    },
    {
      id: 2,
      name: 'Weekly Jackpot',
      price: '$3',
      priceLabel: 'per ticket',
      popular: true,
      description: 'Most popular! Better odds, bigger prizes.',
      features: [
        'Ticket Price: $3',
        'Min. Tickets: 1,000',
        'Max: Unlimited',
        'Draw: 5:30 PM UTC',
        'Every week',
        'Premium support',
        'Bonus multiplier'
      ],
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      bgGradient: 'linear-gradient(135deg, rgba(240,147,251,0.1) 0%, rgba(245,87,108,0.1) 100%)',
      theme: 'purple',
      icon: '🏆'
    },
    {
      id: 3,
      name: 'Monthly Contest',
      price: '$12',
      priceLabel: 'per ticket',
      description: 'Life-changing rewards every month!',
      features: [
        'Ticket Price: $12',
        'Min. Tickets: 2,000',
        'Max: Unlimited',
        'Draw: 5:30 PM UTC',
        'Monthly mega draw',
        'VIP customer service',
        'Exclusive bonuses'
      ],
      gradient: 'linear-gradient(135deg, #ffa751 0%, #ffe259 100%)',
      bgGradient: 'linear-gradient(135deg, rgba(255,167,81,0.1) 0%, rgba(255,226,89,0.1) 100%)',
      theme: 'gold',
      icon: '💰'
    },
    {
      id: 4,
      name: 'Mega Jackpot',
      price: '$25',
      priceLabel: 'per ticket',
      description: 'The ultimate prize pool awaits you!',
      features: [
        'Ticket Price: $25',
        'Min. Tickets: 2,500',
        'Max: Unlimited',
        'Draw: 5:30 PM UTC',
        'Biggest jackpots',
        'Concierge service',
        'Guaranteed payouts'
      ],
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      bgGradient: 'linear-gradient(135deg, rgba(79,172,254,0.1) 0%, rgba(0,242,254,0.1) 100%)',
      theme: 'mega',
      icon: '🎰'
    }
  ];

  const handleCardClick = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const handleChoosePlan = (pkg, e) => {
    e.stopPropagation();
    console.log('Selected package:', pkg.name);
    alert(`You selected ${pkg.name} package for ${pkg.price}`);
  };

  return (
    <section ref={sectionRef} className="packages-section" id="packages">
      <div className="packages-background">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>
      </div>

      <div className="packages-container">
        <div ref={headingRef} className="packages-header">
          <div className="packages-badge">
            <span className="packages-badge-text">OUR PACKAGES</span>
          </div>
          
          <h2 className="packages-main-heading">
            Choose Your <span className="gradient-text">Lucky Package</span>
          </h2>
          
          <p className="packages-subtitle">
            Explore daily, weekly and monthly lottery opportunities with amazing rewards
          </p>
        </div>

        <div className="packages-grid">
          {packages.map((pkg) => (
            <div 
              key={pkg.id} 
              className={`package-card package-${pkg.theme} ${expandedCard === pkg.id ? 'expanded' : ''}`}
              onClick={() => handleCardClick(pkg.id)}
              style={{ background: pkg.bgGradient }}
            >
              {pkg.popular && (
                <div className="package-popular-badge">⭐ POPULAR</div>
              )}

              <div className="package-icon">{pkg.icon}</div>

              <h3 className="package-name">{pkg.name}</h3>

              <div className="package-price-container">
                <div className="package-price" style={{ background: pkg.gradient }}>
                  {pkg.price}
                </div>
                <span className="package-price-label">{pkg.priceLabel}</span>
              </div>

              <p className="package-description">{pkg.description}</p>

              <div className={`package-features ${expandedCard === pkg.id ? 'show' : ''}`}>
                {pkg.features.map((feature, idx) => (
                  <div key={idx} className="package-feature">
                    <span className="feature-check">✓</span>
                    <span className="feature-text">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                className="package-button"
                style={{ background: pkg.gradient }}
                onClick={(e) => handleChoosePlan(pkg, e)}
              >
                <span className="btn-text">Choose Plan</span>
                <span className="btn-arrow">→</span>
              </button>

              <div className="card-glow" style={{ background: pkg.gradient }}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;
