import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './PrizeDistribution.css';

gsap.registerPlugin(ScrollTrigger);

const PrizeDistribution = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.prize-header', {
        scrollTrigger: { trigger: '.prize-header', start: 'top 80%' },
        opacity: 0, y: 40, duration: 0.8, ease: 'power3.out'
      });
      gsap.from('.prize-allocation-card', {
        scrollTrigger: { trigger: '.prize-allocation-card', start: 'top 80%' },
        opacity: 0, y: 50, duration: 0.8, stagger: 0.1, ease: 'back.out(1.2)'
      });
      gsap.from('.prize-table-wrap', {
        scrollTrigger: { trigger: '.prize-table-wrap', start: 'top 80%' },
        opacity: 0, y: 40, duration: 0.9, ease: 'power3.out'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const allocations = [
    { rank: '1st Prize', pct: '40%', color: '#f59e0b', icon: '🥇', bar: 40 },
    { rank: '2nd Prize', pct: '20%', color: '#8b5cf6', icon: '🥈', bar: 20 },
    { rank: '3rd Prize', pct: '15%', color: '#ec4899', icon: '🥉', bar: 15 },
    { rank: '4th Prize', pct: '10%', color: '#10b981', icon: '🎖️', bar: 10 },
    { rank: 'Next Prize Pool / Royalty', pct: '5%', color: '#06b6d4', icon: '♻️', bar: 5 },
    { rank: 'Admin / Platform', pct: '10%', color: '#6366f1', icon: '⚙️', bar: 10 },
  ];

  const pools = [
    { label: '$300 Pool', values: ['$120', '$60', '$45', '$30', '$15', '$30'] },
    { label: '$2,000 Pool', values: ['$800', '$400', '$300', '$200', '$100', '$200'] },
    { label: '$25,000 Pool', values: ['$10,000', '$5,000', '$3,750', '$2,500', '$1,250', '$2,500'] },
    { label: '$50,000 Pool', values: ['$20,000', '$10,000', '$7,500', '$5,000', '$2,500', '$5,000'] },
  ];

  return (
    <section ref={sectionRef} className="prize-section" id="prize">
      <div className="prize-container">

        {/* Header */}
        <div className="prize-header">
          <div className="prize-badge">
            <span>💰 PRIZE DISTRIBUTION</span>
          </div>
          <h2 className="prize-heading">
            100% <span className="prize-gradient-text">Fair Distribution</span>
          </h2>
          <p className="prize-subheading">
            Same Opportunity • Bigger Rewards • Fully Transparent
          </p>
        </div>

        {/* Allocation Cards */}
        <div className="prize-allocation-grid">
          {allocations.map((item, i) => (
            <div className="prize-allocation-card" key={i} style={{ '--card-color': item.color }}>
              <div className="prize-alloc-icon">{item.icon}</div>
              <div className="prize-alloc-rank">{item.rank}</div>
              <div className="prize-alloc-pct" style={{ color: item.color }}>{item.pct}</div>
              <div className="prize-alloc-bar-bg">
                <div
                  className="prize-alloc-bar-fill"
                  style={{ width: `${item.bar}%`, background: item.color }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Distribution Table */}
        <div className="prize-table-wrap">
          <h3 className="prize-table-title">Prize Distribution Examples</h3>
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
                  <tr key={i} className={i === 0 ? 'row-highlight' : ''}>
                    <td>
                      <span className="td-icon">{item.icon}</span> {item.rank}
                    </td>
                    <td>
                      <span className="td-pct" style={{ color: item.color }}>{item.pct}</span>
                    </td>
                    {pools.map((p, j) => (
                      <td key={j} className={i === 0 ? 'td-gold' : ''}>{p.values[i]}</td>
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

        {/* Flexible 5% Note */}
        <div className="prize-flex-note">
          <div className="prize-flex-title">⚡ Flexible 5% Allocation</div>
          <div className="prize-flex-options">
            <div className="prize-flex-option">
              <div className="prize-flex-option-label">Option 1</div>
              <div className="prize-flex-option-detail">2.5% → Next Prize Pool</div>
              <div className="prize-flex-option-detail">2.5% → Royalty</div>
            </div>
            <div className="prize-flex-or">OR</div>
            <div className="prize-flex-option">
              <div className="prize-flex-option-label">Option 2</div>
              <div className="prize-flex-option-detail">5% → Royalty</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PrizeDistribution;
