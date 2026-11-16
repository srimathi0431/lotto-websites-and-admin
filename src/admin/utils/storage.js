// ===================================
// LOCAL STORAGE MANAGEMENT
// Demo data persistence using localStorage
// ===================================

const STORAGE_KEYS = {
  USERS: 'lottolink_users',
  DEPOSITS: 'lottolink_deposits',
  WITHDRAWALS: 'lottolink_withdrawals',
  TRANSACTIONS: 'lottolink_transactions',
  NOTIFICATIONS: 'lottolink_notifications',
  ADMINS: 'lottolink_admins',
  ACTIVITY_LOGS: 'lottolink_activity_logs',
  SETTINGS: 'lottolink_settings',
  AUTH: 'lottolink_auth',
  ADMIN_PROFILE: 'lottolink_admin_profile'
};

// Generic get from localStorage
export const getFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

// Generic save to localStorage
export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
    return false;
  }
};

// Generic remove from localStorage
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
    return false;
  }
};

// Clear all app data
export const clearAllStorage = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

// === User Management ===
export const getUsers = (defaultUsers = []) => {
  return getFromStorage(STORAGE_KEYS.USERS, defaultUsers);
};

export const saveUsers = (users) => {
  return saveToStorage(STORAGE_KEYS.USERS, users);
};

export const getUserById = (userId, defaultUsers = []) => {
  const users = getUsers(defaultUsers);
  return users.find(user => user.id === userId);
};

export const updateUser = (userId, updates, defaultUsers = []) => {
  const users = getUsers(defaultUsers);
  const index = users.findIndex(user => user.id === userId);
  if (index !== -1) {
    users[index] = { ...users[index], ...updates };
    saveUsers(users);
    return users[index];
  }
  return null;
};

export const addUser = (user, defaultUsers = []) => {
  const users = getUsers(defaultUsers);
  users.push(user);
  saveUsers(users);
  return user;
};

export const deleteUser = (userId, defaultUsers = []) => {
  const users = getUsers(defaultUsers);
  const filtered = users.filter(user => user.id !== userId);
  saveUsers(filtered);
  return true;
};

// === Deposit Management ===
export const getDeposits = (defaultDeposits = []) => {
  return getFromStorage(STORAGE_KEYS.DEPOSITS, defaultDeposits);
};

export const saveDeposits = (deposits) => {
  return saveToStorage(STORAGE_KEYS.DEPOSITS, deposits);
};

export const getDepositById = (depositId, defaultDeposits = []) => {
  const deposits = getDeposits(defaultDeposits);
  return deposits.find(deposit => deposit.id === depositId);
};

export const updateDeposit = (depositId, updates, defaultDeposits = []) => {
  const deposits = getDeposits(defaultDeposits);
  const index = deposits.findIndex(deposit => deposit.id === depositId);
  if (index !== -1) {
    deposits[index] = { ...deposits[index], ...updates };
    saveDeposits(deposits);
    return deposits[index];
  }
  return null;
};

// === Withdrawal Management ===
export const getWithdrawals = (defaultWithdrawals = []) => {
  return getFromStorage(STORAGE_KEYS.WITHDRAWALS, defaultWithdrawals);
};

export const saveWithdrawals = (withdrawals) => {
  return saveToStorage(STORAGE_KEYS.WITHDRAWALS, withdrawals);
};

export const getWithdrawalById = (withdrawalId, defaultWithdrawals = []) => {
  const withdrawals = getWithdrawals(defaultWithdrawals);
  return withdrawals.find(withdrawal => withdrawal.id === withdrawalId);
};

export const updateWithdrawal = (withdrawalId, updates, defaultWithdrawals = []) => {
  const withdrawals = getWithdrawals(defaultWithdrawals);
  const index = withdrawals.findIndex(withdrawal => withdrawal.id === withdrawalId);
  if (index !== -1) {
    withdrawals[index] = { ...withdrawals[index], ...updates };
    saveWithdrawals(withdrawals);
    return withdrawals[index];
  }
  return null;
};

// === Transaction Management ===
export const getTransactions = (defaultTransactions = []) => {
  return getFromStorage(STORAGE_KEYS.TRANSACTIONS, defaultTransactions);
};

