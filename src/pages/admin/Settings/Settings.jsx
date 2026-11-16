// ===================================
// SETTINGS PAGE
// Application configuration and preferences
// ===================================

import { useState, useEffect } from 'react';
import { Save, RotateCcw } from 'lucide-react';
import { PageHeader } from '../../../admin/components';
import { getSettings, saveSettings } from '../../../admin/utils/storage';
import { defaultSettings } from '../../../admin/data/demoData';
import { useToast } from '../../../admin/hooks/useToast';

const Settings = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [hasChanges, setHasChanges] = useState(false);
  const { success, error } = useToast();

  useEffect(() => {
    const loaded = getSettings(defaultSettings);
    setSettings(loaded);
  }, []);

  const handleChange = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: { ...prev[section], [key]: value }
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    saveSettings(settings);
    setHasChanges(false);
    success('Settings saved successfully!');
  };

  const handleReset = () => {
    setSettings(defaultSettings);
    setHasChanges(true);
  };

  return (
    <div className="page-container">
      <PageHeader
        title="Settings"
        subtitle="Configure application preferences and limits"
        actions={
          <>
            <button className="btn btn-secondary" onClick={handleReset}>
              <RotateCcw size={18} />
              Reset to Default
            </button>
            <button className="btn btn-primary" onClick={handleSave} disabled={!hasChanges}>
              <Save size={18} />
              Save Changes
            </button>
          </>
        }
      />

      <div className="card" style={{ padding: 'var(--spacing-lg)', marginBottom: 'var(--spacing-lg)', backgroundColor: '#FEF3C7', border: '1px solid #FCD34D' }}>
        <p style={{ fontSize: '0.875rem', color: '#78350F', margin: 0 }}>
          <strong>Demo Note:</strong> These settings only affect the frontend demonstration. 
          Real applications require server-side validation and enforcement of all limits and rules.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
        {/* General Settings */}
        <div className="card">
          <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>General Settings</h3>
          <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Application Name</label>
              <input type="text" value={settings.general.applicationName} onChange={(e) => handleChange('general', 'applicationName', e.target.value)} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Support Email</label>
              <input type="email" value={settings.general.supportEmail} onChange={(e) => handleChange('general', 'supportEmail', e.target.value)} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Support Phone</label>
              <input type="tel" value={settings.general.supportPhone} onChange={(e) => handleChange('general', 'supportPhone', e.target.value)} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Currency</label>
                <input type="text" value={settings.general.currency} onChange={(e) => handleChange('general', 'currency', e.target.value)} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Timezone</label>
                <input type="text" value={settings.general.timezone} onChange={(e) => handleChange('general', 'timezone', e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        {/* Deposit Settings */}
        <div className="card">
          <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>Deposit Settings</h3>
          <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Minimum Amount</label>
                <input type="number" value={settings.deposit.minAmount} onChange={(e) => handleChange('deposit', 'minAmount', Number(e.target.value))} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Maximum Amount</label>
                <input type="number" value={settings.deposit.maxAmount} onChange={(e) => handleChange('deposit', 'maxAmount', Number(e.target.value))} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <input type="checkbox" id="depositEnabled" checked={settings.deposit.enabled} onChange={(e) => handleChange('deposit', 'enabled', e.target.checked)} style={{ width: 'auto' }} />
              <label htmlFor="depositEnabled" style={{ margin: 0, cursor: 'pointer' }}>Enable Deposits</label>
            </div>
          </div>
        </div>

        {/* Withdrawal Settings */}
        <div className="card">
          <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>Withdrawal Settings</h3>
          <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Minimum Amount</label>
                <input type="number" value={settings.withdrawal.minAmount} onChange={(e) => handleChange('withdrawal', 'minAmount', Number(e.target.value))} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Maximum Amount</label>
                <input type="number" value={settings.withdrawal.maxAmount} onChange={(e) => handleChange('withdrawal', 'maxAmount', Number(e.target.value))} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Service Fee Type</label>
              <select value={settings.withdrawal.serviceFeeType} onChange={(e) => handleChange('withdrawal', 'serviceFeeType', e.target.value)}>
                <option value="fixed">Fixed Amount</option>
                <option value="percentage">Percentage</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Service Fee Value {settings.withdrawal.serviceFeeType === 'percentage' ? '(%)' : '($)'}
              </label>
              <input type="number" value={settings.withdrawal.serviceFeeValue} onChange={(e) => handleChange('withdrawal', 'serviceFeeValue', Number(e.target.value))} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <input type="checkbox" id="withdrawalEnabled" checked={settings.withdrawal.enabled} onChange={(e) => handleChange('withdrawal', 'enabled', e.target.checked)} style={{ width: 'auto' }} />
              <label htmlFor="withdrawalEnabled" style={{ margin: 0, cursor: 'pointer' }}>Enable Withdrawals</label>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="card">
          <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>Account Settings</h3>
          <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <input type="checkbox" id="regEnabled" checked={settings.account.registrationEnabled} onChange={(e) => handleChange('account', 'registrationEnabled', e.target.checked)} style={{ width: 'auto' }} />
              <label htmlFor="regEnabled" style={{ margin: 0, cursor: 'pointer' }}>Enable New Registrations</label>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Default User Status</label>
              <select value={settings.account.defaultUserStatus} onChange={(e) => handleChange('account', 'defaultUserStatus', e.target.value)}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <input type="checkbox" id="maintenance" checked={settings.account.maintenanceMode} onChange={(e) => handleChange('account', 'maintenanceMode', e.target.checked)} style={{ width: 'auto' }} />
              <label htmlFor="maintenance" style={{ margin: 0, cursor: 'pointer' }}>Maintenance Mode</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
