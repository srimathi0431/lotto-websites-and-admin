// ===================================
// TOAST NOTIFICATION COMPONENT
// ===================================

import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

const Toast = ({ toast, onClose }) => {
  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle size={20} />;
      case 'error':
        return <XCircle size={20} />;
      case 'warning':
        return <AlertTriangle size={20} />;
      case 'info':
      default:
        return <Info size={20} />;
    }
  };

  const getIconColor = () => {
    switch (toast.type) {
      case 'success':
        return 'var(--status-success)';
      case 'error':
        return 'var(--status-error)';
      case 'warning':
        return 'var(--status-warning)';
      case 'info':
      default:
        return 'var(--status-info)';
    }
  };

  return (
    <div className={`toast toast-${toast.type}`}>
      <div style={{ color: getIconColor() }}>
        {getIcon()}
      </div>
      <div style={{ flex: 1, fontSize: '0.875rem' }}>
        {toast.message}
      </div>
      <button
        onClick={() => onClose(toast.id)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '0.25rem',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <X size={18} />
      </button>
    </div>
  );
};

const ToastContainer = ({ toasts, onClose }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  );
};

export default ToastContainer;
