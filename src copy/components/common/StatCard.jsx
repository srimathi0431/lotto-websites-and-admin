// ===================================
// STATISTIC CARD COMPONENT
// ===================================

import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ 
  icon: Icon, 
  title, 
  value, 
  change = null,
  iconColor = 'var(--color-primary)',
  iconBg = '#EEF2FF'
}) => {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <div className="card" style={{ height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ flex: 1 }}>
          <p style={{ 
            fontSize: '0.875rem', 
            color: 'var(--text-secondary)', 
            marginBottom: '0.5rem',
            fontWeight: 500
          }}>
            {title}
          </p>
          <h3 style={{ 
            fontSize: '1.875rem', 
            fontWeight: 700, 
            color: 'var(--text-primary)',
            marginBottom: '0.25rem'
          }}>
            {value}
          </h3>
          {change !== null && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.25rem',
              fontSize: '0.75rem',
              color: isPositive ? 'var(--status-success)' : isNegative ? 'var(--status-error)' : 'var(--text-muted)'
            }}>
              {isPositive && <TrendingUp size={14} />}
              {isNegative && <TrendingDown size={14} />}
              <span>{Math.abs(change)}% from last month</span>
            </div>
          )}
        </div>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: iconBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: iconColor,
          flexShrink: 0
        }}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
