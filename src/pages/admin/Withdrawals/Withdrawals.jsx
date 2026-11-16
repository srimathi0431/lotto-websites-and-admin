// ===================================
// WITHDRAWAL MANAGEMENT PAGE
// Approve/reject withdrawals with fee calculation
// ===================================

import { useState, useEffect } from 'react';
import {
  Download,
  Eye,
  CheckCircle,
  XCircle,
  ArrowUpFromLine,
  Clock,
  CheckCheck,
  XOctagon,
  DollarSign
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
  getWithdrawals,
  updateWithdrawal,
  getUsers,
  updateUser,
  addTransaction,
  addActivityLog,
  addNotification,
  getSettings
} from '../../../admin/utils/storage';
import {
  demoWithdrawals,
  demoUsers,
  demoTransactions,
  demoActivityLogs,
  demoNotifications,
  defaultSettings
} from '../../../admin/data/demoData';
import {
  formatCurrency,
  formatDateTime,
  exportToCSV,
  filterBySearch,
  sortData,
  paginateData,
  getTotalPages,
  generateId,
  getCurrentDateTime,
  calculateServiceFee,
  calculateNetPayable
} from '../../../admin/utils/helpers';
import { useToast } from '../../../admin/hooks/useToast';

const Withdrawals = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [filteredWithdrawals, setFilteredWithdrawals] = useState([]);
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
  const [showMarkPaidConfirm, setShowMarkPaidConfirm] = useState(false);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  
  const { success, error: showError } = useToast();

  useEffect(() => {
    loadWithdrawals();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [withdrawals, searchQuery, statusFilter, paymentMethodFilter, minAmount, maxAmount, sortColumn, sortDirection]);

  const loadWithdrawals = () => {
    const loadedWithdrawals = getWithdrawals(demoWithdrawals);
    setWithdrawals(loadedWithdrawals);
  };

  const applyFilters = () => {
    let filtered = [...withdrawals];

    // Search filter
    if (searchQuery) {
      filtered = filterBySearch(filtered, searchQuery, ['id', 'userId', 'userName', 'accountDetails']);
    }

    // Status filter
    if (statusFilter) {
      filtered = filtered.filter(w => w.status === statusFilter);
    }

    // Payment method filter
    if (paymentMethodFilter) {
      filtered = filtered.filter(w => w.paymentMethod === paymentMethodFilter);
    }

    // Amount filters
    if (minAmount) {
      filtered = filtered.filter(w => w.requestedAmount >= Number(minAmount));
    }
    if (maxAmount) {
      filtered = filtered.filter(w => w.requestedAmount <= Number(maxAmount));
    }

    // Sort
    if (sortColumn) {
      filtered = sortData(filtered, sortColumn, sortDirection);
    }

    setFilteredWithdrawals(filtered);
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

  const handleApproveWithdrawal = () => {
    if (!selectedWithdrawal) return;

    // Check if already processed
    if (selectedWithdrawal.status !== 'pending') {
      showError('Only pending withdrawals can be approved');
      setShowApproveConfirm(false);
      return;
    }

    // Check user balance
    const users = getUsers(demoUsers);
    const user = users.find(u => u.id === selectedWithdrawal.userId);
    
    if (!user) {
      showError('User not found');
      setShowApproveConfirm(false);
      return;
    }

    if (user.walletBalance < selectedWithdrawal.requestedAmount) {
      showError('Insufficient user balance');
      setShowApproveConfirm(false);
      return;
    }

    // Deduct from user balance
    const previousBalance = user.walletBalance;
    const newBalance = previousBalance - selectedWithdrawal.requestedAmount;
    
    updateUser(user.id, { walletBalance: newBalance }, users);

    // Update withdrawal status
    updateWithdrawal(selectedWithdrawal.id, {
      status: 'approved',
      processedDate: getCurrentDateTime()
    }, withdrawals);

    // Add transaction record
    addTransaction({
      id: generateId('TXN'),
      userId: user.id,
      userName: user.fullName,
      type: 'withdrawal',
      credit: 0,
      debit: selectedWithdrawal.requestedAmount,
      previousBalance,
      newBalance,
      dateTime: getCurrentDateTime(),
      status: 'completed',
      remarks: `Withdrawal approved - ${selectedWithdrawal.id}`
    }, demoTransactions);

    // Add activity log
    addActivityLog({
      id: generateId('ACT'),
      adminName: 'Super Admin',
      action: 'Withdrawal Approved',
      target: selectedWithdrawal.id,
      description: `Approved withdrawal of ${formatCurrency(selectedWithdrawal.requestedAmount)} for ${selectedWithdrawal.userName}`,
      dateTime: getCurrentDateTime(),
      status: 'success'
    }, demoActivityLogs);

    // Add notification
    addNotification({
      id: generateId('NOT'),
      type: 'withdrawal',
      title: 'Withdrawal Approved',
      message: `Withdrawal of ${formatCurrency(selectedWithdrawal.requestedAmount)} has been approved for ${selectedWithdrawal.userName}`,
      dateTime: getCurrentDateTime(),
      read: false,
      link: '/withdrawals'
    }, demoNotifications);

    loadWithdrawals();
    setShowApproveConfirm(false);
    setSelectedWithdrawal(null);
    success('Withdrawal approved successfully!');
  };

  const handleRejectWithdrawal = () => {
    if (!selectedWithdrawal) return;

    if (!rejectionReason.trim()) {
      showError('Please enter a rejection reason');
      return;
    }

    // Check if already processed
    if (selectedWithdrawal.status !== 'pending') {
      showError('Only pending withdrawals can be rejected');
      setShowRejectModal(false);
      return;
    }

    // Update withdrawal status
    updateWithdrawal(selectedWithdrawal.id, {
      status: 'rejected',
      processedDate: getCurrentDateTime(),
      rejectionReason
    }, withdrawals);

    // Add activity log
    addActivityLog({
      id: generateId('ACT'),
      adminName: 'Super Admin',
      action: 'Withdrawal Rejected',
      target: selectedWithdrawal.id,
      description: `Rejected withdrawal of ${formatCurrency(selectedWithdrawal.requestedAmount)} for ${selectedWithdrawal.userName}`,
      dateTime: getCurrentDateTime(),
      status: 'warning'
    }, demoActivityLogs);

    // Add notification
    addNotification({
      id: generateId('NOT'),
      type: 'withdrawal',
      title: 'Withdrawal Rejected',
      message: `Withdrawal of ${formatCurrency(selectedWithdrawal.requestedAmount)} has been rejected for ${selectedWithdrawal.userName}`,
      dateTime: getCurrentDateTime(),
      read: false,
      link: '/withdrawals'
    }, demoNotifications);

    loadWithdrawals();
    setShowRejectModal(false);
    setSelectedWithdrawal(null);
    setRejectionReason('');
    success('Withdrawal rejected successfully!');
  };

  const handleMarkAsPaid = () => {
    if (!selectedWithdrawal) return;

    // Check if can be marked as paid
    if (selectedWithdrawal.status !== 'approved') {
      showError('Only approved withdrawals can be marked as paid');
      setShowMarkPaidConfirm(false);
      return;
    }

    // Update withdrawal status
    updateWithdrawal(selectedWithdrawal.id, {
      status: 'paid',
      processedDate: getCurrentDateTime()
    }, withdrawals);

    // Add activity log
    addActivityLog({
      id: generateId('ACT'),
      adminName: 'Super Admin',
      action: 'Withdrawal Paid',
      target: selectedWithdrawal.id,
      description: `Marked withdrawal of ${formatCurrency(selectedWithdrawal.requestedAmount)} as paid for ${selectedWithdrawal.userName}`,
      dateTime: getCurrentDateTime(),
      status: 'success'
    }, demoActivityLogs);

    // Add notification
    addNotification({
      id: generateId('NOT'),
      type: 'withdrawal',
      title: 'Withdrawal Completed',
      message: `Withdrawal of ${formatCurrency(selectedWithdrawal.requestedAmount)} has been paid to ${selectedWithdrawal.userName}`,
      dateTime: getCurrentDateTime(),
      read: false,
      link: '/withdrawals'
    }, demoNotifications);

    loadWithdrawals();
    setShowMarkPaidConfirm(false);
    setSelectedWithdrawal(null);
    success('Withdrawal marked as paid successfully!');
  };

  const handleExportCSV = () => {
    const exportData = filteredWithdrawals.map(withdrawal => ({
      'Withdrawal ID': withdrawal.id,
      'User ID': withdrawal.userId,
      'User Name': withdrawal.userName,
      'Requested Amount': withdrawal.requestedAmount,
      'Service Fee': withdrawal.serviceFee,
      'Net Payable': withdrawal.netPayable,
      'Payment Method': withdrawal.paymentMethod,
      'Account Details': withdrawal.accountDetails,
      'Request Date': withdrawal.requestDate,
      'Status': withdrawal.status,
      'Processed Date': withdrawal.processedDate || 'N/A',
      'Rejection Reason': withdrawal.rejectionReason || 'N/A'
    }));

    exportToCSV(exportData, 'withdrawals_export.csv');
    success('Data exported successfully!');
  };

  const openViewModal = (withdrawal) => {
    setSelectedWithdrawal(withdrawal);
    setShowViewModal(true);
  };

  const openApproveConfirm = (withdrawal) => {
    setSelectedWithdrawal(withdrawal);
    setShowApproveConfirm(true);
  };

  const openRejectModal = (withdrawal) => {
    setSelectedWithdrawal(withdrawal);
    setRejectionReason('');
    setShowRejectModal(true);
  };

  const openMarkPaidConfirm = (withdrawal) => {
    setSelectedWithdrawal(withdrawal);
    setShowMarkPaidConfirm(true);
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
    total: withdrawals.filter(w => w.status === 'approved' || w.status === 'paid').reduce((sum, w) => sum + w.requestedAmount, 0),
    pending: withdrawals.filter(w => w.status === 'pending').length,
    approved: withdrawals.filter(w => w.status === 'approved').length,
    rejected: withdrawals.filter(w => w.status === 'rejected').length,
    paid: withdrawals.filter(w => w.status === 'paid').length
  };

  // Pagination
  const paginatedWithdrawals = paginateData(filteredWithdrawals, currentPage, pageSize);
  const totalPages = getTotalPages(filteredWithdrawals.length, pageSize);

  // Table columns
  const columns = [
    { key: 'id', label: 'Withdrawal ID', sortable: true, render: (value) => (
      <span style={{ fontWeight: 500, color: 'var(--color-primary)' }}>{value}</span>
    )},
    { key: 'userId', label: 'User ID', sortable: true },
    { key: 'userName', label: 'User Name', sortable: true, render: (value) => (
      <span style={{ fontWeight: 500 }}>{value}</span>
    )},
    { key: 'requestedAmount', label: 'Requested Amount', sortable: true, render: (value) => (
      <span style={{ fontWeight: 600, color: 'var(--color-purple)' }}>
        {formatCurrency(value)}
      </span>
    )},
    { key: 'serviceFee', label: 'Service Fee', sortable: true, render: (value) => (
      <span style={{ fontWeight: 500, color: 'var(--color-orange)' }}>
        {formatCurrency(value)}
      </span>
    )},
    { key: 'netPayable', label: 'Net Payable', sortable: true, render: (value) => (
      <span style={{ fontWeight: 600, color: 'var(--color-emerald)' }}>
        {formatCurrency(value)}
      </span>
    )},
    { key: 'paymentMethod', label: 'Payment Method', sortable: true },
    { key: 'requestDate', label: 'Request Date', sortable: true, render: (value) => (
      <span style={{ fontSize: '0.8125rem' }}>{formatDateTime(value)}</span>
    )},
    { key: 'status', label: 'Status', sortable: true, render: (value) => {
      let text = value;
      if (value === 'paid') text = 'Paid';
      return <StatusBadge status={value} text={text} />;
    }},
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
              title="Approve Withdrawal"
            >
              <CheckCircle size={14} />
            </button>
            <button
              className="action-btn action-btn-delete action-btn-icon"
              onClick={() => openRejectModal(row)}
              title="Reject Withdrawal"
            >
              <XCircle size={14} />
            </button>
          </>
        )}
        {row.status === 'approved' && (
          <button
            className="action-btn action-btn-add action-btn-icon"
            onClick={() => openMarkPaidConfirm(row)}
            title="Mark as Paid"
          >
            <DollarSign size={14} />
          </button>
        )}
      </div>
    )}
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Withdrawal Management"
        subtitle="Process user withdrawal requests and manage payouts"
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 'var(--spacing-lg)',
        marginBottom: 'var(--spacing-xl)'
      }}>
        <StatCard
          icon={ArrowUpFromLine}
          title="Total Withdrawals"
          value={formatCurrency(stats.total)}
          iconColor="var(--color-purple)"
          iconBg="#EDE9FE"
        />
        <StatCard
          icon={Clock}
          title="Pending"
          value={stats.pending}
          iconColor="var(--color-orange)"
          iconBg="#FEF3C7"
        />
        <StatCard
          icon={CheckCheck}
          title="Approved"
          value={stats.approved}
          iconColor="var(--color-cyan)"
          iconBg="#CFFAFE"
        />
        <StatCard
          icon={DollarSign}
          title="Paid"
          value={stats.paid}
          iconColor="var(--color-emerald)"
          iconBg="#D1FAE5"
        />
        <StatCard
          icon={XOctagon}
          title="Rejected"
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
          placeholder="Search by withdrawal ID, user ID, name, or account..."
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
            { value: 'paid', label: 'Paid' },
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
        data={paginatedWithdrawals}
        onSort={handleSort}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        emptyMessage="No withdrawals found"
      />

      {/* Pagination */}
      {filteredWithdrawals.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          totalItems={filteredWithdrawals.length}
        />
      )}

      {/* View Withdrawal Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="Withdrawal Details"
        size="md"
      >
        {selectedWithdrawal && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              padding: '1rem',
              backgroundColor: 'var(--bg-hover)',
              borderRadius: 'var(--radius-md)'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                    Requested Amount
                  </p>
                  <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-purple)' }}>
                    {formatCurrency(selectedWithdrawal.requestedAmount)}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                    Service Fee
                  </p>
                  <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-orange)' }}>
                    {formatCurrency(selectedWithdrawal.serviceFee)}
                  </p>
                </div>
              </div>
              <div style={{
                padding: '0.75rem',
                backgroundColor: '#D1FAE5',
                borderRadius: 'var(--radius-md)',
                textAlign: 'center'
              }}>
                <p style={{ fontSize: '0.75rem', color: '#065F46', marginBottom: '0.25rem' }}>
                  Net Payable Amount
                </p>
                <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#065F46' }}>
                  {formatCurrency(selectedWithdrawal.netPayable)}
                </p>
              </div>
              <div style={{ marginTop: '0.75rem', textAlign: 'center' }}>
                <StatusBadge status={selectedWithdrawal.status} text={selectedWithdrawal.status === 'paid' ? 'Paid' : selectedWithdrawal.status} />
              </div>
            </div>

            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                  Withdrawal ID
                </p>
                <p style={{ fontWeight: 600 }}>{selectedWithdrawal.id}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                  User ID
                </p>
                <p style={{ fontWeight: 600 }}>{selectedWithdrawal.userId}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                  User Name
                </p>
                <p style={{ fontWeight: 600 }}>{selectedWithdrawal.userName}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                  Payment Method
                </p>
                <p style={{ fontWeight: 600 }}>{selectedWithdrawal.paymentMethod}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                  Account Details
                </p>
                <p style={{ fontWeight: 600, fontFamily: 'monospace' }}>
                  {selectedWithdrawal.accountDetails}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                  Request Date
                </p>
                <p style={{ fontWeight: 600 }}>{formatDateTime(selectedWithdrawal.requestDate)}</p>
              </div>
              {selectedWithdrawal.processedDate && (
                <div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                    Processed Date
                  </p>
                  <p style={{ fontWeight: 600 }}>{formatDateTime(selectedWithdrawal.processedDate)}</p>
                </div>
              )}
              {selectedWithdrawal.rejectionReason && (
                <div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                    Rejection Reason
                  </p>
                  <p style={{ fontWeight: 600, color: 'var(--color-red)' }}>
                    {selectedWithdrawal.rejectionReason}
                  </p>
                </div>
              )}
            </div>

            {selectedWithdrawal.status === 'pending' && (
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    setShowViewModal(false);
                    openRejectModal(selectedWithdrawal);
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
                    openApproveConfirm(selectedWithdrawal);
                  }}
                  style={{ flex: 1 }}
                >
                  <CheckCircle size={18} />
                  Approve
                </button>
              </div>
            )}

            {selectedWithdrawal.status === 'approved' && (
              <button
                className="btn btn-success"
                onClick={() => {
                  setShowViewModal(false);
                  openMarkPaidConfirm(selectedWithdrawal);
                }}
                style={{ width: '100%', marginTop: '1rem' }}
              >
                <DollarSign size={18} />
                Mark as Paid
              </button>
            )}
          </div>
        )}
      </Modal>

      {/* Approve Confirmation */}
      <ConfirmDialog
        isOpen={showApproveConfirm}
        onClose={() => setShowApproveConfirm(false)}
        onConfirm={handleApproveWithdrawal}
        title="Approve Withdrawal"
        message={selectedWithdrawal ? `Are you sure you want to approve this withdrawal? ${formatCurrency(selectedWithdrawal.requestedAmount)} will be deducted from ${selectedWithdrawal.userName}'s wallet. Net payable to user: ${formatCurrency(selectedWithdrawal.netPayable)}` : ''}
        confirmText="Approve Withdrawal"
        type="info"
      />

      {/* Mark as Paid Confirmation */}
      <ConfirmDialog
        isOpen={showMarkPaidConfirm}
        onClose={() => setShowMarkPaidConfirm(false)}
        onConfirm={handleMarkAsPaid}
        title="Mark as Paid"
        message={selectedWithdrawal ? `Confirm that ${formatCurrency(selectedWithdrawal.netPayable)} has been successfully paid to ${selectedWithdrawal.userName} via ${selectedWithdrawal.paymentMethod}?` : ''}
        confirmText="Mark as Paid"
        type="info"
      />

      {/* Reject Modal */}
      <Modal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        title="Reject Withdrawal"
        size="md"
      >
        {selectedWithdrawal && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              padding: '1rem',
              backgroundColor: '#FEE2E2',
              border: '1px solid #FCA5A5',
              borderRadius: 'var(--radius-md)'
            }}>
              <p style={{ fontSize: '0.875rem', color: '#991B1B', marginBottom: '0.5rem' }}>
                <strong>Withdrawal Details:</strong>
              </p>
              <p style={{ fontSize: '0.8125rem', color: '#991B1B', marginBottom: '0.25rem' }}>
                User: {selectedWithdrawal.userName}
              </p>
              <p style={{ fontSize: '0.8125rem', color: '#991B1B' }}>
                Amount: {formatCurrency(selectedWithdrawal.requestedAmount)}
              </p>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Rejection Reason *
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Enter the reason for rejecting this withdrawal..."
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
                onClick={handleRejectWithdrawal}
                style={{ flex: 1 }}
              >
                <XCircle size={18} />
                Reject Withdrawal
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Withdrawals;
