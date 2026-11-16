// ===================================
// TRANSACTION HISTORY PAGE
// Complete transaction log with filters
// ===================================

import { useState, useEffect } from 'react';
import { Download, Eye, Receipt, TrendingUp, TrendingDown } from 'lucide-react';
import {
  PageHeader,
  StatCard,
  SearchBar,
  FilterBar,
  FilterSelect,
  FilterInput,
  DataTable,
  Pagination,
  Modal,
  StatusBadge
} from '../../../admin/components';
import { getTransactions } from '../../../admin/utils/storage';
import { demoTransactions } from '../../../admin/data/demoData';
import {
  formatCurrency,
  formatDateTime,
  exportToCSV,
  filterBySearch,
  sortData,
  paginateData,
  getTotalPages
} from '../../../admin/utils/helpers';
import { useToast } from '../../../admin/hooks/useToast';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortColumn, setSortColumn] = useState('dateTime');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  
  const { success } = useToast();

  useEffect(() => {
    loadTransactions();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [transactions, searchQuery, typeFilter, statusFilter, sortColumn, sortDirection]);

  const loadTransactions = () => {
    const loaded = getTransactions(demoTransactions);
    setTransactions(loaded);
  };

  const applyFilters = () => {
    let filtered = [...transactions];

    if (searchQuery) {
      filtered = filterBySearch(filtered, searchQuery, ['id', 'userId', 'userName', 'remarks']);
    }

    if (typeFilter) {
      filtered = filtered.filter(t => t.type === typeFilter);
    }

    if (statusFilter) {
      filtered = filtered.filter(t => t.status === statusFilter);
    }

    if (sortColumn) {
      filtered = sortData(filtered, sortColumn, sortDirection);
    }

    setFilteredTransactions(filtered);
    setCurrentPage(1);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleExportCSV = () => {
    const exportData = filteredTransactions.map(txn => ({
      'Transaction ID': txn.id,
      'User ID': txn.userId,
      'User Name': txn.userName,
      'Type': txn.type,
      'Credit': txn.credit,
      'Debit': txn.debit,
      'Previous Balance': txn.previousBalance,
      'New Balance': txn.newBalance,
      'Date Time': txn.dateTime,
      'Status': txn.status,
      'Remarks': txn.remarks
    }));
    exportToCSV(exportData, 'transactions_export.csv');
    success('Data exported successfully!');
  };

  const clearFilters = () => {
    setSearchQuery('');
    setTypeFilter('');
    setStatusFilter('');
  };

  const stats = {
    total: transactions.length,
    credits: transactions.reduce((sum, t) => sum + t.credit, 0),
    debits: transactions.reduce((sum, t) => sum + t.debit, 0),
    completed: transactions.filter(t => t.status === 'completed').length
  };

  const paginatedTransactions = paginateData(filteredTransactions, currentPage, pageSize);
  const totalPages = getTotalPages(filteredTransactions.length, pageSize);

  const columns = [
    { key: 'id', label: 'Transaction ID', sortable: true, render: (value) => (
      <span style={{ fontWeight: 500, color: 'var(--color-primary)' }}>{value}</span>
    )},
    { key: 'userId', label: 'User ID', sortable: true },
    { key: 'userName', label: 'User Name', sortable: true, render: (value) => (
      <span style={{ fontWeight: 500 }}>{value}</span>
    )},
    { key: 'type', label: 'Type', sortable: true, render: (value) => (
      <span style={{ textTransform: 'capitalize' }}>{value.replace('_', ' ')}</span>
    )},
    { key: 'credit', label: 'Credit', sortable: true, render: (value) => (
      value > 0 ? <span style={{ fontWeight: 600, color: 'var(--color-emerald)' }}>+{formatCurrency(value)}</span> : '-'
    )},
    { key: 'debit', label: 'Debit', sortable: true, render: (value) => (
      value > 0 ? <span style={{ fontWeight: 600, color: 'var(--color-red)' }}>-{formatCurrency(value)}</span> : '-'
    )},
    { key: 'newBalance', label: 'New Balance', sortable: true, render: (value) => (
      <span style={{ fontWeight: 600 }}>{formatCurrency(value)}</span>
    )},
    { key: 'dateTime', label: 'Date & Time', sortable: true, render: (value) => (
      <span style={{ fontSize: '0.8125rem' }}>{formatDateTime(value)}</span>
    )},
    { key: 'status', label: 'Status', sortable: true, render: (value) => <StatusBadge status={value} />},
    { key: 'actions', label: 'Actions', sortable: false, render: (value, row) => (
      <button className="btn btn-secondary btn-sm" onClick={() => { setSelectedTransaction(row); setShowViewModal(true); }}>
        <Eye size={16} />
      </button>
    )}
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Transaction History"
        subtitle="Complete log of all financial transactions"
        actions={
          <button className="btn btn-purple" onClick={handleExportCSV}>
            <Download size={18} />
            Export CSV
          </button>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xl)' }}>
        <StatCard icon={Receipt} title="Total Transactions" value={stats.total} iconColor="var(--color-primary)" iconBg="#EEF2FF" />
        <StatCard icon={TrendingUp} title="Total Credits" value={formatCurrency(stats.credits)} iconColor="var(--color-emerald)" iconBg="#D1FAE5" />
        <StatCard icon={TrendingDown} title="Total Debits" value={formatCurrency(stats.debits)} iconColor="var(--color-red)" iconBg="#FEE2E2" />
        <StatCard icon={Receipt} title="Completed" value={stats.completed} iconColor="var(--color-cyan)" iconBg="#CFFAFE" />
      </div>

      <div style={{ marginBottom: 'var(--spacing-lg)' }}>
        <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search by transaction ID, user ID, name, or remarks..." />
      </div>

      <FilterBar onClear={clearFilters} showClear={searchQuery || typeFilter || statusFilter}>
        <FilterSelect label="Transaction Type" value={typeFilter} onChange={setTypeFilter} options={[
          { value: 'deposit', label: 'Deposit' },
          { value: 'withdrawal', label: 'Withdrawal' },
          { value: 'balance_credit', label: 'Balance Credit' },
          { value: 'balance_debit', label: 'Balance Debit' }
        ]} placeholder="All Types" />
        <FilterSelect label="Status" value={statusFilter} onChange={setStatusFilter} options={[
          { value: 'completed', label: 'Completed' },
          { value: 'pending', label: 'Pending' },
          { value: 'failed', label: 'Failed' }
        ]} placeholder="All Status" />
      </FilterBar>

      <DataTable columns={columns} data={paginatedTransactions} onSort={handleSort} sortColumn={sortColumn} sortDirection={sortDirection} emptyMessage="No transactions found" />

      {filteredTransactions.length > 0 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} pageSize={pageSize} onPageSizeChange={setPageSize} totalItems={filteredTransactions.length} />
      )}

      <Modal isOpen={showViewModal} onClose={() => setShowViewModal(false)} title="Transaction Details" size="md">
        {selectedTransaction && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-hover)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Transaction Amount</p>
              <p style={{ fontSize: '2rem', fontWeight: 700, color: selectedTransaction.credit > 0 ? 'var(--color-emerald)' : 'var(--color-red)' }}>
                {selectedTransaction.credit > 0 ? `+${formatCurrency(selectedTransaction.credit)}` : `-${formatCurrency(selectedTransaction.debit)}`}
              </p>
              <StatusBadge status={selectedTransaction.status} />
            </div>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {Object.entries({
                'Transaction ID': selectedTransaction.id,
                'User ID': selectedTransaction.userId,
                'User Name': selectedTransaction.userName,
                'Type': selectedTransaction.type.replace('_', ' '),
                'Previous Balance': formatCurrency(selectedTransaction.previousBalance),
                'New Balance': formatCurrency(selectedTransaction.newBalance),
                'Date & Time': formatDateTime(selectedTransaction.dateTime),
                'Remarks': selectedTransaction.remarks
              }).map(([key, value]) => (
                <div key={key}>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>{key}</p>
                  <p style={{ fontWeight: 600 }}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Transactions;
