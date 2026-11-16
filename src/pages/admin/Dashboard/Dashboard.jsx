// ===================================
// DASHBOARD PAGE
// Main landing page with overview and statistics
// ===================================

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  UserCheck,
  UserX,
  ArrowDownToLine,
  ArrowUpFromLine,
  Clock,
  Wallet,
  DollarSign,
  TrendingUp,
  Eye
} from 'lucide-react';
import {
  PageHeader,
  StatCard,
  BarChartCard,
  LineChartCard,
  PieChartCard,
  StatusBadge
} from '../../../admin/components';
import {
  getUsers,
  getDeposits,
  getWithdrawals,
  getTransactions
} from '../../../admin/utils/storage';
import {
  demoUsers,
  demoDeposits,
  demoWithdrawals,
  demoTransactions
} from '../../../admin/data/demoData';
import { formatCurrency, formatDateTime } from '../../../admin/utils/helpers';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    totalDeposits: 0,
    pendingDeposits: 0,
    totalWithdrawals: 0,
    pendingWithdrawals: 0,
    totalBalance: 0,
    totalFees: 0
  });
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [dateRange, setDateRange] = useState('last7days');
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    const users = getUsers(demoUsers);
    const deposits = getDeposits(demoDeposits);
    const withdrawals = getWithdrawals(demoWithdrawals);
    const transactions = getTransactions(demoTransactions);

    // Calculate statistics
    const activeUsers = users.filter(u => u.status === 'active').length;
    const inactiveUsers = users.filter(u => u.status === 'inactive').length;
    
    const approvedDeposits = deposits.filter(d => d.status === 'approved');
    const totalDepositsAmount = approvedDeposits.reduce((sum, d) => sum + d.amount, 0);
    const pendingDepositsCount = deposits.filter(d => d.status === 'pending').length;

    const approvedWithdrawals = withdrawals.filter(w => w.status === 'approved' || w.status === 'paid');
    const totalWithdrawalsAmount = approvedWithdrawals.reduce((sum, w) => sum + w.requestedAmount, 0);
    const pendingWithdrawalsCount = withdrawals.filter(w => w.status === 'pending').length;

    const totalBalance = users.reduce((sum, u) => sum + u.walletBalance, 0);
    const totalFees = approvedWithdrawals.reduce((sum, w) => sum + w.serviceFee, 0);

    setStats({
      totalUsers: users.length,
      activeUsers,
      inactiveUsers,
      totalDeposits: totalDepositsAmount,
      pendingDeposits: pendingDepositsCount,
      totalWithdrawals: totalWithdrawalsAmount,
      pendingWithdrawals: pendingWithdrawalsCount,
      totalBalance,
      totalFees
    });

    // Recent transactions (last 5)
    setRecentTransactions(transactions.slice(0, 5));

    // Recent users (last 5)
    const sortedUsers = [...users].sort((a, b) => 
      new Date(b.registrationDate) - new Date(a.registrationDate)
    );
    setRecentUsers(sortedUsers.slice(0, 5));
  };

  // Chart data
  const depositVsWithdrawalData = [
    { name: 'Mon', deposits: 45000, withdrawals: 32000 },
    { name: 'Tue', deposits: 52000, withdrawals: 28000 },
    { name: 'Wed', deposits: 48000, withdrawals: 35000 },
    { name: 'Thu', deposits: 61000, withdrawals: 42000 },
    { name: 'Fri', deposits: 55000, withdrawals: 38000 },
    { name: 'Sat', deposits: 67000, withdrawals: 45000 },
    { name: 'Sun', deposits: 58000, withdrawals: 40000 }
  ];

  const userRegistrationData = [
    { name: 'Week 1', users: 12 },
    { name: 'Week 2', users: 19 },
    { name: 'Week 3', users: 15 },
    { name: 'Week 4', users: 25 },
    { name: 'Week 5', users: 22 },
    { name: 'Week 6', users: 30 }
  ];

  const transactionStatusData = [
    { name: 'Completed', value: 85 },
    { name: 'Pending', value: 10 },
    { name: 'Failed', value: 5 }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Welcome Back, Admin!"
        subtitle="Lotto Link overview and activity summary"
        actions={
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              style={{ minWidth: '150px' }}
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
              <option value="thisMonth">This Month</option>
            </select>
          </div>
        }
      />

      {/* Statistics Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: 'var(--spacing-lg)',
        marginBottom: 'var(--spacing-xl)'
      }}>
        <StatCard
          icon={Users}
          title="Total Users"
          value={stats.totalUsers}
          change={12}
          iconColor="var(--color-primary)"
          iconBg="#EEF2FF"
        />
        <StatCard
          icon={UserCheck}
          title="Active Users"
          value={stats.activeUsers}
          change={8}
          iconColor="var(--color-emerald)"
          iconBg="#D1FAE5"
        />
        <StatCard
          icon={UserX}
          title="Inactive Users"
          value={stats.inactiveUsers}
          change={-3}
          iconColor="var(--color-orange)"
          iconBg="#FEF3C7"
        />
        <StatCard
          icon={ArrowDownToLine}
          title="Total Deposits"
          value={formatCurrency(stats.totalDeposits)}
          change={15}
          iconColor="var(--color-emerald)"
          iconBg="#D1FAE5"
        />
        <StatCard
          icon={Clock}
          title="Pending Deposits"
          value={stats.pendingDeposits}
          iconColor="var(--color-orange)"
          iconBg="#FEF3C7"
        />
        <StatCard
          icon={ArrowUpFromLine}
          title="Total Withdrawals"
          value={formatCurrency(stats.totalWithdrawals)}
          change={-5}
          iconColor="var(--color-purple)"
          iconBg="#EDE9FE"
        />
        <StatCard
          icon={Clock}
          title="Pending Withdrawals"
          value={stats.pendingWithdrawals}
          iconColor="var(--color-orange)"
          iconBg="#FEF3C7"
        />
        <StatCard
          icon={Wallet}
          title="Total User Balance"
          value={formatCurrency(stats.totalBalance)}
          change={10}
          iconColor="var(--color-cyan)"
          iconBg="#CFFAFE"
        />
        <StatCard
          icon={DollarSign}
          title="Service Fees Collected"
          value={formatCurrency(stats.totalFees)}
          change={20}
          iconColor="var(--color-pink)"
          iconBg="#FCE7F3"
        />
      </div>

      {/* Charts */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: 'var(--spacing-lg)',
        marginBottom: 'var(--spacing-xl)'
      }}>
        <BarChartCard
          title="Deposits vs Withdrawals"
          data={depositVsWithdrawalData}
          dataKeys={[
            { dataKey: 'deposits', name: 'Deposits' },
            { dataKey: 'withdrawals', name: 'Withdrawals' }
          ]}
          colors={['#10B981', '#8B5CF6']}
        />
        <LineChartCard
          title="User Registration Trend"
          data={userRegistrationData}
          dataKeys={[
            { dataKey: 'users', name: 'New Users' }
          ]}
          colors={['#4F46E5']}
        />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: 'var(--spacing-lg)',
        marginBottom: 'var(--spacing-xl)'
      }}>
        <PieChartCard
          title="Transaction Status Distribution"
          data={transactionStatusData}
          colors={['#10B981', '#F59E0B', '#EF4444']}
        />

        {/* Monthly Overview Card */}
        <div className="card">
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem' }}>
            Monthly Financial Overview
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem',
              backgroundColor: '#D1FAE5',
              borderRadius: 'var(--radius-md)'
            }}>
              <div>
                <p style={{ fontSize: '0.875rem', color: '#065F46', marginBottom: '0.25rem' }}>
                  Total Deposits
                </p>
                <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#065F46' }}>
                  {formatCurrency(stats.totalDeposits)}
                </p>
              </div>
              <TrendingUp size={32} style={{ color: '#10B981' }} />
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem',
              backgroundColor: '#EDE9FE',
              borderRadius: 'var(--radius-md)'
            }}>
              <div>
                <p style={{ fontSize: '0.875rem', color: '#5B21B6', marginBottom: '0.25rem' }}>
                  Total Withdrawals
                </p>
                <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#5B21B6' }}>
                  {formatCurrency(stats.totalWithdrawals)}
                </p>
              </div>
              <TrendingUp size={32} style={{ color: '#8B5CF6' }} />
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem',
              backgroundColor: '#FCE7F3',
              borderRadius: 'var(--radius-md)'
            }}>
              <div>
                <p style={{ fontSize: '0.875rem', color: '#9F1239', marginBottom: '0.25rem' }}>
                  Service Fees
                </p>
                <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#9F1239' }}>
                  {formatCurrency(stats.totalFees)}
                </p>
              </div>
              <DollarSign size={32} style={{ color: '#EC4899' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div style={{ marginBottom: 'var(--spacing-xl)' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--spacing-md)'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Recent Transactions</h2>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigate('/transactions')}
          >
            View All
          </button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>User</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map(transaction => (
                <tr key={transaction.id}>
                  <td style={{ fontWeight: 500, color: 'var(--color-primary)' }}>
                    {transaction.id}
                  </td>
                  <td>{transaction.userName}</td>
                  <td style={{ textTransform: 'capitalize' }}>
                    {transaction.type.replace('_', ' ')}
                  </td>
                  <td>
                    {transaction.credit > 0 ? (
                      <span style={{ color: 'var(--color-emerald)', fontWeight: 500 }}>
                        +{formatCurrency(transaction.credit)}
                      </span>
                    ) : (
                      <span style={{ color: 'var(--color-red)', fontWeight: 500 }}>
                        -{formatCurrency(transaction.debit)}
                      </span>
                    )}
                  </td>
                  <td style={{ fontSize: '0.8125rem' }}>{formatDateTime(transaction.dateTime)}</td>
                  <td>
                    <StatusBadge status={transaction.status} />
                  </td>
                  <td>
                    <button
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '0.375rem 0.75rem' }}
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Users */}
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--spacing-md)'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Recently Registered Users</h2>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigate('/users')}
          >
            View All
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: 'var(--spacing-md)'
        }}>
          {recentUsers.map(user => (
            <div
              key={user.id}
              className="card"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/users')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-purple))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '1.125rem',
                  flexShrink: 0
                }}>
                  {user.fullName.charAt(0)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontWeight: 600,
                    marginBottom: '0.25rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {user.fullName}
                  </p>
                  <p style={{
                    fontSize: '0.8125rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '0.25rem'
                  }}>
                    {user.id}
                  </p>
                  <StatusBadge status={user.status} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
