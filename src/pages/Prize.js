import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Prize.css';

gsap.registerPlugin(ScrollTrigger);

const Prize = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section
      gsap.from('.prize-hero-badge', {
        opacity: 0,
        scale: 0,
        duration: 0.6,
        ease: 'back.out(1.7)'
      });

      gsap.from('.prize-hero-title', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
      });

      gsap.from('.prize-hero-sub', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        delay: 0.4,
        ease: 'power2.out'
      });

      // Package cards - slide from sides
      gsap.utils.toArray('.prize-pkg-card').forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
          },
          x: index % 2 === 0 ? -100 : 100,
          opacity: 0,
          rotation: index % 2 === 0 ? -15 : 15,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'back.out(1.2)'
        });
      });

      // Allocation cards - stagger from bottom
      gsap.utils.toArray('.prize-alloc-card').forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 92%',
          },
          y: 80,
          opacity: 0,
          scale: 0.8,
          rotation: 5,
          duration: 0.7,
          delay: index * 0.1,
          ease: 'power3.out'
        });

        // Bar animation
        const bar = card.querySelector('.prize-alloc-bar-fill');
        if (bar) {
          gsap.from(bar, {
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
            },
            width: '0%',
            duration: 1,
            delay: index * 0.1 + 0.3,
            ease: 'power2.out'
          });
        }
      });

      // Table - slide up
      gsap.from('.prize-table-card', {
        scrollTrigger: {
          trigger: '.prize-table-card',
          start: 'top 90%',
        },
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out'
      });

      // Table rows - stagger
      gsap.from('.prize-table tbody tr', {
        scrollTrigger: {
          trigger: '.prize-table',
          start: 'top 85%',
        },
        opacity: 0,
        x: -30,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out'
      });

      // Flexible cards - bounce in
      gsap.from('.prize-flex-card', {
        scrollTrigger: {
          trigger: '.prize-flex-cards',
          start: 'top 90%',
        },
        scale: 0,
        opacity: 0,
        duration: 0.7,
        stagger: 0.2,
        ease: 'back.out(1.5)'
      });

      // No winner cards - slide
      gsap.from('.prize-nowinner-card', {
        scrollTrigger: {
          trigger: '.prize-nowinner-grid',
          start: 'top 90%',
        },
        x: (index) => index === 0 ? -80 : 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });

      // Withdrawal card - zoom
      gsap.from('.prize-withdrawal-card', {
        scrollTrigger: {
          trigger: '.prize-withdrawal-card',
          start: 'top 90%',
        },
        scale: 0,
        rotation: 360,
        opacity: 0,
        duration: 0.9,
        ease: 'back.out(1.3)'
      });

      // CTA button - pulse
      gsap.from('.prize-cta-btn', {
        scrollTrigger: {
          trigger: '.prize-cta-btn',
          start: 'top 92%',
        },
        scale: 0,
        opacity: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.6)'
      });

      // Section titles
      gsap.utils.toArray('.prize-section-title').forEach(title => {
        gsap.from(title, {
          scrollTrigger: {
            trigger: title,
            start: 'top 90%',
          },
          opacity: 0,
          y: 30,
          duration: 0.7,
          ease: 'power3.out'
        });
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  const allocations = [
    { rank: '1st Prize', pct: '40%', color: '#f59e0b', icon: '🥇', bar: 40, desc: 'Top winner takes the biggest share' },
    { rank: '2nd Prize', pct: '20%', color: '#8b5cf6', icon: '🥈', bar: 20, desc: 'Second place wins big too' },
    { rank: '3rd Prize', pct: '15%', color: '#ec4899', icon: '🥉', bar: 15, desc: 'Third place rewarded generously' },
    { rank: '4th Prize', pct: '10%', color: '#10b981', icon: '🎖️', bar: 10, desc: 'Fourth place still wins great prizes' },
    { rank: 'Next Prize Pool / Royalty', pct: '5%', color: '#06b6d4', icon: '♻️', bar: 5, desc: 'Grows the next jackpot or royalty' },
    { rank: 'Admin / Platform', pct: '10%', color: '#6366f1', icon: '⚙️', bar: 10, desc: 'Platform operations & maintenance' },
  ];

  const pools = [
    { label: '$300 Pool',    values: ['$120',    '$60',     '$45',    '$30',    '$15',    '$30']    },
    { label: '$2,000 Pool',  values: ['$800',    '$400',    '$300',   '$200',   '$100',   '$200']   },
    { label: '$25,000 Pool', values: ['$10,000', '$5,000',  '$3,750', '$2,500', '$1,250', '$2,500'] },
    { label: '$50,000 Pool', values: ['$20,000', '$10,000', '$7,500', '$5,000', '$2,500', '$5,000'] },
  ];

  const packages = [
    { name: 'Daily',   price: '$1',  min: '300',   freq: 'Every Day',   icon: '🎯', color: '#667eea' },
    { name: 'Weekly',  price: '$3',  min: '1,000', freq: 'Every Week',  icon: '🏆', color: '#f093fb' },
    { name: 'Monthly', price: '$12', min: '2,000', freq: 'Every Month', icon: '💰', color: '#ffa751' },
    { name: 'Mega',    price: '$25', min: '2,500', freq: 'Every Month', icon: '🎰', color: '#4facfe' },
  ];

  return (
    <div className="prize-page" ref={pageRef}>

      {/* Hero */}
      <div className="prize-page-hero">
        <div className="prize-hero-bg"></div>
        <div className="prize-hero-content">
          <div className="prize-hero-badge">💰 PRIZE DISTRIBUTION</div>
          <h1 className="prize-hero-title">
            100% Fair <span className="prize-hero-highlight">Distribution</span>
          </h1>
          <p className="prize-hero-sub">
            Same Opportunity &bull; Bigger Rewards &bull; Fully Transparent
          </p>
        </div>
      </div>

      <div className="prize-page-body">

        {/* Package Pool Sizes */}
        <div className="prize-packages-row">
          <h2 className="prize-section-title">Draw Pools by Package</h2>
          <div className="prize-pkg-grid">
            {packages.map((p, i) => (
              <div className="prize-pkg-card" key={i} style={{ '--pkg-color': p.color }}>
                <div className="prize-pkg-icon">{p.icon}</div>
                <div className="prize-pkg-name">{p.name}</div>
                <div className="prize-pkg-price" style={{ color: p.color }}>{p.price}</div>
                <div className="prize-pkg-min">Min {p.min} tickets</div>
                <div className="prize-pkg-freq">{p.freq}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Allocation Cards */}
        <div className="prize-alloc-section">
          <h2 className="prize-section-title">Prize Allocation — 100% Distribution</h2>
          <p className="prize-section-sub">Fair Play • Transparent • Bigger Rewards</p>
          <div className="prize-alloc-grid">
            {allocations.map((item, i) => (
              <div className="prize-alloc-card" key={i} style={{ '--card-color': item.color }}>
                <div className="prize-alloc-top">
                  <span className="prize-alloc-icon">{item.icon}</span>
                  <span className="prize-alloc-pct" style={{ color: item.color }}>{item.pct}</span>
                </div>
                <div className="prize-alloc-rank">{item.rank}</div>
                <div className="prize-alloc-desc">{item.desc}</div>
                <div className="prize-alloc-bar-bg">
                  <div className="prize-alloc-bar-fill" style={{ width: `${item.bar}%`, background: item.color }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prize Table */}
        <div className="prize-table-section">
          <h2 className="prize-section-title">Prize Distribution Examples</h2>
          <p className="prize-section-sub">Exact prize amounts across different pool sizes</p>
          <div className="prize-table-card">
            <div className="prize-table-scroll">
              <table className="prize-table">
                <thead>
                  <tr>
                    <th>Position</th>
                    <th>%</th>
                    {pools.map((p, i) => <th key={i}>{p.label}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {allocations.map((item, i) => (
                    <tr key={i} className={i === 0 ? 'row-gold' : ''}>
                      <td><span className="td-icon">{item.icon}</span>{item.rank}</td>
                      <td><span className="td-pct" style={{ color: item.color }}>{item.pct}</span></td>
                      {pools.map((p, j) => (
                        <td key={j} className={i === 0 ? 'td-bold-gold' : ''}>{p.values[i]}</td>
                      ))}
                    </tr>
                  ))}
                  <tr className="row-total">
                    <td><strong>Total</strong></td>
                    <td><strong>100%</strong></td>
                    <td><strong>$300</strong></td>
                    <td><strong>$2,000</strong></td>
                    <td><strong>$25,000</strong></td>
                    <td><strong>$50,000</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Flexible 5% */}
        <div className="prize-flex-section">
          <h2 className="prize-section-title">⚡ Flexible 5% Allocation</h2>
          <div className="prize-flex-cards">
            <div className="prize-flex-card">
              <div className="prize-flex-card-label">Option 1</div>
              <div className="prize-flex-row">
                <span className="prize-flex-val">2.5%</span>
                <span className="prize-flex-arrow">→</span>
                <span className="prize-flex-target">Next Prize Pool</span>
              </div>
              <div className="prize-flex-row">
                <span className="prize-flex-val">2.5%</span>
                <span className="prize-flex-arrow">→</span>
                <span className="prize-flex-target">Royalty</span>
              </div>
            </div>
            <div className="prize-flex-or">OR</div>
            <div className="prize-flex-card">
              <div className="prize-flex-card-label">Option 2</div>
              <div className="prize-flex-row">
                <span className="prize-flex-val">5%</span>
                <span className="prize-flex-arrow">→</span>
                <span className="prize-flex-target">Royalty</span>
              </div>
            </div>
          </div>
        </div>

        {/* No Winner Rule */}
        <div className="prize-nowinner-section">
          <h2 className="prize-section-title">🚫 No Winner Rule</h2>
          <p className="prize-section-sub">If there is no winner for 2nd or 3rd prize, the amount is split:</p>
          <div className="prize-nowinner-grid">
            <div className="prize-nowinner-card" style={{ borderColor: '#f59e0b' }}>
              <div className="prize-nowinner-pct" style={{ color: '#f59e0b' }}>50%</div>
              <div className="prize-nowinner-label">Admin</div>
            </div>
            <div className="prize-nowinner-card" style={{ borderColor: '#8b5cf6' }}>
              <div className="prize-nowinner-pct" style={{ color: '#8b5cf6' }}>50%</div>
              <div className="prize-nowinner-label">Royalty Program</div>
              <div className="prize-nowinner-sub">25% Admin Fixed + 25% Royalty Directors</div>
            </div>
          </div>
          <p className="prize-nowinner-note">Payout Period: Every 100 days or once in 3 months</p>
        </div>

        {/* Withdrawal */}
        <div className="prize-withdrawal-section">
          <div className="prize-withdrawal-card">
            <div className="prize-withdrawal-icon">💸</div>
            <div className="prize-withdrawal-title">Withdrawal Fee</div>
            <div className="prize-withdrawal-pct">10%</div>
            <div className="prize-withdrawal-desc">Applicable on all withdrawals</div>
          </div>
        </div>

        {/* CTA */}
        <div className="prize-cta-row">
          <Link to="/register" className="prize-cta-btn">Get Started — Play Now →</Link>
        </div>

      </div>
    </div>
  );
};

export default Prize;
