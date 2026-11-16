// ===================================
// ADMIN MANAGEMENT PAGE
// Manage admin users and permissions (demo)
// ===================================

import { useState, useEffect } from 'react';
import { Shield, UserPlus } from 'lucide-react';
import { PageHeader, StatCard, DataTable, StatusBadge, EmptyState } from '../../../admin/components';
import { getAdmins } from '../../../admin/utils/storage';
import { demoAdmins } from '../../../admin/data/demoData';
import { formatDateTime } from '../../../admin/utils/helpers';

const AdminManagement = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const loaded = getAdmins(demoAdmins);
    setAdmins(loaded);
  }, []);

  const columns = [
    { key: 'id', label: 'Admin ID', sortable: true },
    { key: 'fullName', label: 'Full Name', sortable: true, render: (value) => <span style={{ fontWeight: 500 }}>{value}</span> },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true, render: (value) => {
      const colors = { 'Super Admin': 'primary', 'Finance Admin': 'success', 'Support Admin': 'info' };
      return <StatusBadge status={colors[value] || 'info'} text={value} />;
    }},
    { key: 'status', label: 'Status', sortable: true, render: (value) => <StatusBadge status={value} />},
    { key: 'lastLogin', label: 'Last Login', sortable: true, render: (value) => <span style={{ fontSize: '0.8125rem' }}>{formatDateTime(value)}</span>},
    { key: 'createdDate', label: 'Created Date', sortable: true }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Admin Management"
        subtitle="Manage administrator accounts and permissions"
        actions={
          <button className="btn btn-primary">
            <UserPlus size={18} />
            Add Admin
          </button>
        }
      />

      <div style={{ marginBottom: 'var(--spacing-xl)' }}>
        <StatCard icon={Shield} title="Total Admins" value={admins.length} iconColor="var(--color-primary)" iconBg="#EEF2FF" />
      </div>

      <div className="card" style={{ padding: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xl)', backgroundColor: '#FEF3C7', border: '1px solid #FCD34D' }}>
        <p style={{ fontSize: '0.875rem', color: '#78350F', margin: 0 }}>
          <strong>Demo Note:</strong> Admin management and role permissions are frontend demonstrations only. 
          Real access control requires backend authentication and authorization systems.
        </p>
      </div>

      <DataTable columns={columns} data={admins} emptyMessage="No admins found" />

      <div className="card" style={{ marginTop: 'var(--spacing-xl)' }}>
        <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Role Permissions (Demo)</h3>
        <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
          {[
            { role: 'Super Admin', permissions: 'Full access to all features and settings' },
            { role: 'Finance Admin', permissions: 'Manage deposits, withdrawals, transactions, and reports' },
            { role: 'Support Admin', permissions: 'Manage users, view transactions, respond to notifications' }
          ].map(({ role, permissions }) => (
            <div key={role} style={{ padding: 'var(--spacing-md)', backgroundColor: 'var(--bg-hover)', borderRadius: 'var(--radius-md)' }}>
              <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{role}</p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>{permissions}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminManagement;
