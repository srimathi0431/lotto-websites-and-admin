// ===================================
// DRAW MANAGEMENT PAGE
// Schedule draws, trigger manual draws, enter winning numbers
// ===================================

import { useState, useEffect } from 'react';
import { 
  Calendar,
  Clock,
  Play,
  CheckCircle,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  Eye,
  RefreshCw,
  Award,
  TrendingUp
} from 'lucide-react';
import { PageHeader, StatusBadge, Modal, ConfirmDialog } from '../../../admin/components';
import { useToast } from '../../../admin/hooks/useToast';
import { formatDateTime, formatCurrency } from '../../../admin/utils/helpers';

const DrawManagement = () => {
  const [draws, setDraws] = useState([]);
  const [upcomingDraws, setUpcomingDraws] = useState([]);
  const [stats, setStats] = useState({
    totalDraws: 0,
    completedDraws: 0,
    upcomingDraws: 0,
    totalPrizePool: 0
  });
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showTriggerModal, setShowTriggerModal] = useState(false);
  const [showWinningNumbersModal, setShowWinningNumbersModal] = useState(false);
  const [selectedDraw, setSelectedDraw] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { addToast } = useToast();

  // Form states
  const [scheduleForm, setScheduleForm] = useState({
    gameName: '',
    drawDate: '',
    drawTime: '',
    ticketPrice: '',
    prizePool: '',
    maxTickets: ''
  });

  const [winningNumbers, setWinningNumbers] = useState(['', '', '', '', '', '']);

  useEffect(() => {
    loadDraws();
  }, []);

  const loadDraws = () => {
    // Demo data - replace with API call
    const demoDraws = [
      {
        id: 'DRW001',
        gameName: 'Super Jackpot',
        drawDate: '2026-10-25T18:00:00',
        status: 'scheduled',
        ticketPrice: 100,
        prizePool: 5000000,
        ticketsSold: 12500,
        maxTickets: 50000,
        winningNumbers: null
      },
      {
        id: 'DRW002',
        gameName: 'Daily Lucky',
        drawDate: '2026-10-24T20:00:00',
        status: 'completed',
        ticketPrice: 50,
        prizePool: 1000000,
        ticketsSold: 20000,
        maxTickets: 20000,
        winningNumbers: [12, 23, 34, 45, 56, 67]
      },
      {
        id: 'DRW003',
        gameName: 'Weekend Special',
        drawDate: '2026-10-26T19:00:00',
        status: 'scheduled',
        ticketPrice: 150,
        prizePool: 10000000,
        ticketsSold: 8500,
        maxTickets: 100000,
        winningNumbers: null
      },
      {
        id: 'DRW004',
        gameName: 'Mega Millions',
        drawDate: '2026-10-23T18:00:00',
        status: 'completed',
        ticketPrice: 200,
        prizePool: 25000000,
        ticketsSold: 125000,
        maxTickets: 125000,
        winningNumbers: [5, 15, 25, 35, 45, 55]
      }
    ];

    setDraws(demoDraws);

    // Calculate stats
    const total = demoDraws.length;
    const completed = demoDraws.filter(d => d.status === 'completed').length;
    const upcoming = demoDraws.filter(d => d.status === 'scheduled').length;
    const totalPrize = demoDraws.reduce((sum, d) => sum + d.prizePool, 0);

    setStats({
      totalDraws: total,
      completedDraws: completed,
      upcomingDraws: upcoming,
      totalPrizePool: totalPrize
    });

    // Separate upcoming draws
    setUpcomingDraws(demoDraws.filter(d => d.status === 'scheduled'));
  };

  const handleScheduleDraw = () => {
    // Validation
    if (!scheduleForm.gameName || !scheduleForm.drawDate || !scheduleForm.drawTime) {
      addToast('Please fill all required fields', 'error');
      return;
    }

    const newDraw = {
      id: `DRW${String(draws.length + 1).padStart(3, '0')}`,
      gameName: scheduleForm.gameName,
      drawDate: `${scheduleForm.drawDate}T${scheduleForm.drawTime}:00`,
      status: 'scheduled',
      ticketPrice: parseFloat(scheduleForm.ticketPrice),
      prizePool: parseFloat(scheduleForm.prizePool),
      ticketsSold: 0,
      maxTickets: parseInt(scheduleForm.maxTickets),
      winningNumbers: null
    };

    setDraws([...draws, newDraw]);
    setShowScheduleModal(false);
    setScheduleForm({
      gameName: '',
      drawDate: '',
      drawTime: '',
      ticketPrice: '',
      prizePool: '',
      maxTickets: ''
    });
    addToast('Draw scheduled successfully', 'success');
    loadDraws();
  };

  const handleTriggerDraw = (draw) => {
    setSelectedDraw(draw);
    setShowTriggerModal(true);
  };

  const confirmTriggerDraw = () => {
    // Simulate draw execution
    addToast(`Draw ${selectedDraw.id} triggered successfully`, 'success');
    setShowTriggerModal(false);
    setSelectedDraw(null);
    
    // Open winning numbers modal
    setTimeout(() => {
      setSelectedDraw(selectedDraw);
      setShowWinningNumbersModal(true);
    }, 500);
  };

  const handleEnterWinningNumbers = (draw) => {
    setSelectedDraw(draw);
    if (draw.winningNumbers) {
      setWinningNumbers(draw.winningNumbers.map(String));
    } else {
      setWinningNumbers(['', '', '', '', '', '']);
    }
    setShowWinningNumbersModal(true);
  };

  const saveWinningNumbers = () => {
    const numbers = winningNumbers.map(n => parseInt(n)).filter(n => !isNaN(n));
    
    if (numbers.length !== 6) {
      addToast('Please enter all 6 winning numbers', 'error');
      return;
    }

    // Update draw with winning numbers
    const updatedDraws = draws.map(d => 
      d.id === selectedDraw.id 
        ? { ...d, winningNumbers: numbers, status: 'completed' }
        : d
    );

    setDraws(updatedDraws);
    setShowWinningNumbersModal(false);
    setWinningNumbers(['', '', '', '', '', '']);
    addToast('Winning numbers saved successfully', 'success');
    loadDraws();
  };

  const handleDeleteDraw = (draw) => {
    setSelectedDraw(draw);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteDraw = () => {
    const updatedDraws = draws.filter(d => d.id !== selectedDraw.id);
    setDraws(updatedDraws);
    setShowDeleteConfirm(false);
    setSelectedDraw(null);
    addToast('Draw deleted successfully', 'success');
    loadDraws();
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      scheduled: 'pending',
      completed: 'approved',
      cancelled: 'rejected'
    };
    return <StatusBadge status={statusMap[status] || status} />;
  };

  return (
    <div className="page-container">
      <PageHeader
        title="Draw Management"
        subtitle="Schedule and manage lottery draws"
        actions={
          <button className="btn btn-primary" onClick={() => setShowScheduleModal(true)}>
            <Plus size={18} />
            Schedule New Draw
          </button>
        }
      />

      {/* Statistics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Draws</p>
              <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{stats.totalDraws}</p>
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
              <Calendar size={24} color="#4F46E5" />
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Completed</p>
              <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{stats.completedDraws}</p>
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
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Upcoming</p>
              <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{stats.upcomingDraws}</p>
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
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Prize Pool</p>
              <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{formatCurrency(stats.totalPrizePool)}</p>
            </div>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '12px', 
              backgroundColor: '#FCE7F3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Award size={24} color="#BE185D" />
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Draws - Quick Access */}
      {upcomingDraws.length > 0 && (
        <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem', backgroundColor: '#EEF2FF', border: '1px solid #C7D2FE' }}>
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={20} color="#4F46E5" />
            Upcoming Draws - Quick Actions
          </h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {upcomingDraws.slice(0, 3).map(draw => (
              <div key={draw.id} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '1rem',
                backgroundColor: 'white',
                borderRadius: '8px'
              }}>
                <div>
                  <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{draw.gameName}</p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    {formatDateTime(draw.drawDate)} • {formatCurrency(draw.prizePool)} Prize Pool
                  </p>
                </div>
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => handleTriggerDraw(draw)}
                >
                  <Play size={16} />
                  Trigger Draw
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Draws Table */}
      <div className="card">
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-light)' }}>
          <h3>All Draws</h3>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Draw ID</th>
                <th>Game Name</th>
                <th>Draw Date & Time</th>
                <th>Status</th>
                <th>Prize Pool</th>
                <th>Tickets Sold</th>
                <th>Winning Numbers</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {draws.map(draw => (
                <tr key={draw.id}>
                  <td>{draw.id}</td>
                  <td style={{ fontWeight: 600 }}>{draw.gameName}</td>
                  <td>{formatDateTime(draw.drawDate)}</td>
                  <td>{getStatusBadge(draw.status)}</td>
                  <td style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                    {formatCurrency(draw.prizePool)}
                  </td>
                  <td>
                    <div>
                      <span style={{ fontWeight: 600 }}>{draw.ticketsSold.toLocaleString()}</span>
                      <span style={{ color: 'var(--text-secondary)' }}> / {draw.maxTickets.toLocaleString()}</span>
                    </div>
                    <div style={{ 
                      width: '100%', 
                      height: '4px', 
                      backgroundColor: 'var(--bg-hover)', 
                      borderRadius: '2px',
                      marginTop: '4px'
                    }}>
                      <div style={{
                        width: `${(draw.ticketsSold / draw.maxTickets) * 100}%`,
                        height: '100%',
                        backgroundColor: 'var(--status-success)',
                        borderRadius: '2px'
                      }} />
                    </div>
                  </td>
                  <td>
                    {draw.winningNumbers ? (
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        {draw.winningNumbers.map((num, idx) => (
                          <span key={idx} style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '32px',
                            height: '32px',
                            backgroundColor: 'var(--color-primary)',
                            color: 'white',
                            borderRadius: '50%',
                            fontSize: '0.75rem',
                            fontWeight: 700
                          }}>
                            {num}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span style={{ color: 'var(--text-muted)' }}>Not drawn yet</span>
                    )}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {draw.status === 'scheduled' && (
                        <button
                          className="action-btn action-btn-activate"
                          onClick={() => handleTriggerDraw(draw)}
                          title="Trigger Draw"
                        >
                          <Play size={14} />
                          <span>Trigger</span>
                        </button>
                      )}
                      <button
                        className="action-btn action-btn-edit"
                        onClick={() => handleEnterWinningNumbers(draw)}
                        title="Enter/Edit Winning Numbers"
                      >
                        <Edit size={14} />
                        <span>Numbers</span>
                      </button>
                      {draw.status === 'scheduled' && (
                        <button
                          className="action-btn action-btn-delete"
                          onClick={() => handleDeleteDraw(draw)}
                          title="Delete Draw"
                        >
                          <Trash2 size={14} />
                          <span>Delete</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Schedule Draw Modal */}
      <Modal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        title="Schedule New Draw"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
              Game Name *
            </label>
            <input
              type="text"
              value={scheduleForm.gameName}
              onChange={(e) => setScheduleForm({ ...scheduleForm, gameName: e.target.value })}
              placeholder="e.g., Super Jackpot"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Draw Date *
              </label>
              <input
                type="date"
                value={scheduleForm.drawDate}
                onChange={(e) => setScheduleForm({ ...scheduleForm, drawDate: e.target.value })}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Draw Time *
              </label>
              <input
                type="time"
                value={scheduleForm.drawTime}
                onChange={(e) => setScheduleForm({ ...scheduleForm, drawTime: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Ticket Price (₹)
              </label>
              <input
                type="number"
                value={scheduleForm.ticketPrice}
                onChange={(e) => setScheduleForm({ ...scheduleForm, ticketPrice: e.target.value })}
                placeholder="100"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Prize Pool (₹)
              </label>
              <input
                type="number"
                value={scheduleForm.prizePool}
                onChange={(e) => setScheduleForm({ ...scheduleForm, prizePool: e.target.value })}
                placeholder="5000000"
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
              Max Tickets
            </label>
            <input
              type="number"
              value={scheduleForm.maxTickets}
              onChange={(e) => setScheduleForm({ ...scheduleForm, maxTickets: e.target.value })}
              placeholder="50000"
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
            <button 
              className="btn btn-secondary" 
              onClick={() => setShowScheduleModal(false)}
              style={{ flex: 1 }}
            >
              Cancel
            </button>
            <button 
              className="btn btn-primary" 
              onClick={handleScheduleDraw}
              style={{ flex: 1 }}
            >
              Schedule Draw
            </button>
          </div>
        </div>
      </Modal>

      {/* Trigger Draw Modal */}
      <Modal
        isOpen={showTriggerModal}
        onClose={() => setShowTriggerModal(false)}
        title="Trigger Draw"
      >
        {selectedDraw && (
          <div>
            <div style={{ 
              padding: '1rem', 
              backgroundColor: 'var(--bg-hover)', 
              borderRadius: '8px',
              marginBottom: '1.5rem'
            }}>
              <h4 style={{ marginBottom: '0.5rem' }}>{selectedDraw.gameName}</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Draw ID: {selectedDraw.id}
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Scheduled: {formatDateTime(selectedDraw.drawDate)}
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Tickets Sold: {selectedDraw.ticketsSold.toLocaleString()}
              </p>
            </div>

            <p style={{ marginBottom: '1.5rem' }}>
              Are you sure you want to trigger this draw? This action will select winning numbers randomly and complete the draw.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button 
                className="btn btn-secondary" 
                onClick={() => setShowTriggerModal(false)}
                style={{ flex: 1 }}
              >
                Cancel
              </button>
              <button 
                className="btn btn-success" 
                onClick={confirmTriggerDraw}
                style={{ flex: 1 }}
              >
                <Play size={18} />
                Trigger Draw
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Winning Numbers Modal */}
      <Modal
        isOpen={showWinningNumbersModal}
        onClose={() => setShowWinningNumbersModal(false)}
        title="Enter Winning Numbers"
      >
        {selectedDraw && (
          <div>
            <div style={{ 
              padding: '1rem', 
              backgroundColor: 'var(--bg-hover)', 
              borderRadius: '8px',
              marginBottom: '1.5rem'
            }}>
              <h4 style={{ marginBottom: '0.5rem' }}>{selectedDraw.gameName}</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Draw ID: {selectedDraw.id}
              </p>
            </div>

            <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 500 }}>
              Enter 6 Winning Numbers (1-99)
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {winningNumbers.map((num, index) => (
                <input
                  key={index}
                  type="number"
                  min="1"
                  max="99"
                  value={num}
                  onChange={(e) => {
                    const newNumbers = [...winningNumbers];
                    newNumbers[index] = e.target.value;
                    setWinningNumbers(newNumbers);
                  }}
                  placeholder={`#${index + 1}`}
                  style={{ textAlign: 'center', fontSize: '1.25rem', fontWeight: 700 }}
                />
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button 
                className="btn btn-secondary" 
                onClick={() => setShowWinningNumbersModal(false)}
                style={{ flex: 1 }}
              >
                Cancel
              </button>
              <button 
                className="btn btn-success" 
                onClick={saveWinningNumbers}
                style={{ flex: 1 }}
              >
                <CheckCircle size={18} />
                Save Numbers
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDeleteDraw}
        title="Delete Draw"
        message={`Are you sure you want to delete draw "${selectedDraw?.gameName}"? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
};

export default DrawManagement;
