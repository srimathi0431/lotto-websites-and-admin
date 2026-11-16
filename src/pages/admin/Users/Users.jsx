// ===================================
// USER MANAGEMENT PAGE
// Full CRUD operations with balance management
// ===================================

import { useState, useEffect } from 'react';
import {
  UserPlus,
  Download,
  Edit,
  Trash2,
  Eye,
  Power,
  Plus,
  Minus,
  Users as UsersIcon,
  UserCheck,
  UserX
} from 'lucide-react';
import {
  PageHeader,
  StatCard,
  SearchBar,
  FilterBar,
  FilterSelect,
  Pagination,
  Modal,
  ConfirmDialog,
  StatusBadge
} from '../../../admin/components';
import {
  getUsers,
  saveUsers,
  updateUser,
  addUser,
  deleteUser,
  addTransaction,
  addActivityLog
} from '../../../admin/utils/storage';
import { demoUsers, demoTransactions, demoActivityLogs } from '../../../admin/data/demoData';
import {
  formatCurrency,
  formatDateTime,
  exportToCSV,
  filterBySearch,
  sortData,
  paginateData,
  getTotalPages,
  generateId,
  isValidEmail,
  isValidMobile,
  formatMobile,
  getInitials,
  getCurrentDateTime
} from '../../../admin/utils/helpers';
import { useToast } from '../../../admin/hooks/useToast';
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortColumn, setSortColumn] = useState('registrationDate');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  
  const [selectedUser, setSelectedUser] = useState(null);
  const [balanceAction, setBalanceAction] = useState('add'); // 'add' or 'deduct'
  const [balanceAmount, setBalanceAmount] = useState('');
  const [balanceReason, setBalanceReason] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    walletBalance: 0,
    status: 'active'
  });
  const [formErrors, setFormErrors] = useState({});
  
  const { success, error: showError } = useToast();

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [users, searchQuery, statusFilter, sortColumn, sortDirection]);

  const loadUsers = () => {
    const loadedUsers = getUsers(demoUsers);
    setUsers(loadedUsers);
  };

  const applyFilters = () => {
    let filtered = [...users];

    // Search filter
    if (searchQuery) {
      filtered = filterBySearch(filtered, searchQuery, ['fullName', 'email', 'mobile', 'id']);
    }

    // Status filter
    if (statusFilter) {
      filtered = filtered.filter(user => user.status === statusFilter);
    }

    // Sort
    if (sortColumn) {
      filtered = sortData(filtered, sortColumn, sortDirection);
    }

    setFilteredUsers(filtered);
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

  const validateForm = () => {
    const errors = {};
    
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Invalid email format';
    }
    
    if (!formData.mobile.trim()) {
      errors.mobile = 'Mobile number is required';
    } else if (!isValidMobile(formData.mobile)) {
      errors.mobile = 'Invalid mobile number';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddUser = () => {
    if (!validateForm()) return;

    const newUser = {
      id: generateId('USR'),
      fullName: formData.fullName,
      email: formData.email,
      mobile: formatMobile(formData.mobile),
      walletBalance: Number(formData.walletBalance) || 0,
      status: formData.status,
      lastLogin: null,
      registrationDate: getCurrentDateTime().split(' ')[0],
      avatar: null
    };

    addUser(newUser, users);
    
    // Add activity log
    addActivityLog({
      id: generateId('ACT'),
      adminName: 'Super Admin',
      action: 'User Created',
      target: newUser.id,
      description: `Created user ${newUser.fullName}`,
      dateTime: getCurrentDateTime(),
      status: 'success'
    }, demoActivityLogs);

    loadUsers();
    setShowAddModal(false);
    resetForm();
    success('User added successfully!');
  };

  const handleEditUser = () => {
    if (!validateForm()) return;

    updateUser(selectedUser.id, {
      fullName: formData.fullName,
      email: formData.email,
      mobile: formatMobile(formData.mobile),
      status: formData.status
    }, users);

    // Add activity log
    addActivityLog({
      id: generateId('ACT'),
      adminName: 'Super Admin',
      action: 'User Updated',
      target: selectedUser.id,
      description: `Updated user ${formData.fullName}`,
      dateTime: getCurrentDateTime(),
      status: 'success'
    }, demoActivityLogs);

    loadUsers();
    setShowEditModal(false);
    setSelectedUser(null);
    resetForm();
    success('User updated successfully!');
  };

  const handleDeleteUser = () => {
    deleteUser(selectedUser.id, users);
    
    // Add activity log
    addActivityLog({
      id: generateId('ACT'),
      adminName: 'Super Admin',
      action: 'User Deleted',
      target: selectedUser.id,
      description: `Deleted user ${selectedUser.fullName}`,
      dateTime: getCurrentDateTime(),
      status: 'warning'
    }, demoActivityLogs);

    loadUsers();
    setShowDeleteConfirm(false);
    setSelectedUser(null);
    success('User deleted successfully!');
  };

  const handleBalanceOperation = () => {
    const amount = Number(balanceAmount);
    
    if (!amount || amount <= 0) {
      showError('Please enter a valid amount');
      return;
    }

    if (!balanceReason.trim()) {
      showError('Please enter a reason');
      return;
    }

    const currentBalance = selectedUser.walletBalance;
    let newBalance = currentBalance;
    let transactionType = '';
    let credit = 0;
    let debit = 0;

    if (balanceAction === 'add') {
      newBalance = currentBalance + amount;
      credit = amount;
      transactionType = 'balance_credit';
    } else {
      if (amount > currentBalance) {
        showError('Insufficient balance');
        return;
      }
      newBalance = currentBalance - amount;
      debit = amount;
      transactionType = 'balance_debit';
    }

    // Update user balance
    updateUser(selectedUser.id, { walletBalance: newBalance }, users);

    // Add transaction
    addTransaction({
      id: generateId('TXN'),
      userId: selectedUser.id,
      userName: selectedUser.fullName,
      type: transactionType,
      credit,
      debit,
      previousBalance: currentBalance,
      newBalance,
      dateTime: getCurrentDateTime(),
      status: 'completed',
      remarks: balanceReason
    }, demoTransactions);

    // Add activity log
    addActivityLog({
      id: generateId('ACT'),
      adminName: 'Super Admin',
      action: balanceAction === 'add' ? 'Balance Added' : 'Balance Deducted',
      target: selectedUser.id,
      description: `${balanceAction === 'add' ? 'Added' : 'Deducted'} ${formatCurrency(amount)} ${balanceAction === 'add' ? 'to' : 'from'} ${selectedUser.fullName} wallet`,
      dateTime: getCurrentDateTime(),
      status: 'success'
    }, demoActivityLogs);

    loadUsers();
    setShowBalanceModal(false);
    setSelectedUser(null);
    setBalanceAmount('');
    setBalanceReason('');
    success(`Balance ${balanceAction === 'add' ? 'added' : 'deducted'} successfully!`);
  };

  const handleToggleStatus = (user) => {
    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    updateUser(user.id, { status: newStatus }, users);
    
    // Add activity log
    addActivityLog({
      id: generateId('ACT'),
      adminName: 'Super Admin',
      action: 'User Status Changed',
      target: user.id,
      description: `Changed ${user.fullName} status to ${newStatus}`,
      dateTime: getCurrentDateTime(),
      status: 'info'
    }, demoActivityLogs);

    loadUsers();
    success(`User ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully!`);
  };

  const handleExportCSV = () => {
    const exportData = filteredUsers.map(user => ({
      'User ID': user.id,
      'Full Name': user.fullName,
      'Email': user.email,
      'Mobile': user.mobile,
      'Wallet Balance': user.walletBalance,
      'Status': user.status,
      'Last Login': user.lastLogin || 'Never',
      'Registration Date': user.registrationDate
    }));

    exportToCSV(exportData, 'users_export.csv');
    success('Data exported successfully!');
  };

  const openAddModal = () => {
    resetForm();
    setShowAddModal(true);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({
      fullName: user.fullName,
      email: user.email,
      mobile: user.mobile,
      walletBalance: user.walletBalance,
      status: user.status
    });
    setFormErrors({});
    setShowEditModal(true);
  };

  const openBalanceModal = (user, action) => {
    setSelectedUser(user);
    setBalanceAction(action);
    setBalanceAmount('');
    setBalanceReason('');
    setShowBalanceModal(true);
  };

  const openDeleteConfirm = (user) => {
    setSelectedUser(user);
    setShowDeleteConfirm(true);
  };

  const openViewModal = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      mobile: '',
      walletBalance: 0,
      status: 'active'
    });
    setFormErrors({});
  };

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('');
  };

  // Calculate stats
  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    newUsers: users.filter(u => {
      const regDate = new Date(u.registrationDate);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return regDate >= weekAgo;
    }).length
  };

  // Pagination
  const paginatedUsers = paginateData(filteredUsers, currentPage, pageSize);
  const totalPages = getTotalPages(filteredUsers.length, pageSize);

  return (
    <div className="page-container">
      <PageHeader
        title="User Management"
        subtitle="Manage all users and their wallet balances"
        actions={
          <>
            <button className="btn btn-purple" onClick={handleExportCSV}>
              <Download size={18} />
              Export CSV
            </button>
            <button className="btn btn-primary" onClick={openAddModal}>
              <UserPlus size={18} />
              Add User
            </button>
          </>
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
          icon={UsersIcon}
          title="Total Users"
          value={stats.total}
          iconColor="#4F46E5"
          iconBg="#EEF2FF"
        />
        <StatCard
          icon={UserCheck}
          title="Active Users"
          value={stats.active}
          iconColor="#059669"
          iconBg="#D1FAE5"
        />
        <StatCard
          icon={UserX}
          title="Inactive Users"
          value={stats.inactive}
          iconColor="#F59E0B"
          iconBg="#FFEDD5"
        />
        <StatCard
          icon={UserPlus}
          title="New This Week"
          value={stats.newUsers}
          iconColor="#8B5CF6"
          iconBg="#F3E8FF"
        />
      </div>

      {/* Search and Filters */}
      <div style={{ marginBottom: 'var(--spacing-lg)' }}>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by name, email, ID, or mobile..."
        />
      </div>

      <FilterBar
        onClear={clearFilters}
        showClear={searchQuery || statusFilter}
      >
        <FilterSelect
          label="Status"
          value={statusFilter}
          onChange={setStatusFilter}
          options={[
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' }
          ]}
          placeholder="All Status"
        />
      </FilterBar>

      {/* User Records */}
      <div className="users-records-container">
        {paginatedUsers.length === 0 ? (
          <div className="empty-state">
            <p>No users found</p>
          </div>
        ) : (
          paginatedUsers.map((user, index) => {
            // Determine avatar color based on index
            const avatarColors = ['lavender', 'sky', 'mint', 'peach', 'pink'];
            const avatarColor = avatarColors[index % avatarColors.length];
            
            return (
              <div key={user.id} className="user-record-card">
                {/* Main User Information */}
                <div className="user-record-main">
                  {/* User Identity */}
                  <div className="user-identity">
                    <div className={`user-avatar ${avatarColor}`}>
                      {getInitials(user.fullName)}
                    </div>
                    <div className="user-details">
                      <span className="user-name">{user.fullName}</span>
                      <span className="user-id">{user.id}</span>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="user-email" title={user.email}>
                    {user.email}
                  </div>

                  {/* Mobile */}
                  <div className="user-mobile">
                    {formatMobile(user.mobile)}
                  </div>

                  {/* Balance */}
                  <div className="user-balance">
                    {formatCurrency(user.walletBalance)}
                  </div>

                  {/* Status */}
                  <div className="user-status">
                    <StatusBadge status={user.status} />
                  </div>

                  {/* Last Login */}
                  <div className="user-date" data-label="Last Login:">
                    {user.lastLogin ? formatDateTime(user.lastLogin) : 'Never'}
                  </div>

                  {/* Registration Date */}
                  <div className="user-date" data-label="Registered:">
                    {formatDateTime(user.registrationDate)}
                  </div>
                </div>

                {/* Action Buttons Row */}
                <div className="user-record-actions">
                  <button
                    className="action-btn action-btn-view"
                    onClick={() => openViewModal(user)}
                    title="View Details"
                  >
                    <Eye size={14} />
                    <span>View</span>
                  </button>
                  
                  <button
                    className="action-btn action-btn-edit"
                    onClick={() => openEditModal(user)}
                    title="Edit User"
                  >
                    <Edit size={14} />
                    <span>Edit</span>
                  </button>
                  
                  <button
                    className={`action-btn ${user.status === 'active' ? 'action-btn-deactivate' : 'action-btn-activate'}`}
                    onClick={() => handleToggleStatus(user)}
                    title={user.status === 'active' ? 'Deactivate' : 'Activate'}
                  >
                    <Power size={14} />
                    <span>{user.status === 'active' ? 'Deactivate' : 'Activate'}</span>
                  </button>
                  
                  <button
                    className="action-btn action-btn-add-balance"
                    onClick={() => openBalanceModal(user, 'add')}
                    title="Add Balance"
                  >
                    <Plus size={14} />
                    <span>Add Balance</span>
                  </button>
                  
                  <button
                    className="action-btn action-btn-deduct-balance"
                    onClick={() => openBalanceModal(user, 'deduct')}
                    title="Deduct Balance"
                  >
                    <Minus size={14} />
                    <span>Deduct Balance</span>
                  </button>
                  
                  <button
                    className="action-btn action-btn-delete"
                    onClick={() => openDeleteConfirm(user)}
                    title="Delete User"
                  >
                    <Trash2 size={14} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {filteredUsers.length > 0 && (
        <div className="users-pagination">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
            totalItems={filteredUsers.length}
          />
        </div>
      )}

      {/* Add User Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New User"
      >
        <form onSubmit={(e) => { e.preventDefault(); handleAddUser(); }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Full Name *
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Enter full name"
              />
              {formErrors.fullName && (
                <p style={{ color: 'var(--color-red)', fontSize: '0.8125rem', marginTop: '0.25rem' }}>
                  {formErrors.fullName}
                </p>
              )}
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email address"
              />
              {formErrors.email && (
                <p style={{ color: 'var(--color-red)', fontSize: '0.8125rem', marginTop: '0.25rem' }}>
                  {formErrors.email}
                </p>
              )}
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Mobile Number *
              </label>
              <input
                type="tel"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                placeholder="Enter mobile number"
              />
              {formErrors.mobile && (
                <p style={{ color: 'var(--color-red)', fontSize: '0.8125rem', marginTop: '0.25rem' }}>
                  {formErrors.mobile}
                </p>
              )}
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Initial Wallet Balance
              </label>
              <input
                type="number"
                value={formData.walletBalance}
                onChange={(e) => setFormData({ ...formData, walletBalance: e.target.value })}
                placeholder="0"
                min="0"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)} style={{ flex: 1 }}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                Add User
              </button>
            </div>
          </div>
        </form>
      </Modal>

      {/* Edit User Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit User"
      >
        <form onSubmit={(e) => { e.preventDefault(); handleEditUser(); }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Full Name *
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Enter full name"
              />
              {formErrors.fullName && (
                <p style={{ color: 'var(--color-red)', fontSize: '0.8125rem', marginTop: '0.25rem' }}>
                  {formErrors.fullName}
                </p>
              )}
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email address"
              />
              {formErrors.email && (
                <p style={{ color: 'var(--color-red)', fontSize: '0.8125rem', marginTop: '0.25rem' }}>
                  {formErrors.email}
                </p>
              )}
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Mobile Number *
              </label>
              <input
                type="tel"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                placeholder="Enter mobile number"
              />
              {formErrors.mobile && (
                <p style={{ color: 'var(--color-red)', fontSize: '0.8125rem', marginTop: '0.25rem' }}>
                  {formErrors.mobile}
                </p>
              )}
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)} style={{ flex: 1 }}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </Modal>

      {/* Balance Management Modal */}
      <Modal
        isOpen={showBalanceModal}
        onClose={() => setShowBalanceModal(false)}
        title={balanceAction === 'add' ? 'Add Balance' : 'Deduct Balance'}
      >
        {selectedUser && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              padding: '1rem',
              backgroundColor: 'var(--bg-hover)',
              borderRadius: 'var(--radius-md)'
            }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                User: <strong>{selectedUser.fullName}</strong>
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Current Balance: <strong style={{ color: 'var(--color-emerald)' }}>{formatCurrency(selectedUser.walletBalance)}</strong>
              </p>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Amount *
              </label>
              <input
                type="number"
                value={balanceAmount}
                onChange={(e) => setBalanceAmount(e.target.value)}
                placeholder="Enter amount"
                min="1"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Reason / Remarks *
              </label>
              <textarea
                value={balanceReason}
                onChange={(e) => setBalanceReason(e.target.value)}
                placeholder="Enter reason for this transaction"
                rows="3"
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              <button className="btn btn-secondary" onClick={() => setShowBalanceModal(false)} style={{ flex: 1 }}>
                Cancel
              </button>
              <button
                className={`btn ${balanceAction === 'add' ? 'btn-success' : 'btn-warning'}`}
                onClick={handleBalanceOperation}
                style={{ flex: 1 }}
              >
                {balanceAction === 'add' ? 'Add Balance' : 'Deduct Balance'}
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* View User Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="User Details"
      >
        {selectedUser && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ textAlign: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
              <div style={{
                width: '80px',
                height: '80px',
                margin: '0 auto 1rem',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-purple))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 700,
                fontSize: '2rem'
              }}>
                {getInitials(selectedUser.fullName)}
              </div>
              <h3 style={{ marginBottom: '0.5rem' }}>{selectedUser.fullName}</h3>
              <StatusBadge status={selectedUser.status} />
            </div>

            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>User ID</p>
                <p style={{ fontWeight: 600 }}>{selectedUser.id}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Email</p>
                <p style={{ fontWeight: 600 }}>{selectedUser.email}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Mobile</p>
                <p style={{ fontWeight: 600 }}>{selectedUser.mobile}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Wallet Balance</p>
                <p style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--color-emerald)' }}>
                  {formatCurrency(selectedUser.walletBalance)}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Last Login</p>
                <p style={{ fontWeight: 600 }}>{selectedUser.lastLogin ? formatDateTime(selectedUser.lastLogin) : 'Never'}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Registration Date</p>
                <p style={{ fontWeight: 600 }}>{selectedUser.registrationDate}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteUser}
        title="Delete User"
        message={`Are you sure you want to delete ${selectedUser?.fullName}? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
};

export default Users;
