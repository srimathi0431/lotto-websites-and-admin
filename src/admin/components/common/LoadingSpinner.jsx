// ===================================
// LOADING SPINNER COMPONENT
// ===================================

const LoadingSpinner = ({ size = 24, color = 'var(--color-primary)' }) => {
  return (
    <div
      className="spinner"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderTopColor: color
      }}
    />
  );
};

export const LoadingOverlay = ({ message = 'Loading...' }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        gap: '1rem'
      }}
    >
      <LoadingSpinner size={48} />
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
        {message}
      </p>
    </div>
  );
};

export default LoadingSpinner;
