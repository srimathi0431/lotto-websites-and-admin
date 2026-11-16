// ===================================
// REPORTS PAGE
// Financial reports with date range selection
// ===================================

import { useState, useEffect } from 'react';
import { Download, Users, ArrowDownToLine, ArrowUpFromLine, DollarSign } from 'lucide-react';
import { PageHeader, StatCard, FilterSelect, BarChartCard, LineChartCard } from '../../../admin/components';
import { getUsers, getDeposits, getWithdrawals, getTransactions } from '../../../admin/utils/storage';
import { demoUsers, demoDeposits, demoWithdrawals, demoTransactions } from '../../../admin/data/demoData';
import { formatCurrency, exportToCSV } from '../../../admin/utils/helpers';
import { useToast } from '../../../admin/hooks/useToast';

const Reports = () => {
  const [dateRange, setDateRange] = useState('thisMonth');
  const [stats, setStats] = useState({ newUsers: 0, totalDeposits: 0, approvedDeposits: 0, totalWithdrawals: 0, paidWithdrawals: 0, serviceFees: 0, balanceAdjustments: 0 });
  const { success } = useToast();

  useEffect(() => {
    loadReports();
  }, [dateRange]);

  const loadReports = () => {
    const users = getUsers(demoUsers);
    const deposits = getDeposits(demoDeposits);
    const withdrawals = getWithdrawals(demoWithdrawals);
    const transactions = getTransactions(demoTransactions);

    const newUsers = users.length;
    const totalDeposits = deposits.reduce((sum, d) => sum + d.amount, 0);
    const approvedDeposits = deposits.filter(d => d.status === 'approved').reduce((sum, d) => sum + d.amount, 0);
    const totalWithdrawals = withdrawals.reduce((sum, w) => sum + w.requestedAmount, 0);
    const paidWithdrawals = withdrawals.filter(w => w.status === 'paid').reduce((sum, w) => sum + w.requestedAmount, 0);
    const serviceFees = withdrawals.filter(w => w.status === 'paid').reduce((sum, w) => sum + w.serviceFee, 0);
    const balanceAdjustments = transactions.filter(t => t.type.includes('balance')).reduce((sum, t) => sum + t.credit + t.debit, 0);

    setStats({ newUsers, totalDeposits, approvedDeposits, totalWithdrawals, paidWithdrawals, serviceFees, balanceAdjustments });
  };

  const handleExportReport = () => {
    const reportData = [{
      'Date Range': dateRange,
      'New Users': stats.newUsers,
      'Total Deposits': stats.totalDeposits,
      'Approved Deposits': stats.approvedDeposits,
      'Total Withdrawals': stats.totalWithdrawals,
      'Paid Withdrawals': stats.paidWithdrawals,
      'Service Fees': stats.serviceFees,
      'Balance Adjustments': stats.balanceAdjustments
    }];
    exportToCSV(reportData, `report_${dateRange}_${new Date().toISOString().split('T')[0]}.csv`);
    success('Report exported successfully!');
  };

  const chartData = [
    { name: 'Week 1', deposits: 45000, withdrawals: 32000 },
    { name: 'Week 2', deposits: 52000, withdrawals: 28000 },
    { name: 'Week 3', deposits: 48000, withdrawals: 35000 },
    { name: 'Week 4', deposits: 61000, withdrawals: 42000 }
  ];

  const userTrendData = [
    { name: 'Mon', users: 5 },
    { name: 'Tue', users: 8 },
    { name: 'Wed', users: 6 },
    { name: 'Thu', users: 10 },
    { name: 'Fri', users: 7 },
    { name: 'Sat', users: 12 },
    { name: 'Sun', users: 9 }
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Reports & Analytics"
        subtitle="Financial reports and performance metrics"
        actions={
          <>
            <FilterSelect value={dateRange} onChange={setDateRange} options={[
              { value: 'today', label: 'Today' },
              { value: 'yesterday', label: 'Yesterday' },
              { value: 'last7days', label: 'Last 7 Days' },
              { value: 'last30days', label: 'Last 30 Days' },
              { value: 'thisMonth', label: 'This Month' },
              { value: 'lastMonth', label: 'Last Month' }
            ]} />
            <button className="btn btn-purple" onClick={handleExportReport}>
              <Download size={18} />
              Export Report
            </button>
          </>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xl)' }}>
        <StatCard icon={Users} title="New Users" value={stats.newUsers} iconColor="var(--color-primary)" iconBg="#EEF2FF" />
        <StatCard icon={ArrowDownToLine} title="Total Deposits" value={formatCurrency(stats.totalDeposits)} iconColor="var(--color-emerald)" iconBg="#D1FAE5" />
        <StatCard icon={ArrowDownToLine} title="Approved Deposits" value={formatCurrency(stats.approvedDeposits)} iconColor="var(--color-emerald)" iconBg="#D1FAE5" />
        <StatCard icon={ArrowUpFromLine} title="Total Withdrawals" value={formatCurrency(stats.totalWithdrawals)} iconColor="var(--color-purple)" iconBg="#EDE9FE" />
        <StatCard icon={ArrowUpFromLine} title="Paid Withdrawals" value={formatCurrency(stats.paidWithdrawals)} iconColor="var(--color-purple)" iconBg="#EDE9FE" />
        <StatCard icon={DollarSign} title="Service Fees" value={formatCurrency(stats.serviceFees)} iconColor="var(--color-pink)" iconBg="#FCE7F3" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 'var(--spacing-lg)' }}>
        <BarChartCard title="Deposits vs Withdrawals" data={chartData} dataKeys={[
          { dataKey: 'deposits', name: 'Deposits' },
          { dataKey: 'withdrawals', name: 'Withdrawals' }
        ]} colors={['#10B981', '#8B5CF6']} />
        <LineChartCard title="Daily User Registration" data={userTrendData} dataKeys={[{ dataKey: 'users', name: 'New Users' }]} colors={['#4F46E5']} />
      </div>
    </div>
  );
};

export default Reports;
