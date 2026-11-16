// ===================================
// FILTER BAR COMPONENT
// ===================================

import { Filter, X } from 'lucide-react';

const FilterBar = ({ children, onClear = null, showClear = false }) => {
  return (
    <div className="card" style={{ marginBottom: 'var(--spacing-lg)' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 'var(--spacing-md)',
        flexWrap: 'wrap'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          color: 'var(--text-secondary)',
          fontSize: '0.875rem',
          fontWeight: 500
        }}>
          <Filter size={18} />
          <span>Filters</span>
        </div>
        
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          gap: 'var(--spacing-md)',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          {children}
        </div>

        {showClear && onClear && (
          <button 
            className="btn btn-secondary btn-sm"
            onClick={onClear}
          >
            <X size={16} />
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};

export const FilterSelect = ({ 
  label, 
  value, 
  onChange, 
  options, 
  placeholder = 'Select...' 
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', minWidth: '150px' }}>
      {label && (
        <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: '100%' }}
      >
        <option value="">{placeholder}</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export const FilterInput = ({ 
  label, 
  type = 'text',
  value, 
  onChange, 
  placeholder = '' 
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', minWidth: '150px' }}>
      {label && (
        <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default FilterBar;
