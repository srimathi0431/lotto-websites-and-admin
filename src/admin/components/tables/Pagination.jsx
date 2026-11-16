// ===================================
// PAGINATION COMPONENT
// ===================================

import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  pageSize,
  onPageSizeChange,
  totalItems
}) => {
  const pages = [];
  const maxVisiblePages = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem',
      borderTop: '1px solid var(--border-light)',
      backgroundColor: 'var(--bg-content)',
      flexWrap: 'wrap',
      gap: '1rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
        <span style={{ color: 'var(--text-secondary)' }}>Rows per page:</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          style={{
            padding: '0.375rem 0.75rem',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.875rem',
            cursor: 'pointer',
            width: 'auto'
          }}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <span style={{ color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>
          Showing {startItem} to {endItem} of {totalItems}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-secondary btn-icon"
          style={{ padding: '0.5rem' }}
        >
          <ChevronLeft size={18} />
        </button>

        {startPage > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="btn btn-secondary btn-icon"
              style={{ padding: '0.5rem', minWidth: '36px' }}
            >
              1
            </button>
            {startPage > 2 && (
              <span style={{ color: 'var(--text-muted)' }}>...</span>
            )}
          </>
        )}

        {pages.map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`btn btn-icon ${page === currentPage ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.5rem', minWidth: '36px' }}
          >
            {page}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span style={{ color: 'var(--text-muted)' }}>...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="btn btn-secondary btn-icon"
              style={{ padding: '0.5rem', minWidth: '36px' }}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn btn-secondary btn-icon"
          style={{ padding: '0.5rem' }}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
