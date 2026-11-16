// ===================================
// SEARCH BAR COMPONENT
// ===================================

import { Search } from 'lucide-react';

const SearchBar = ({ 
  value, 
  onChange, 
  placeholder = 'Search...', 
  className = '' 
}) => {
  return (
    <div style={{ position: 'relative', width: '100%' }} className={className}>
      <Search 
        size={18} 
        style={{
          position: 'absolute',
          left: '0.875rem',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--text-muted)'
        }}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          paddingLeft: '2.5rem',
          width: '100%'
        }}
      />
    </div>
  );
};

export default SearchBar;
