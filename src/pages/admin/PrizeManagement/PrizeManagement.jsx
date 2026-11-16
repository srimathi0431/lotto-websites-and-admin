// ===================================
// PRIZE MANAGEMENT PAGE
// Manage prize pools, winners, distribution
// ===================================

import { useState, useEffect } from 'react';
import { 
  Award,
  Trophy,
  DollarSign,
  Users,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Send,
  Download,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { PageHeader, StatusBadge, Modal } from '../../../admin/components';
import { useToast } from '../../../admin/hooks/useToast';
import { formatDateTime, formatCurrency } from '../../../admin/utils/helpers';

const PrizeManagement = () => {
  const [prizes, setPrizes] = useState([]);
  const [winners, setWinners] = useState([]);
  const [unclaimedPrizes, setUnclaimedPrizes] = useState([]);
  const [stats, setStats] = useState({
    totalPrizesDistributed: 0,
    pendingClaims: 0,
    totalWinners: 0,
    unclaimedAmount: 0
  });
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [selectedWinner, setSelectedWinner] = useState(null);
  const [filter, setFilter] = useState('all'); // all, pending, distributed, unclaimed
  const { addToast } = useToast();

  useEffect(() => {
    loadPrizes();
    loadWinners();
  }, []);

  const loadPrizes = () => {
    // Demo data - replace with API call
    const demoPrizes = [
      {
        id: 'PRZ001',
        drawId: 'DRW002',
        gameName: 'Daily Lucky',
        drawDate: '2026-10-24T20:00:00',
        prizeCategory: '1st Prize',
        amount: 500000,
        winners: 1,
        status: 'distributed'
      },
      {
        id: 'PRZ002',
        drawId: 'DRW002',
        gameName: 'Daily Lucky',
        drawDate: '2026-10-24T20:00:00',
        prizeCategory: '2nd Prize',
        amount: 200000,
        winners: 2,
        status: 'distributed'
      },
      {
        id: 'PRZ003',
        drawId: 'DRW004',
        gameName: 'Mega Millions',
        drawDate: '2026-10-23T18:00:00',
        prizeCategory: 'Jackpot',
        amount: 15000000,
        winners: 1,
        status: 'pending'
      },
      {
        id: 'PRZ004',
        drawId: 'DRW004',
        gameName: 'Mega Millions',
        drawDate: '2026-10-23T18:00:00',
        prizeCategory: '2nd Prize',
        amount: 5000000,
        winners: 3,
        status: 'distributed'
      }
    ];

    setPrizes(demoPrizes);

    // Calculate stats
    const distributed = demoPrizes.filter(p => p.status === 'distributed')
      .reduce((sum, p) => sum + (p.amount * p.winners), 0);
    const pending = demoPrizes.filter(p => p.status === 'pending').length;
    const totalWin = demoPrizes.reduce((sum, p) => sum + p.winners, 0);
    const unclaimed = demoPrizes.filter(p => p.status === 'unclaimed')
      .reduce((sum, p) => sum + (p.amount * p.winners), 0);

    setStats({
      totalPrizesDistributed: distributed,
      pendingClaims: pending,
      totalWinners: totalWin,
      unclaimedAmount: unclaimed
    });
  };

  const loadWinners = () => {
    // Demo winners data
    const demoWinners = [
      {
        id: 'WIN001',
        userId: 'USR010',
        userName: 'Deepa Iyer',
        email: 'deepa.iyer@example.com',
        mobile: '+91 98765 43219',
        drawId: 'DRW002',
        gameName: 'Daily Lucky',
        prizeCategory: '1st Prize',
        prizeAmount: 500000,
        winningNumbers: [12, 23, 34, 45, 56, 67],
        claimStatus: 'claimed',
        claimDate: '2026-10-24T22:30:00',
        paymentStatus: 'completed',
        paymentDate: '2026-10-25T10:15:00'
      },
      {
        id: 'WIN002',
        userId: 'USR008',
        userName: 'Kavita Joshi',
        email: 'kavita.joshi@example.com',
        mobile: '+91 98765 43217',
        drawId: 'DRW004',
        gameName: 'Mega Millions',
        prizeCategory: 'Jackpot',
        prizeAmount: 15000000,
        winningNumbers: [5, 15, 25, 35, 45, 55],
        claimStatus: 'pending',
        claimDate: null,
        paymentStatus: 'pending',
        paymentDate: null
      },
      {
        id: 'WIN003',
        userId: 'USR006',
        userName: 'Anita Desai',
        email: 'anita.desai@example.com',
        mobile: '+91 98765 43215',
        drawId: 'DRW002',
        gameName: 'Daily Lucky',
        prizeCategory: '2nd Prize',
        prizeAmount: 100000,
        winningNumbers: [12, 23, 34, 45, 56, 67],
        claimStatus: 'claimed',
        claimDate: '2026-10-24T23:00:00',
        paymentStatus: 'completed',
        paymentDate: '2026-10-25T11:00:00'
      },
      {
        id: 'WIN004',
        userId: 'USR012',
        userName: 'Amit Patel',
        email: 'amit.patel@example.com',
        mobile: '+91 98765 43212',
        drawId: 'DRW004',
        gameName: 'Mega Millions',
        prizeCategory: '2nd Prize',
        prizeAmount: 1666667,
        winningNumbers: [5, 15, 25, 35, 45, 55],
        claimStatus: 'claimed',
        claimDate: '2026-10-23T20:30:00',
        paymentStatus: 'processing',
        paymentDate: null
      }
    ];

    setWinners(demoWinners);
    
    // Filter unclaimed prizes
    const unclaimed = demoWinners.filter(w => w.claimStatus === 'unclaimed');
    setUnclaimedPrizes(unclaimed);
  };

  const handleViewWinner = (winner) => {
    setSelectedWinner(winner);
    setShowWinnerModal(true);
  };

  const handleApprovePrize = (winner) => {
    // Update payment status
    const updatedWinners = winners.map(w =>
      w.id === winner.id
        ? { ...w, paymentStatus: 'completed', paymentDate: new Date().toISOString() }
        : w
    );
    setWinners(updatedWinners);
    addToast(`Prize approved for ${winner.userName}`, 'success');
    loadWinners();
  };

  const handleNotifyWinner = (winner) => {
    addToast(`Notification sent to ${winner.userName}`, 'success');
  };

  const getPaymentStatusBadge = (status) => {
    const statusMap = {
      completed: 'approved',
      processing: 'pending',
      pending: 'pending',
      failed: 'rejected'
    };
    return <StatusBadge status={statusMap[status] || status} />;
  };

  const getClaimStatusBadge = (status) => {
    const statusMap = {
      claimed: 'approved',
      pending: 'pending',
      unclaimed: 'rejected'
    };
    return <StatusBadge status={statusMap[status] || status} />;
  };

  const filteredWinners = winners.filter(winner => {
    if (filter === 'all') return true;
    if (filter === 'pending') return winner.paymentStatus === 'pending' || winner.paymentStatus === 'processing';
    if (filter === 'distributed') return winner.paymentStatus === 'completed';
    if (filter === 'unclaimed') return winner.claimStatus === 'unclaimed';
    return true;
  });

  return (
    <div className="page-container">
      <PageHeader
        title="Prize Management"
        subtitle="Manage winners, prize distribution, and claims"
      />

      {/* Statistics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Distributed</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {formatCurrency(stats.totalPrizesDistributed)}
              </p>
            </div>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '12px', 
              backgroundColor: '#D1FAE5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CheckCircle size={24} color="#047857" />
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Pending Claims</p>
              <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{stats.pendingClaims}</p>
            </div>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '12px', 
              backgroundColor: '#FFEDD5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Clock size={24} color="#B45309" />
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Winners</p>
              <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{stats.totalWinners}</p>
            </div>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '12px', 
              backgroundColor: '#EEF2FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Trophy size={24} color="#4F46E5" />
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Unclaimed</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {formatCurrency(stats.unclaimedAmount)}
              </p>
            </div>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '12px', 
              backgroundColor: '#FEE2E2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <AlertCircle size={24} color="#B91C1C" />
            </div>
          </div>
        </div>
      </div>

      {/* Prize Pool Overview */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-light)' }}>
          <h3>Prize Pool Overview</h3>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Prize ID</th>
                <th>Game Name</th>
                <th>Draw Date</th>
                <th>Category</th>
                <th>Prize Amount</th>
                <th>Winners</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {prizes.map(prize => (
                <tr key={prize.id}>
                  <td>{prize.id}</td>
                  <td style={{ fontWeight: 600 }}>{prize.gameName}</td>
                  <td>{formatDateTime(prize.drawDate)}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Award size={16} color="#F59E0B" />
                      <span style={{ fontWeight: 600 }}>{prize.prizeCategory}</span>
                    </div>
                  </td>
                  <td style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                    {formatCurrency(prize.amount)}
                  </td>
                  <td>{prize.winners}</td>
                  <td>{getPaymentStatusBadge(prize.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Winners Table */}
      <div className="card">
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3>Winners & Prize Distribution</h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button
                className={`btn btn-sm ${filter === 'pending' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setFilter('pending')}
              >
                Pending
              </button>
              <button
                className={`btn btn-sm ${filter === 'distributed' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setFilter('distributed')}
              >
                Distributed
              </button>
              <button
                className={`btn btn-sm ${filter === 'unclaimed' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setFilter('unclaimed')}
              >
                Unclaimed
              </button>
            </div>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Winner ID</th>
                <th>User Details</th>
                <th>Game & Draw</th>
                <th>Prize</th>
                <th>Winning Numbers</th>
                <th>Claim Status</th>
                <th>Payment Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredWinners.map(winner => (
                <tr key={winner.id}>
                  <td>{winner.id}</td>
                  <td>
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{winner.userName}</p>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{winner.email}</p>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{winner.mobile}</p>
                    </div>
                  </td>
                  <td>
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{winner.gameName}</p>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                        {winner.drawId} • {winner.prizeCategory}
                      </p>
                    </div>
                  </td>
                  <td style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--status-success)' }}>
                    {formatCurrency(winner.prizeAmount)}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {winner.winningNumbers.map((num, idx) => (
                        <span key={idx} style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '28px',
                          height: '28px',
                          backgroundColor: 'var(--color-primary)',
                          color: 'white',
                          borderRadius: '50%',
                          fontSize: '0.7rem',
                          fontWeight: 700
                        }}>
                          {num}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div>
                      {getClaimStatusBadge(winner.claimStatus)}
                      {winner.claimDate && (
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                          {formatDateTime(winner.claimDate)}
                        </p>
                      )}
                    </div>
                  </td>
                  <td>
                    <div>
                      {getPaymentStatusBadge(winner.paymentStatus)}
                      {winner.paymentDate && (
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                          {formatDateTime(winner.paymentDate)}
                        </p>
                      )}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        className="action-btn action-btn-view"
                        onClick={() => handleViewWinner(winner)}
                        title="View Details"
                      >
                        <Eye size={14} />
                        <span>View</span>
                      </button>
                      {winner.paymentStatus === 'pending' && (
                        <button
                          className="action-btn action-btn-add-balance"
                          onClick={() => handleApprovePrize(winner)}
                          title="Approve Prize"
                        >
                          <CheckCircle size={14} />
                          <span>Approve</span>
                        </button>
                      )}
                      <button
                        className="action-btn action-btn-edit"
                        onClick={() => handleNotifyWinner(winner)}
                        title="Send Notification"
                      >
                        <Send size={14} />
                        <span>Notify</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Winner Details Modal */}
      <Modal
        isOpen={showWinnerModal}
        onClose={() => setShowWinnerModal(false)}
        title="Winner Details"
      >
        {selectedWinner && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Winner Info */}
            <div style={{ 
              padding: '1.5rem', 
              backgroundColor: 'var(--bg-hover)', 
              borderRadius: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.5rem',
                  fontWeight: 700
                }}>
                  <Trophy size={32} />
                </div>
                <div>
                  <h3 style={{ marginBottom: '0.25rem' }}>{selectedWinner.userName}</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>{selectedWinner.email}</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                    Winner ID
                  </p>
                  <p style={{ fontWeight: 600 }}>{selectedWinner.id}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                    User ID
                  </p>
                  <p style={{ fontWeight: 600 }}>{selectedWinner.userId}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                    Mobile
                  </p>
                  <p style={{ fontWeight: 600 }}>{selectedWinner.mobile}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                    Email
                  </p>
                  <p style={{ fontWeight: 600 }}>{selectedWinner.email}</p>
                </div>
              </div>
            </div>

            {/* Prize Info */}
            <div>
              <h4 style={{ marginBottom: '1rem' }}>Prize Information</h4>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                <div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                    Game Name
                  </p>
                  <p style={{ fontWeight: 600 }}>{selectedWinner.gameName}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                    Draw ID
                  </p>
                  <p style={{ fontWeight: 600 }}>{selectedWinner.drawId}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                    Prize Category
                  </p>
                  <p style={{ fontWeight: 600 }}>{selectedWinner.prizeCategory}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                    Prize Amount
                  </p>
                  <p style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--status-success)' }}>
                    {formatCurrency(selectedWinner.prizeAmount)}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                    Winning Numbers
                  </p>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {selectedWinner.winningNumbers.map((num, idx) => (
                      <span key={idx} style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40px',
                        height: '40px',
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                        borderRadius: '50%',
                        fontSize: '1rem',
                        fontWeight: 700
                      }}>
                        {num}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Claim & Payment Status */}
            <div>
              <h4 style={{ marginBottom: '1rem' }}>Status Information</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                    Claim Status
                  </p>
                  {getClaimStatusBadge(selectedWinner.claimStatus)}
                  {selectedWinner.claimDate && (
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                      Claimed on: {formatDateTime(selectedWinner.claimDate)}
                    </p>
                  )}
                </div>
                <div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                    Payment Status
                  </p>
                  {getPaymentStatusBadge(selectedWinner.paymentStatus)}
                  {selectedWinner.paymentDate && (
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                      Paid on: {formatDateTime(selectedWinner.paymentDate)}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              {selectedWinner.paymentStatus === 'pending' && (
                <button 
                  className="btn btn-success" 
                  onClick={() => {
                    handleApprovePrize(selectedWinner);
                    setShowWinnerModal(false);
                  }}
                  style={{ flex: 1 }}
                >
                  <CheckCircle size={18} />
                  Approve Prize
                </button>
              )}
              <button 
                className="btn btn-secondary" 
                onClick={() => {
                  handleNotifyWinner(selectedWinner);
                  setShowWinnerModal(false);
                }}
                style={{ flex: 1 }}
              >
                <Send size={18} />
                Send Notification
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PrizeManagement;
