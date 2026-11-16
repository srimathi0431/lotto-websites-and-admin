// ===================================
// NOTIFICATIONS PAGE
// Notification center with read/unread management
// ===================================

import { useState, useEffect } from 'react';
import { Bell, Check, CheckCheck, Trash2, Filter } from 'lucide-react';
import { PageHeader, StatusBadge, EmptyState } from '../../../admin/components';
import { getNotifications, markNotificationAsRead, markAllNotificationsAsRead, deleteNotification } from '../../../admin/utils/storage';
import { demoNotifications } from '../../../admin/data/demoData';
import { formatRelativeTime } from '../../../admin/utils/helpers';
import { useToast } from '../../../admin/hooks/useToast';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const { success } = useToast();

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = () => {
    const loaded = getNotifications(demoNotifications);
    setNotifications(loaded);
  };

  const handleMarkAsRead = (id) => {
    markNotificationAsRead(id, notifications);
    loadNotifications();
    success('Notification marked as read');
  };

  const handleMarkAllAsRead = () => {
    markAllNotificationsAsRead(notifications);
    loadNotifications();
    success('All notifications marked as read');
  };

  const handleDelete = (id) => {
    deleteNotification(id, notifications);
    loadNotifications();
    success('Notification deleted');
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'read') return n.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIconColor = (type) => {
    const colors = { deposit: '#10B981', withdrawal: '#8B5CF6', user: '#4F46E5' };
    return colors[type] || '#06B6D4';
  };

  return (
    <div className="page-container">
      <PageHeader
        title="Notifications"
        subtitle={`${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`}
        actions={
          <button className="btn btn-primary btn-sm" onClick={handleMarkAllAsRead} disabled={unreadCount === 0}>
            <CheckCheck size={18} />
            Mark All as Read
          </button>
        }
      />

      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: 'var(--spacing-lg)', flexWrap: 'wrap' }}>
        {['all', 'unread', 'read'].map(f => (
          <button
            key={f}
            className={`btn ${filter === f ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            {f === 'unread' && unreadCount > 0 && ` (${unreadCount})`}
          </button>
        ))}
      </div>

      {filteredNotifications.length === 0 ? (
        <EmptyState icon={Bell} title="No notifications" description={filter === 'all' ? 'You have no notifications yet.' : `No ${filter} notifications found.`} />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
          {filteredNotifications.map(notification => (
            <div
              key={notification.id}
              className="card"
              style={{
                padding: 'var(--spacing-lg)',
                backgroundColor: notification.read ? 'var(--bg-card)' : '#F0F9FF',
                borderLeft: `4px solid ${getIconColor(notification.type)}`,
                cursor: 'pointer'
              }}
              onClick={() => !notification.read && handleMarkAsRead(notification.id)}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-md)' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: `${getIconColor(notification.type)}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: getIconColor(notification.type),
                  flexShrink: 0
                }}>
                  <Bell size={20} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>{notification.title}</h4>
                    {!notification.read && (
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', flexShrink: 0, marginLeft: '0.5rem' }} />
                    )}
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                    {notification.message}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {formatRelativeTime(notification.dateTime)}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                  {!notification.read && (
                    <button className="btn btn-secondary btn-sm btn-icon" onClick={(e) => { e.stopPropagation(); handleMarkAsRead(notification.id); }} title="Mark as read">
                      <Check size={16} />
                    </button>
                  )}
                  <button className="btn btn-danger btn-sm btn-icon" onClick={(e) => { e.stopPropagation(); handleDelete(notification.id); }} title="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
