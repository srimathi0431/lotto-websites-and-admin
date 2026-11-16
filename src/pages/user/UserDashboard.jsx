// ===================================
// USER DASHBOARD
// Main user landing page
// ===================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Wallet,
  Ticket,
  Trophy,
  TrendingUp,
  Plus,
  ArrowRight,
  Menu
} from 'lucide-react';
import { useUser } from '../../user/contexts/UserContext';
import UserSidebar from '../../user/components/layout/UserSidebar';
import '../../user/styles/user-globals.css';
import './UserDashboard.css';

const UserDashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = {
    walletBalance: user?.walletBalance || 0,
    activeTickets: 5,
    totalWinnings: 2500,
    upcomingDraws: 3
  };

  const recentTickets = [
    { id: 'TKT001', game: 'Super Jackpot', drawDate: '2026-10-25', status: 'active', numbers: [12, 23, 34, 45, 56, 67] },
    { id: 'TKT002', game: 'Daily Lucky', drawDate: '2026-10-24', status: 'won', prize: 1000, numbers: [5, 15, 25, 35, 45, 55] },
  ];

  return (
    <div className="user-panel">
      {/* Sidebar */}
      <UserSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="user-dashboard">
        {/* Header */}
        <header className="user-dashboard-header">
          <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <div>
            <h1>Welcome back, {user?.fullName || 'User'}! 👋</h1>
            <p>Ready to play and win today?</p>
          </div>
        </header>

        {/* Wallet Card */}
        <div className="wallet-card fade-in-up">
          <div className="wallet-header">
            <div>
              <p className="wallet-label">Available Balance</p>
              <h2 className="wallet-amount">₹{stats.walletBalance.toLocaleString()}</h2>
            </div>
            <div className="wallet-icon">
              <Wallet size={32} />
            </div>
          </div>
          <div className="wallet-actions">
            <button className="user-btn user-btn-success" onClick={() => navigate('/user/wallet')}>
              <Plus size={18} />
              Add Money
            </button>
            <button className="user-btn user-btn-primary" onClick={() => navigate('/user/draws')}>
              <Ticket size={18} />
              Buy Tickets
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <div className="stat-icon">
              <Ticket size={24} />
            </div>
            <div className="stat-content">
              <p className="stat-label">Active Tickets</p>
              <h3 className="stat-value">{stats.activeTickets}</h3>
            </div>
          </div>

          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <div className="stat-icon">
              <Trophy size={24} />
            </div>
            <div className="stat-content">
              <p className="stat-label">Total Winnings</p>
              <h3 className="stat-value">₹{stats.totalWinnings.toLocaleString()}</h3>
            </div>
          </div>

          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            <div className="stat-icon">
              <TrendingUp size={24} />
            </div>
            <div className="stat-content">
              <p className="stat-label">Upcoming Draws</p>
              <h3 className="stat-value">{stats.upcomingDraws}</h3>
            </div>
          </div>
        </div>

        {/* Recent Tickets */}
        <div className="section">
          <div className="section-header">
            <h2>My Recent Tickets</h2>
            <button className="link-btn" onClick={() => navigate('/user/my-tickets')}>
              View All <ArrowRight size={16} />
            </button>
          </div>

          <div className="tickets-list">
            {recentTickets.map(ticket => (
              <div key={ticket.id} className="ticket-card user-card">
                <div className="ticket-header">
                  <div>
                    <h4>{ticket.game}</h4>
                    <p className="ticket-id">{ticket.id}</p>
                  </div>
                  <span className={`user-badge user-badge-${ticket.status === 'won' ? 'success' : 'info'}`}>
                    {ticket.status === 'won' ? '🎉 Won' : '⏳ Active'}
                  </span>
                </div>
                
                <div className="ticket-numbers">
                  {ticket.numbers.map((num, idx) => (
                    <span key={idx} className="number-ball">{num}</span>
                  ))}
                </div>

                {ticket.status === 'won' && (
                  <div className="ticket-prize">
                    Prize: <strong>₹{ticket.prize.toLocaleString()}</strong>
                  </div>
                )}
                
                <p className="ticket-draw-date">Draw: {ticket.drawDate}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <button className="action-card" onClick={() => navigate('/user/draws')}>
            <Ticket size={32} color="#6366F1" />
            <h3>Buy Tickets</h3>
            <p>Choose your lucky numbers</p>
          </button>

          <button className="action-card" onClick={() => navigate('/user/results')}>
            <Trophy size={32} color="#EF4444" />
            <h3>Check Results</h3>
            <p>See if you won</p>
          </button>

          <button className="action-card" onClick={() => navigate('/user/wallet')}>
            <Wallet size={32} color="#10B981" />
            <h3>Manage Wallet</h3>
            <p>Add or withdraw money</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
