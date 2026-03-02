import React, { useState } from 'react';

const DataTable = ({ 
  columns, 
  data, 
  onEdit, 
  onDelete, 
  onView,
  emptyMessage = 'No data found',
  showActions = true
}) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSort = (column) => {
    if (!column.sortable) return;
    
    if (sortColumn === column.key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column.key);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0;
    
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const renderCell = (row, column) => {
    if (column.render) {
      return column.render(row[column.key], row);
    }
    return row[column.key];
  };

  if (data.length === 0) {
    return (
      <div className="card">
        <div className="empty-state">
          <div className="empty-state-icon">📭</div>
          <h3 className="empty-state-title">{emptyMessage}</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th 
                key={column.key}
                className={column.sortable ? 'sortable' : ''}
                onClick={() => handleSort(column)}
                style={{ width: column.width }}
              >
                {column.header}
                {sortColumn === column.key && (
                  <span style={{ marginLeft: '4px' }}>
                    {sortDirection === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
            ))}
            {showActions && (
              <th style={{ width: '150px' }}>Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr key={row.id || rowIndex}>
              {columns.map((column) => (
                <td key={column.key}>
                  {renderCell(row, column)}
                </td>
              ))}
              {showActions && (
                <td>
                  <div className="table-actions-cell">
                    {onView && (
                      <button 
                        className="btn btn-ghost btn-sm btn-icon" 
                        onClick={() => onView(row)}
                        title="View"
                      >
                        👁️
                      </button>
                    )}
                    {onEdit && (
                      <button 
                        className="btn btn-ghost btn-sm btn-icon" 
                        onClick={() => onEdit(row)}
                        title="Edit"
                      >
                        ✏️
                      </button>
                    )}
                    {onDelete && (
                      <button 
                        className="btn btn-ghost btn-sm btn-icon" 
                        onClick={() => onDelete(row)}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      
      {totalPages > 1 && (
        <div className="pagination">
          <div className="pagination-info">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, data.length)} of {data.length} entries
          </div>
          <div className="pagination-buttons">
            <button 
              className="pagination-btn"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              ««
            </button>
            <button 
              className="pagination-btn"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              «
            </button>
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              if (
                page === 1 || 
                page === totalPages || 
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                );
              }
              if (page === currentPage - 2 || page === currentPage + 2) {
                return <span key={page}>...</span>;
              }
              return null;
            })}
            <button 
              className="pagination-btn"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              »
            </button>
            <button 
              className="pagination-btn"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              »»
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
