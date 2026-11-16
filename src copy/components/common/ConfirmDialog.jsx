// ===================================
// CONFIRM DIALOG COMPONENT
// ===================================

import { AlertTriangle } from 'lucide-react';
import Modal from './Modal';

const ConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger' // 'danger', 'warning', 'info'
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const getButtonClass = () => {
    switch (type) {
      case 'danger':
        return 'btn-danger';
      case 'warning':
        return 'btn-warning';
      case 'info':
        return 'btn-primary';
      default:
        return 'btn-danger';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div style={{ textAlign: 'center', padding: '1rem 0' }}>
        <div
          style={{
            width: '64px',
            height: '64px',
            margin: '0 auto 1rem',
            borderRadius: '50%',
            backgroundColor: type === 'danger' ? '#FEE2E2' : '#FEF3C7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: type === 'danger' ? 'var(--color-red)' : 'var(--color-orange)'
          }}
        >
          <AlertTriangle size={32} />
        </div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          {message}
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <button className="btn btn-secondary" onClick={onClose}>
            {cancelText}
          </button>
          <button className={`btn ${getButtonClass()}`} onClick={handleConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
