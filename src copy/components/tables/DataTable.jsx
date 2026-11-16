// ===================================
// DATA TABLE COMPONENT
// ===================================

import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import EmptyState from '../common/EmptyState';
import LoadingSpinner from '../common/LoadingSpinner';

const DataTable = ({ 
  columns, 
  data, 
  isLoading = false,
  onSort = null,
  sortColumn = null,
  sortDirection = 'asc',
  emptyMessage = 'No data available',
  selectable = false,
  selectedRows = [],
  onSelectRow = null,
  onSelectAll = null
}) => {
  const handleSort = (column) => {
    if (!column.sortable || !onSort) return;
    onSort(column.key);
  };

  const getSortIcon = (column) => {
    if (!column.sortable) return null;
    
    if (sortColumn !== column.key) {
      return <ArrowUpDown size={14} style={{ opacity: 0.5 }} />;
    }
    
    return sortDirection === 'asc' 
      ? <ArrowUp size={14} /> 
      : <ArrowDown size={14} />;
  };

  const allSelected = data.length > 0 && selectedRows.length === data.length;
  const someSelected = selectedRows.length > 0 && selectedRows.length < data.length;

  if (isLoading) {
    return (
      <div className="table-container">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          padding: '3rem'
        }}>
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="table-container">
        <EmptyState title={emptyMessage} description="Try adjusting your filters or search criteria." />
      </div>
    );
  }

  return (
    <div className="table-container">
      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              {selectable && (
                <th style={{ width: '50px' }}>
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={input => {
                      if (input) input.indeterminate = someSelected;
                    }}
                    onChange={(e) => onSelectAll && onSelectAll(e.target.checked)}
                    style={{ cursor: 'pointer' }}
                  />
                </th>
              )}
              {columns.map(column => (
                <th 
                  key={column.key}
                  style={{ 
                    cursor: column.sortable ? 'pointer' : 'default',
                    userSelect: 'none',
                    width: column.width || 'auto'
                  }}
                  onClick={() => handleSort(column)}
                >
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem' 
                  }}>
                    <span>{column.label}</span>
                    {getSortIcon(column)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {selectable && (
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.id || rowIndex)}
                      onChange={(e) => onSelectRow && onSelectRow(row.id || rowIndex, e.target.checked)}
                      style={{ cursor: 'pointer' }}
                    />
                  </td>
                )}
                {columns.map(column => (
                  <td key={column.key}>
                    {column.render 
                      ? column.render(row[column.key], row)
                      : row[column.key]
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
