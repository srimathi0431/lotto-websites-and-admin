// ===================================
// DEPOSIT MANAGEMENT PAGE
// Approve/reject deposits with balance updates
// ===================================

import { useState, useEffect } from 'react';
import {
  Download,
  Eye,
  CheckCircle,
  XCircle,
  ArrowDownToLine,
  Clock,
  CheckCheck,
  XOctagon
} from 'lucide-react';
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
  ConfirmDialog,
  StatusBadge
} from '../../../admin/components';
import {
  getDeposits,
  updateDeposit,
  getUsers,
  updateUser,
  addTransaction,
  addActivityLog,
  addNotification
} from '../../../admin/utils/storage';
import { demoDeposits, demoUsers, demoTransactions, demoActivityLogs, demoNotifications } from '../../../admin/data/demoData';
import {
  formatCurrency,
  formatDateTime,
  exportToCSV,
  filterBySearch,
  sortData,
  paginateData,
  getTotalPages,
  generateId,
  getCurrentDateTime
} from '../../../admin/utils/helpers';
import { useToast } from '../../../admin/hooks/useToast';

const Deposits = () => {
  const [deposits, setDeposits] = useState([]);
  const [filteredDeposits, setFilteredDeposits] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [sortColumn, setSortColumn] = useState('requestDate');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  const [showViewModal, setShowViewModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showApproveConfirm, setShowApproveConfirm] = useState(false);
  const [selectedDeposit, setSelectedDeposit] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  
  const { success, error: showError } = useToast();

  useEffect(() => {
    loadDeposits();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [deposits, searchQuery, statusFilter, paymentMethodFilter, minAmount, maxAmount, sortColumn, sortDirection]);

  const loadDeposits = () => {
    const loadedDeposits = getDeposits(demoDeposits);
    setDeposits(loadedDeposits);
  };

  const applyFilters = () => {
    let filtered = [...deposits];

    // Search filter
    if (searchQuery) {
      filtered = filterBySearch(filtered, searchQuery, ['id', 'userId', 'userName', 'transactionReference']);
    }

    // Status filter
    if (statusFilter) {
      filtered = filtered.filter(d => d.status === statusFilter);
    }

    // Payment method filter
    if (paymentMethodFilter) {
      filtered = filtered.filter(d => d.paymentMethod === paymentMethodFilter);
    }

    // Amount filters
    if (minAmount) {
      filtered = filtered.filter(d => d.amount >= Number(minAmount));
    }
    if (maxAmount) {
      filtered = filtered.filter(d => d.amount <= Number(maxAmount));
    }

    // Sort
    if (sortColumn) {
      filtered = sortData(filtered, sortColumn, sortDirection);
    }

    setFilteredDeposits(filtered);
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

  const handleApproveDeposit = () => {
    if (!selectedDeposit) return;

    // Check if already approved
    if (selectedDeposit.status === 'approved') {
      showError('This deposit has already been approved');
      setShowApproveConfirm(false);
      return;
    }

    // Update deposit status
    updateDeposit(selectedDeposit.id, {
      status: 'approved',
      processedDate: getCurrentDateTime()
    }, deposits);

    // Credit user balance
    const users = getUsers(demoUsers);
    const user = users.find(u => u.id === selectedDeposit.userId);
    
    if (user) {
      const previousBalance = user.walletBalance;
      const newBalance = previousBalance + selectedDeposit.amount;
      
      updateUser(user.id, { walletBalance: newBalance }, users);

      // Add transaction record
      addTransaction({
        id: generateId('TXN'),
        userId: user.id,
        userName: user.fullName,
        type: 'deposit',
        credit: selectedDeposit.amount,
        debit: 0,
        previousBalance,
        newBalance,
        dateTime: getCurrentDateTime(),
        status: 'completed',
        remarks: `Deposit approved - ${selectedDeposit.id}`
      }, demoTransactions);
    }

    // Add activity log
    addActivityLog({
      id: generateId('ACT'),
      adminName: 'Super Admin',
      action: 'Deposit Approved',
      target: selectedDeposit.id,
      description: `Approved deposit of ${formatCurrency(selectedDeposit.amount)} for ${selectedDeposit.userName}`,
      dateTime: getCurrentDateTime(),
      status: 'success'
    }, demoActivityLogs);

    // Add notification
    addNotification({
      id: generateId('NOT'),
      type: 'deposit',
      title: 'Deposit Approved',
      message: `Deposit of ${formatCurrency(selectedDeposit.amount)} has been approved for ${selectedDeposit.userName}`,
      dateTime: getCurrentDateTime(),
      read: false,
      link: '/deposits'
    }, demoNotifications);

    loadDeposits();
    setShowApproveConfirm(false);
    setSelectedDeposit(null);
    success('Deposit approved successfully!');
  };

  const handleRejectDeposit = () => {
    if (!selectedDeposit) return;

    if (!rejectionReason.trim()) {
      showError('Please enter a rejection reason');
      return;
    }

    // Check if already processed
    if (selectedDeposit.status !== 'pending') {
      showError('Only pending deposits can be rejected');
      setShowRejectModal(false);
      return;
    }

    // Update deposit status
    updateDeposit(selectedDeposit.id, {
      status: 'rejected',
      processedDate: getCurrentDateTime(),
      rejectionReason
    }, deposits);

    // Add activity log
    addActivityLog({
      id: generateId('ACT'),
      adminName: 'Super Admin',
      action: 'Deposit Rejected',
      target: selectedDeposit.id,
      description: `Rejected deposit of ${formatCurrency(selectedDeposit.amount)} for ${selectedDeposit.userName}`,
      dateTime: getCurrentDateTime(),
      status: 'warning'
    }, demoActivityLogs);

    // Add notification
    addNotification({
      id: generateId('NOT'),
      type: 'deposit',
      title: 'Deposit Rejected',
      message: `Deposit of ${formatCurrency(selectedDeposit.amount)} has been rejected for ${selectedDeposit.userName}`,
      dateTime: getCurrentDateTime(),
      read: false,
      link: '/deposits'
    }, demoNotifications);

    loadDeposits();
    setShowRejectModal(false);
    setSelectedDeposit(null);
    setRejectionReason('');
    success('Deposit rejected successfully!');
  };

  const handleExportCSV = () => {
    const exportData = filteredDeposits.map(deposit => ({
      'Transaction ID': deposit.id,
      'User ID': deposit.userId,
      'User Name': deposit.userName,
      'Amount': deposit.amount,
      'Payment Method': deposit.paymentMethod,
      'Transaction Reference': deposit.transactionReference,
      'Request Date': deposit.requestDate,
      'Status': deposit.status,
      'Processed Date': deposit.processedDate || 'N/A',
      'Rejection Reason': deposit.rejectionReason || 'N/A'
    }));

    exportToCSV(exportData, 'deposits_export.csv');
    success('Data exported successfully!');
  };

  const openViewModal = (deposit) => {
    setSelectedDeposit(deposit);
    setShowViewModal(true);
  };

  const openApproveConfirm = (deposit) => {
    setSelectedDeposit(deposit);
    setShowApproveConfirm(true);
  };

  const openRejectModal = (deposit) => {
    setSelectedDeposit(deposit);
    setRejectionReason('');
    setShowRejectModal(true);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('');
    setPaymentMethodFilter('');
    setMinAmount('');
    setMaxAmount('');
  };

  // Calculate stats
  const stats = {
    total: deposits.reduce((sum, d) => d.status === 'approved' ? sum + d.amount : sum, 0),
    pending: deposits.filter(d => d.status === 'pending').length,
    approved: deposits.filter(d => d.status === 'approved').length,
    rejected: deposits.filter(d => d.status === 'rejected').length
  };

  // Pagination
  const paginatedDeposits = paginateData(filteredDeposits, currentPage, pageSize);
  const totalPages = getTotalPages(filteredDeposits.length, pageSize);

  // Table columns
  const columns = [
    { key: 'id', label: 'Transaction ID', sortable: true, render: (value) => (
      <span style={{ fontWeight: 500, color: 'var(--color-primary)' }}>{value}</span>
    )},
    { key: 'userId', label: 'User ID', sortable: true },
    { key: 'userName', label: 'User Name', sortable: true, render: (value) => (
      <span style={{ fontWeight: 500 }}>{value}</span>
    )},
    { key: 'amount', label: 'Amount', sortable: true, render: (value) => (
      <span style={{ fontWeight: 600, color: 'var(--color-emerald)' }}>
        {formatCurrency(value)}
      </span>
    )},
    { key: 'paymentMethod', label: 'Payment Method', sortable: true },
    { key: 'transactionReference', label: 'Transaction Ref', sortable: false, render: (value) => (
      <span style={{ fontSize: '0.8125rem', fontFamily: 'monospace' }}>{value}</span>
    )},
    { key: 'requestDate', label: 'Request Date', sortable: true, render: (value) => (
      <span style={{ fontSize: '0.8125rem' }}>{formatDateTime(value)}</span>
    )},
    { key: 'status', label: 'Status', sortable: true, render: (value) => (
      <StatusBadge status={value} />
    )},
    { key: 'actions', label: 'Actions', sortable: false, render: (value, row) => (
      <div className="table-actions">
        <button
          className="action-btn action-btn-view action-btn-icon"
          onClick={() => openViewModal(row)}
          title="View Details"
        >
          <Eye size={14} />
        </button>
        {row.status === 'pending' && (
          <>
            <button
              className="action-btn action-btn-add action-btn-icon"
              onClick={() => openApproveConfirm(row)}
              title="Approve Deposit"
            >
              <CheckCircle size={14} />
            </button>
            <button
              className="action-btn action-btn-delete action-btn-icon"
              onClick={() => openRejectModal(row)}
              title="Reject Deposit"
            >
              <XCircle size={14} />
            </button>
          </>
        )}
      </div>
    )}
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Deposit Management"
        subtitle="Manage and process user deposit requests"
        actions={
          <button className="btn btn-purple" onClick={handleExportCSV}>
            <Download size={18} />
            Export CSV
          </button>
        }
      />

      {/* Statistics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 'var(--spacing-lg)',
        marginBottom: 'var(--spacing-xl)'
      }}>
        <StatCard
          icon={ArrowDownToLine}
          title="Total Deposits"
          value={formatCurrency(stats.total)}
          iconColor="var(--color-emerald)"
          iconBg="#D1FAE5"
        />
        <StatCard
          icon={Clock}
          title="Pending Deposits"
          value={stats.pending}
          iconColor="var(--color-orange)"
          iconBg="#FEF3C7"
        />
        <StatCard
          icon={CheckCheck}
          title="Approved Deposits"
          value={stats.approved}
          iconColor="var(--color-emerald)"
          iconBg="#D1FAE5"
        />
        <StatCard
          icon={XOctagon}
          title="Rejected Deposits"
          value={stats.rejected}
          iconColor="var(--color-red)"
          iconBg="#FEE2E2"
        />
      </div>

      {/* Search */}
      <div style={{ marginBottom: 'var(--spacing-lg)' }}>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by transaction ID, user ID, name, or reference..."
        />
      </div>

      {/* Filters */}
      <FilterBar
        onClear={clearFilters}
        showClear={searchQuery || statusFilter || paymentMethodFilter || minAmount || maxAmount}
      >
        <FilterSelect
          label="Status"
          value={statusFilter}
          onChange={setStatusFilter}
          options={[
            { value: 'pending', label: 'Pending' },
            { value: 'approved', label: 'Approved' },
            { value: 'rejected', label: 'Rejected' }
          ]}
          placeholder="All Status"
        />
        <FilterSelect
          label="Payment Method"
          value={paymentMethodFilter}
          onChange={setPaymentMethodFilter}
          options={[
            { value: 'UPI', label: 'UPI' },
            { value: 'Bank Transfer', label: 'Bank Transfer' }
          ]}
          placeholder="All Methods"
        />
        <FilterInput
          label="Min Amount"
          type="number"
          value={minAmount}
          onChange={setMinAmount}
          placeholder="0"
        />
        <FilterInput
          label="Max Amount"
          type="number"
          value={maxAmount}
          onChange={setMaxAmount}
          placeholder="Any"
        />
      </FilterBar>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={paginatedDeposits}
        onSort={handleSort}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        emptyMessage="No deposits found"
      />

      {/* Pagination */}
      {filteredDeposits.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          totalItems={filteredDeposits.length}
        />
      )}

      {/* View Deposit Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="Deposit Details"
        size="md"
      >
        {selectedDeposit && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              padding: '1rem',
              backgroundColor: 'var(--bg-hover)',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                Deposit Amount
              </p>
              <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-emerald)' }}>
                {formatCurrency(selectedDeposit.amount)}
              </p>
              <div style={{ marginTop: '0.75rem' }}>
                <StatusBadge status={selectedDeposit.status} />
              </div>
            </div>

            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                  Transaction ID
                </p>
                <p style={{ fontWeight: 600 }}>{selectedDeposit.id}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                  User ID
                </p>
                <p style={{ fontWeight: 600 }}>{selectedDeposit.userId}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                  User Name
                </p>
                <p style={{ fontWeight: 600 }}>{selectedDeposit.userName}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                  Payment Method
                </p>
                <p style={{ fontWeight: 600 }}>{selectedDeposit.paymentMethod}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                  Transaction Reference
                </p>
                <p style={{ fontWeight: 600, fontFamily: 'monospace', fontSize: '0.9rem' }}>
                  {selectedDeposit.transactionReference}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                  Request Date
                </p>
                <p style={{ fontWeight: 600 }}>{formatDateTime(selectedDeposit.requestDate)}</p>
              </div>
              {selectedDeposit.processedDate && (
                <div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                    Processed Date
                  </p>
                  <p style={{ fontWeight: 600 }}>{formatDateTime(selectedDeposit.processedDate)}</p>
                </div>
              )}
              {selectedDeposit.rejectionReason && (
                <div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                    Rejection Reason
                  </p>
                  <p style={{ fontWeight: 600, color: 'var(--color-red)' }}>
                    {selectedDeposit.rejectionReason}
                  </p>
                </div>
              )}
            </div>

            {selectedDeposit.status === 'pending' && (
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    setShowViewModal(false);
                    openRejectModal(selectedDeposit);
                  }}
                  style={{ flex: 1 }}
                >
                  <XCircle size={18} />
                  Reject
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    setShowViewModal(false);
                    openApproveConfirm(selectedDeposit);
                  }}
                  style={{ flex: 1 }}
                >
                  <CheckCircle size={18} />
                  Approve
                </button>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Approve Confirmation */}
      <ConfirmDialog
        isOpen={showApproveConfirm}
        onClose={() => setShowApproveConfirm(false)}
        onConfirm={handleApproveDeposit}
        title="Approve Deposit"
        message={selectedDeposit ? `Are you sure you want to approve the deposit of ${formatCurrency(selectedDeposit.amount)} for ${selectedDeposit.userName}? The amount will be credited to the user's wallet.` : ''}
        confirmText="Approve Deposit"
        type="info"
      />

      {/* Reject Modal */}
      <Modal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        title="Reject Deposit"
        size="md"
      >
        {selectedDeposit && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              padding: '1rem',
              backgroundColor: '#FEE2E2',
              border: '1px solid #FCA5A5',
              borderRadius: 'var(--radius-md)'
            }}>
              <p style={{ fontSize: '0.875rem', color: '#991B1B', marginBottom: '0.5rem' }}>
                <strong>Deposit Details:</strong>
              </p>
              <p style={{ fontSize: '0.8125rem', color: '#991B1B', marginBottom: '0.25rem' }}>
                User: {selectedDeposit.userName}
              </p>
              <p style={{ fontSize: '0.8125rem', color: '#991B1B' }}>
                Amount: {formatCurrency(selectedDeposit.amount)}
              </p>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Rejection Reason *
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Enter the reason for rejecting this deposit..."
                rows="4"
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              <button
                className="btn btn-secondary"
                onClick={() => setShowRejectModal(false)}
                style={{ flex: 1 }}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={handleRejectDeposit}
                style={{ flex: 1 }}
              >
                <XCircle size={18} />
                Reject Deposit
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Deposits;
