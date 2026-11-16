// ===================================
// EMPTY STATE COMPONENT
// ===================================

import { Inbox } from 'lucide-react';

const EmptyState = ({ 
  icon: Icon = Inbox, 
  title = 'No data found',
  description = 'There are no items to display at the moment.',
  action = null
}) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <Icon size={64} />
      </div>
      <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyState;
