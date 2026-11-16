// ===================================
// ADMIN PROFILE PAGE
// Edit admin profile and change password
// ===================================

import { useState, useEffect } from 'react';
import { Save, Eye, EyeOff, User } from 'lucide-react';
import { PageHeader } from '../../components';
import { getAdminProfile, updateAdminProfile } from '../../utils/storage';
import { getInitials } from '../../utils/helpers';
import { useToast } from '../../hooks/useToast';

const Profile = () => {
  const [profile, setProfile] = useState({ fullName: '', email: '', phone: '', role: 'Super Admin' });
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
  const { success, error } = useToast();

  useEffect(() => {
    const loaded = getAdminProfile();
    if (loaded) setProfile(loaded);
  }, []);

  const handleProfileSave = () => {
    if (!profile.fullName || !profile.email || !profile.phone) {
      error('Please fill all required fields');
      return;
    }
    updateAdminProfile(profile);
    success('Profile updated successfully!');
  };

  const handlePasswordChange = () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      error('Please fill all password fields');
      return;
    }
    if (passwords.new !== passwords.confirm) {
      error('New passwords do not match');
      return;
    }
    if (passwords.new.length < 8) {
      error('Password must be at least 8 characters');
      return;
    }
    setPasswords({ current: '', new: '', confirm: '' });
    success('Password changed successfully! (Demo only - no real password is changed)');
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    const length = password.length;
    if (length < 6) return { strength: 1, label: 'Weak', color: '#EF4444' };
    if (length < 10) return { strength: 2, label: 'Medium', color: '#F59E0B' };
    return { strength: 3, label: 'Strong', color: '#10B981' };
  };

  const passwordStrength = getPasswordStrength(passwords.new);

  return (
    <div className="page-container">
      <PageHeader title="Admin Profile" subtitle="Manage your account information and security" />

      <div className="card" style={{ padding: 'var(--spacing-lg)', marginBottom: 'var(--spacing-lg)', backgroundColor: '#FEF3C7', border: '1px solid #FCD34D' }}>
        <p style={{ fontSize: '0.875rem', color: '#78350F', margin: 0 }}>
          <strong>Demo Note:</strong> Profile changes are stored locally. Password changes are UI demonstrations only 
          and do not modify any real credentials or affect authentication.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 'var(--spacing-xl)' }}>
        {/* Profile Information */}
        <div className="card">
          <div style={{ textAlign: 'center', paddingBottom: 'var(--spacing-lg)', borderBottom: '1px solid var(--border-light)', marginBottom: 'var(--spacing-lg)' }}>
            <div style={{
              width: '100px',
              height: '100px',
              margin: '0 auto var(--spacing-md)',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-purple))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 700,
              fontSize: '2.5rem'
            }}>
              {getInitials(profile.fullName || 'Admin')}
            </div>
            <h3 style={{ marginBottom: '0.5rem' }}>{profile.fullName || 'Admin'}</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{profile.role}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Full Name *</label>
              <input type="text" value={profile.fullName} onChange={(e) => setProfile({ ...profile, fullName: e.target.value })} placeholder="Enter your full name" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email Address *</label>
              <input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} placeholder="Enter your email" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Phone Number *</label>
              <input type="tel" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} placeholder="Enter your phone number" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Role</label>
              <input type="text" value={profile.role} disabled style={{ backgroundColor: 'var(--bg-hover)', cursor: 'not-allowed' }} />
            </div>
            <button className="btn btn-primary" onClick={handleProfileSave} style={{ marginTop: 'var(--spacing-md)' }}>
              <Save size={18} />
              Save Profile
            </button>
          </div>
        </div>

        {/* Change Password */}
        <div className="card">
          <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>Change Password</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Current Password *</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPasswords.current ? 'text' : 'password'}
                  value={passwords.current}
                  onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                  placeholder="Enter current password"
                  style={{ paddingRight: '2.5rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                  style={{
                    position: 'absolute',
                    right: '0.875rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-muted)',
                    padding: '0.25rem',
                    display: 'flex'
                  }}
                >
                  {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>New Password *</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPasswords.new ? 'text' : 'password'}
                  value={passwords.new}
                  onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                  placeholder="Enter new password"
                  style={{ paddingRight: '2.5rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                  style={{
                    position: 'absolute',
                    right: '0.875rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-muted)',
                    padding: '0.25rem',
                    display: 'flex'
                  }}
                >
                  {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {passwords.new && (
                <div style={{ marginTop: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <div style={{ flex: 1, height: '4px', backgroundColor: 'var(--border-color)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                      <div style={{ width: `${(passwordStrength.strength / 3) * 100}%`, height: '100%', backgroundColor: passwordStrength.color, transition: 'width 0.3s' }} />
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 500, color: passwordStrength.color }}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
                    Password must be at least 8 characters
                  </p>
                </div>
              )}
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Confirm New Password *</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPasswords.confirm ? 'text' : 'password'}
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                  placeholder="Confirm new password"
                  style={{ paddingRight: '2.5rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                  style={{
                    position: 'absolute',
                    right: '0.875rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-muted)',
                    padding: '0.25rem',
                    display: 'flex'
                  }}
                >
                  {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button className="btn btn-purple" onClick={handlePasswordChange} style={{ marginTop: 'var(--spacing-md)' }}>
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
