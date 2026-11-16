import React from 'react';
import './FloatingPromoCards.css';

const FloatingPromoCards = () => {
  const promoCards = [
    {
      id: 1,
      title: '🎁 Welcome Bonus',
      subtitle: 'New Players',
      description: 'Get 50% off your first ticket purchase',
      badge: 'LIMITED TIME',
      position: 'left',
      gradient: 'purple'
    },
    {
      id: 2,
      title: '🔥 Hot Numbers',
      subtitle: 'Most Drawn',
      description: '7, 23, 42 appeared 15+ times this month',
      badge: 'TRENDING',
      position: 'right-top',
      gradient: 'blue'
    },
    {
      id: 3,
      title: '💎 VIP Rewards',
      subtitle: 'Premium Members',
      description: 'Earn 2x points on every purchase',
      badge: 'EXCLUSIVE',
      position: 'right-bottom',
      gradient: 'cyan'
    }
  ];

  return (
    <div className="floating-promo-cards-container">
      {promoCards.map(card => (
        <div 
          key={card.id} 
          className={`floating-promo-card card-${card.position} card-${card.gradient}`}
        >
          <div className="promo-card-inner">
            <div className="promo-badge">{card.badge}</div>
            <div className="promo-card-content">
              <div className="promo-title">{card.title}</div>
              <div className="promo-subtitle">{card.subtitle}</div>
              <div className="promo-description">{card.description}</div>
            </div>
            <div className="promo-card-glow"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FloatingPromoCards;