export const saveTransactions = (transactions) => {
  return saveToStorage(STORAGE_KEYS.TRANSACTIONS, transactions);
};

export const addTransaction = (transaction, defaultTransactions = []) => {
  const transactions = getTransactions(defaultTransactions);
  transactions.unshift(transaction); // Add to beginning
  saveTransactions(transactions);
  return transaction;
};

// === Notification Management ===
export const getNotifications = (defaultNotifications = []) => {
  return getFromStorage(STORAGE_KEYS.NOTIFICATIONS, defaultNotifications);
};

export const saveNotifications = (notifications) => {
  return saveToStorage(STORAGE_KEYS.NOTIFICATIONS, notifications);
};

export const markNotificationAsRead = (notificationId, defaultNotifications = []) => {
  const notifications = getNotifications(defaultNotifications);
  const index = notifications.findIndex(notif => notif.id === notificationId);
  if (index !== -1) {
    notifications[index].read = true;
    saveNotifications(notifications);
  }
};

export const markAllNotificationsAsRead = (defaultNotifications = []) => {
  const notifications = getNotifications(defaultNotifications);
  const updated = notifications.map(notif => ({ ...notif, read: true }));
  saveNotifications(updated);
};

export const deleteNotification = (notificationId, defaultNotifications = []) => {
  const notifications = getNotifications(defaultNotifications);
  const filtered = notifications.filter(notif => notif.id !== notificationId);
  saveNotifications(filtered);
};

export const addNotification = (notification, defaultNotifications = []) => {
  const notifications = getNotifications(defaultNotifications);
  notifications.unshift(notification);
  saveNotifications(notifications);
  return notification;
};

// === Admin Management ===
export const getAdmins = (defaultAdmins = []) => {
  return getFromStorage(STORAGE_KEYS.ADMINS, defaultAdmins);
};

export const saveAdmins = (admins) => {
  return saveToStorage(STORAGE_KEYS.ADMINS, admins);
};

// === Activity Logs ===
export const getActivityLogs = (defaultLogs = []) => {
  return getFromStorage(STORAGE_KEYS.ACTIVITY_LOGS, defaultLogs);
};

export const saveActivityLogs = (logs) => {
  return saveToStorage(STORAGE_KEYS.ACTIVITY_LOGS, logs);
};

export const addActivityLog = (log, defaultLogs = []) => {
  const logs = getActivityLogs(defaultLogs);
  logs.unshift(log); // Add to beginning
  saveActivityLogs(logs);
  return log;
};

// === Settings Management ===
export const getSettings = (defaultSettings = {}) => {
  return getFromStorage(STORAGE_KEYS.SETTINGS, defaultSettings);
};

export const saveSettings = (settings) => {
  return saveToStorage(STORAGE_KEYS.SETTINGS, settings);
};

export const updateSettingSection = (section, updates, defaultSettings = {}) => {
  const settings = getSettings(defaultSettings);
  settings[section] = { ...settings[section], ...updates };
  saveSettings(settings);
  return settings;
};

// === Authentication ===
export const getAuthData = () => {
  return getFromStorage(STORAGE_KEYS.AUTH, null);
};

export const saveAuthData = (authData) => {
  return saveToStorage(STORAGE_KEYS.AUTH, authData);
};

export const clearAuthData = () => {
  return removeFromStorage(STORAGE_KEYS.AUTH);
};

export const isAuthenticated = () => {
  const authData = getAuthData();
  return authData && authData.isAuthenticated;
};

// === Admin Profile ===
export const getAdminProfile = () => {
  return getFromStorage(STORAGE_KEYS.ADMIN_PROFILE, null);
};

export const saveAdminProfile = (profile) => {
  return saveToStorage(STORAGE_KEYS.ADMIN_PROFILE, profile);
};

export const updateAdminProfile = (updates) => {
  const profile = getAdminProfile();
  if (profile) {
    const updated = { ...profile, ...updates };
    saveAdminProfile(updated);
    return updated;
  }
  return null;
};

export { STORAGE_KEYS };
