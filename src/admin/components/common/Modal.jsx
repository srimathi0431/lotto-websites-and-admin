// ===================================
// MODAL COMPONENT
// ===================================

import { X } from 'lucide-react';
import { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getMaxWidth = () => {
    switch (size) {
      case 'sm':
        return '400px';
      case 'lg':
        return '800px';
      case 'xl':
        return '1000px';
      case 'md':
      default:
        return '500px';
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: getMaxWidth() }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.25rem',
            borderBottom: '1px solid var(--border-light)'
          }}
        >
          <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600 }}>
            {title}
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.25rem',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
          >
            <X size={20} />
          </button>
        </div>
        <div style={{ padding: '1.25rem' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
