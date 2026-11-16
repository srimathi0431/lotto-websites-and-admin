// ===================================
// ACTIVITY LOGS PAGE
// Track all admin actions and system events
// ===================================

import { useState, useEffect } from 'react';
import { Activity, Download } from 'lucide-react';
import { PageHeader, StatCard, SearchBar, FilterSelect, DataTable, Pagination, StatusBadge } from '../../../admin/components';
import { getActivityLogs } from '../../../admin/utils/storage';
import { demoActivityLogs } from '../../../admin/data/demoData';
import { formatDateTime, exportToCSV, filterBySearch, sortData, paginateData, getTotalPages } from '../../../admin/utils/helpers';
import { useToast } from '../../../admin/hooks/useToast';

const ActivityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState('');
  const [sortColumn, setSortColumn] = useState('dateTime');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { success } = useToast();

  useEffect(() => {
    const loaded = getActivityLogs(demoActivityLogs);
    setLogs(loaded);
  }, []);

  useEffect(() => {
    let filtered = [...logs];
    if (searchQuery) filtered = filterBySearch(filtered, searchQuery, ['id', 'adminName', 'action', 'target', 'description']);
    if (actionFilter) filtered = filtered.filter(l => l.action.includes(actionFilter));
    if (sortColumn) filtered = sortData(filtered, sortColumn, sortDirection);
    setFilteredLogs(filtered);
    setCurrentPage(1);
  }, [logs, searchQuery, actionFilter, sortColumn, sortDirection]);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleExport = () => {
    const exportData = filteredLogs.map(log => ({
      'Activity ID': log.id,
      'Admin Name': log.adminName,
      'Action': log.action,
      'Target': log.target,
      'Description': log.description,
      'Date Time': log.dateTime,
      'Status': log.status
    }));
    exportToCSV(exportData, 'activity_logs_export.csv');
    success('Activity logs exported successfully!');
  };

  const paginatedLogs = paginateData(filteredLogs, currentPage, pageSize);
  const totalPages = getTotalPages(filteredLogs.length, pageSize);

  const columns = [
    { key: 'id', label: 'Activity ID', sortable: true },
    { key: 'adminName', label: 'Admin Name', sortable: true, render: (value) => <span style={{ fontWeight: 500 }}>{value}</span> },
    { key: 'action', label: 'Action', sortable: true, render: (value) => <span style={{ fontWeight: 500, color: 'var(--color-primary)' }}>{value}</span> },
    { key: 'target', label: 'Target', sortable: true },
    { key: 'description', label: 'Description', sortable: false },
    { key: 'dateTime', label: 'Date & Time', sortable: true, render: (value) => <span style={{ fontSize: '0.8125rem' }}>{formatDateTime(value)}</span> },
    { key: 'status', label: 'Status', sortable: true, render: (value) => <StatusBadge status={value} />}
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Activity Logs"
        subtitle="Track all administrative actions and system events"
        actions={
          <button className="btn btn-purple" onClick={handleExport}>
            <Download size={18} />
            Export Logs
          </button>
        }
      />

      <div style={{ marginBottom: 'var(--spacing-xl)' }}>
        <StatCard icon={Activity} title="Total Activities" value={logs.length} iconColor="var(--color-cyan)" iconBg="#CFFAFE" />
      </div>

      <div className="card" style={{ padding: 'var(--spacing-lg)', marginBottom: 'var(--spacing-lg)', backgroundColor: '#FEF3C7', border: '1px solid #FCD34D' }}>
        <p style={{ fontSize: '0.875rem', color: '#78350F', margin: 0 }}>
          <strong>Demo Note:</strong> Activity logs stored in browser localStorage are not tamper-proof. 
          Production systems require server-side audit logging with integrity protection.
        </p>
      </div>

      <div style={{ marginBottom: 'var(--spacing-lg)' }}>
        <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search activity logs..." />
      </div>

      <div style={{ marginBottom: 'var(--spacing-lg)' }}>
        <FilterSelect label="Action Type" value={actionFilter} onChange={setActionFilter} options={[
          { value: 'Approved', label: 'Approvals' },
          { value: 'Rejected', label: 'Rejections' },
          { value: 'Added', label: 'Additions' },
          { value: 'Updated', label: 'Updates' },
          { value: 'Deleted', label: 'Deletions' }
        ]} placeholder="All Actions" />
      </div>

      <DataTable columns={columns} data={paginatedLogs} onSort={handleSort} sortColumn={sortColumn} sortDirection={sortDirection} emptyMessage="No activity logs found" />

      {filteredLogs.length > 0 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} pageSize={pageSize} onPageSizeChange={setPageSize} totalItems={filteredLogs.length} />
      )}
    </div>
  );
};

export default ActivityLogs;
