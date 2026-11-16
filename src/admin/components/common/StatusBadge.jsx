// ===================================
// STATUS BADGE COMPONENT
// ===================================

import { getStatusBadgeClass } from '../../utils/helpers';

const StatusBadge = ({ status, text = null }) => {
  const badgeClass = getStatusBadgeClass(status);
  const displayText = text || status;

  return (
    <span className={`badge ${badgeClass}`}>
      {displayText}
    </span>
  );
};

export default StatusBadge;
