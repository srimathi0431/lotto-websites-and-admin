// ===================================
// PAGE HEADER COMPONENT
// ===================================

const PageHeader = ({ title, subtitle, actions = null }) => {
  return (
    <div className="page-header" style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      gap: '1rem',
      marginBottom: 'var(--spacing-xl)'
    }}>
      <div>
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
      {actions && (
        <div className="page-actions">
          {actions}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
