// ===================================
// LOTTO LINK - DEMO DATA
// Realistic consistent demo data for the admin panel
// ===================================

// Generate demo users
export const demoUsers = [
  {
    id: 'USR001',
    fullName: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    mobile: '+91 98765 43210',
    walletBalance: 25000,
    status: 'active',
    lastLogin: '2026-10-22 09:30:00',
    registrationDate: '2026-10-15',
    avatar: null
  },
  {
    id: 'USR002',
    fullName: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    mobile: '+91 98765 43211',
    walletBalance: 15000,
    status: 'active',
    lastLogin: '2026-10-22 08:15:00',
    registrationDate: '2026-10-16',
    avatar: null
  },
  {
    id: 'USR003',
    fullName: 'Amit Patel',
    email: 'amit.patel@example.com',
    mobile: '+91 98765 43212',
    walletBalance: 8500,
    status: 'active',
    lastLogin: '2026-10-21 18:45:00',
    registrationDate: '2026-10-17',
    avatar: null
  },
  {
    id: 'USR004',
    fullName: 'Sneha Reddy',
    email: 'sneha.reddy@example.com',
    mobile: '+91 98765 43213',
    walletBalance: 32000,
    status: 'active',
    lastLogin: '2026-10-22 07:20:00',
    registrationDate: '2026-10-14',
    avatar: null
  },
  {
    id: 'USR005',
    fullName: 'Vikram Singh',
    email: 'vikram.singh@example.com',
    mobile: '+91 98765 43214',
    walletBalance: 0,
    status: 'inactive',
    lastLogin: '2026-10-10 14:30:00',
    registrationDate: '2026-10-10',
    avatar: null
  },
  {
    id: 'USR006',
    fullName: 'Anita Desai',
    email: 'anita.desai@example.com',
    mobile: '+91 98765 43215',
    walletBalance: 12000,
    status: 'active',
    lastLogin: '2026-10-22 10:00:00',
    registrationDate: '2026-10-18',
    avatar: null
  },
  {
    id: 'USR007',
    fullName: 'Rahul Mehta',
    email: 'rahul.mehta@example.com',
    mobile: '+91 98765 43216',
    walletBalance: 45000,
    status: 'active',
    lastLogin: '2026-10-22 06:45:00',
    registrationDate: '2026-10-12',
    avatar: null
  },
  {
    id: 'USR008',
    fullName: 'Kavita Joshi',
    email: 'kavita.joshi@example.com',
    mobile: '+91 98765 43217',
    walletBalance: 18500,
    status: 'active',
    lastLogin: '2026-10-21 22:30:00',
    registrationDate: '2026-10-19',
    avatar: null
  },
  {
    id: 'USR009',
    fullName: 'Suresh Nair',
    email: 'suresh.nair@example.com',
    mobile: '+91 98765 43218',
    walletBalance: 5000,
    status: 'inactive',
    lastLogin: '2026-10-08 11:15:00',
    registrationDate: '2026-10-08',
    avatar: null
  },
  {
    id: 'USR010',
    fullName: 'Deepa Iyer',
    email: 'deepa.iyer@example.com',
    mobile: '+91 98765 43219',
    walletBalance: 28000,
    status: 'active',
    lastLogin: '2026-10-22 09:00:00',
    registrationDate: '2026-10-20',
    avatar: null
  }
];

// Generate demo deposits
export const demoDeposits = [
  {
    id: 'DEP001',
    userId: 'USR001',
    userName: 'Rajesh Kumar',
    amount: 5000,
    paymentMethod: 'UPI',
    transactionReference: 'UPI123456789',
    requestDate: '2026-10-22 09:15:00',
    status: 'pending',
    processedDate: null
  },
  {
    id: 'DEP002',
    userId: 'USR002',
    userName: 'Priya Sharma',
    amount: 10000,
    paymentMethod: 'Bank Transfer',
    transactionReference: 'NEFT987654321',
    requestDate: '2026-10-22 08:00:00',
    status: 'approved',
    processedDate: '2026-10-22 08:30:00'
  },
  {
    id: 'DEP003',
    userId: 'USR003',
    userName: 'Amit Patel',
    amount: 3000,
    paymentMethod: 'UPI',
    transactionReference: 'UPI456789123',
    requestDate: '2026-10-22 07:45:00',
    status: 'pending',
    processedDate: null
  },
  {
    id: 'DEP004',
    userId: 'USR004',
    userName: 'Sneha Reddy',
    amount: 15000,
    paymentMethod: 'Bank Transfer',
    transactionReference: 'IMPS741852963',
    requestDate: '2026-10-21 18:30:00',
    status: 'approved',
    processedDate: '2026-10-21 19:00:00'
  },
  {
    id: 'DEP005',
    userId: 'USR006',
    userName: 'Anita Desai',
    amount: 2000,
    paymentMethod: 'UPI',
    transactionReference: 'UPI789123456',
    requestDate: '2026-10-21 16:20:00',
    status: 'rejected',
    processedDate: '2026-10-21 17:00:00',
    rejectionReason: 'Invalid transaction reference'
  },
  {
    id: 'DEP006',
    userId: 'USR007',
    userName: 'Rahul Mehta',
    amount: 20000,
    paymentMethod: 'Bank Transfer',
    transactionReference: 'RTGS369258147',
    requestDate: '2026-10-21 14:10:00',
    status: 'approved',
    processedDate: '2026-10-21 15:30:00'
  },
  {
    id: 'DEP007',
    userId: 'USR008',
    userName: 'Kavita Joshi',
    amount: 7500,
    paymentMethod: 'UPI',
    transactionReference: 'UPI852963741',
    requestDate: '2026-10-22 10:00:00',
    status: 'pending',
    processedDate: null
  }
];

// Generate demo withdrawals
export const demoWithdrawals = [
  {
    id: 'WDR001',
    userId: 'USR001',
    userName: 'Rajesh Kumar',
    requestedAmount: 10000,
    serviceFee: 200,
    netPayable: 9800,
    paymentMethod: 'Bank Transfer',
    accountDetails: 'XXXX1234',
    requestDate: '2026-10-22 09:45:00',
    status: 'pending',
    processedDate: null
  },
  {
    id: 'WDR002',
    userId: 'USR004',
    userName: 'Sneha Reddy',
    requestedAmount: 5000,
    serviceFee: 100,
    netPayable: 4900,
    paymentMethod: 'UPI',
    accountDetails: 'user@upi',
    requestDate: '2026-10-22 08:30:00',
    status: 'approved',
    processedDate: '2026-10-22 09:00:00'
  },
  {
    id: 'WDR003',
    userId: 'USR007',
    userName: 'Rahul Mehta',
    requestedAmount: 15000,
    serviceFee: 300,
    netPayable: 14700,
    paymentMethod: 'Bank Transfer',
    accountDetails: 'XXXX5678',
    requestDate: '2026-10-21 20:15:00',
    status: 'paid',
    processedDate: '2026-10-22 10:00:00'
  },
  {
    id: 'WDR004',
    userId: 'USR002',
    userName: 'Priya Sharma',
    requestedAmount: 3000,
    serviceFee: 60,
    netPayable: 2940,
    paymentMethod: 'UPI',
    accountDetails: 'priya@upi',
    requestDate: '2026-10-21 18:00:00',
    status: 'rejected',
    processedDate: '2026-10-21 19:00:00',
    rejectionReason: 'Insufficient balance verification'
  },
  {
    id: 'WDR005',
    userId: 'USR008',
    userName: 'Kavita Joshi',
    requestedAmount: 8000,
    serviceFee: 160,
    netPayable: 7840,
    paymentMethod: 'Bank Transfer',
    accountDetails: 'XXXX9012',
    requestDate: '2026-10-22 07:30:00',
    status: 'pending',
    processedDate: null
  }
];

// Generate demo transactions
export const demoTransactions = [
  {
    id: 'TXN001',
    userId: 'USR001',
    userName: 'Rajesh Kumar',
    type: 'deposit',
    credit: 5000,
    debit: 0,
    previousBalance: 20000,
    newBalance: 25000,
    dateTime: '2026-10-21 15:30:00',
    status: 'completed',
    remarks: 'Deposit approved - DEP001'
  },
  {
    id: 'TXN002',
    userId: 'USR002',
    userName: 'Priya Sharma',
    type: 'deposit',
    credit: 10000,
    debit: 0,
    previousBalance: 5000,
    newBalance: 15000,
    dateTime: '2026-10-22 08:30:00',
    status: 'completed',
    remarks: 'Deposit approved - DEP002'
  },
  {
    id: 'TXN003',
    userId: 'USR004',
    userName: 'Sneha Reddy',
    type: 'deposit',
    credit: 15000,
    debit: 0,
    previousBalance: 17000,
    newBalance: 32000,
    dateTime: '2026-10-21 19:00:00',
    status: 'completed',
    remarks: 'Deposit approved - DEP004'
  },
  {
    id: 'TXN004',
    userId: 'USR007',
    userName: 'Rahul Mehta',
    type: 'withdrawal',
    credit: 0,
    debit: 15000,
    previousBalance: 60000,
    newBalance: 45000,
    dateTime: '2026-10-22 10:00:00',
    status: 'completed',
    remarks: 'Withdrawal paid - WDR003'
  },
  {
    id: 'TXN005',
    userId: 'USR007',
    userName: 'Rahul Mehta',
    type: 'deposit',
    credit: 20000,
    debit: 0,
    previousBalance: 40000,
    newBalance: 60000,
    dateTime: '2026-10-21 15:30:00',
    status: 'completed',
    remarks: 'Deposit approved - DEP006'
  },
  {
    id: 'TXN006',
    userId: 'USR001',
    userName: 'Rajesh Kumar',
    type: 'balance_credit',
    credit: 5000,
    debit: 0,
    previousBalance: 15000,
    newBalance: 20000,
    dateTime: '2026-10-20 14:00:00',
    status: 'completed',
    remarks: 'Manual balance credit by Admin'
  },
  {
    id: 'TXN007',
    userId: 'USR003',
    userName: 'Amit Patel',
    type: 'balance_credit',
    credit: 3500,
    debit: 0,
    previousBalance: 5000,
    newBalance: 8500,
    dateTime: '2026-10-19 11:30:00',
    status: 'completed',
    remarks: 'Promotional bonus credit'
  }
];

// Generate demo notifications
export const demoNotifications = [
  {
    id: 'NOT001',
    type: 'deposit',
    title: 'New Deposit Request',
    message: 'Rajesh Kumar requested deposit of ₹5,000',
    dateTime: '2026-10-22 09:15:00',
    read: false,
    link: '/deposits'
  },
  {
    id: 'NOT002',
    type: 'withdrawal',
    title: 'New Withdrawal Request',
    message: 'Kavita Joshi requested withdrawal of ₹8,000',
    dateTime: '2026-10-22 07:30:00',
    read: false,
    link: '/withdrawals'
  },
  {
    id: 'NOT003',
    type: 'user',
    title: 'New User Registration',
    message: 'Deepa Iyer registered successfully',
    dateTime: '2026-10-20 16:45:00',
    read: true,
    link: '/users'
  },
  {
    id: 'NOT004',
    type: 'deposit',
    title: 'New Deposit Request',
    message: 'Amit Patel requested deposit of ₹3,000',
    dateTime: '2026-10-22 07:45:00',
    read: false,
    link: '/deposits'
  },
  {
    id: 'NOT005',
    type: 'withdrawal',
    title: 'New Withdrawal Request',
    message: 'Rajesh Kumar requested withdrawal of ₹10,000',
    dateTime: '2026-10-22 09:45:00',
    read: false,
    link: '/withdrawals'
  },
  {
    id: 'NOT006',
    type: 'user',
    title: 'New User Registration',
    message: 'Kavita Joshi registered successfully',
    dateTime: '2026-10-19 10:20:00',
    read: true,
    link: '/users'
  }
];

// Generate demo admins
export const demoAdmins = [
  {
    id: 'ADM001',
    fullName: 'Admin',
    email: 'admin@lottolink.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2026-10-22 10:30:00',
    createdDate: '2026-10-01',
    avatar: null
  },
  {
    id: 'ADM002',
    fullName: 'Finance Manager',
    email: 'finance@lottolink.com',
    role: 'Finance Admin',
    status: 'active',
    lastLogin: '2026-10-22 09:00:00',
    createdDate: '2026-10-05',
    avatar: null
  },
  {
    id: 'ADM003',
    fullName: 'Support Lead',
    email: 'support@lottolink.com',
    role: 'Support Admin',
    status: 'active',
    lastLogin: '2026-10-21 18:30:00',
    createdDate: '2026-10-10',
    avatar: null
  }
];

// Generate demo activity logs
export const demoActivityLogs = [
  {
    id: 'ACT001',
    adminName: 'Admin',
    action: 'Deposit Approved',
    target: 'DEP002',
    description: 'Approved deposit of ₹10,000 for Priya Sharma',
    dateTime: '2026-10-22 08:30:00',
    status: 'success'
  },
  {
    id: 'ACT002',
    adminName: 'Admin',
    action: 'Balance Added',
    target: 'USR001',
    description: 'Added ₹5,000 to Rajesh Kumar wallet',
    dateTime: '2026-10-20 14:00:00',
    status: 'success'
  },
  {
    id: 'ACT003',
    adminName: 'Finance Manager',
    action: 'Withdrawal Approved',
    target: 'WDR003',
    description: 'Approved withdrawal of ₹15,000 for Rahul Mehta',
    dateTime: '2026-10-22 10:00:00',
    status: 'success'
  },
  {
    id: 'ACT004',
    adminName: 'Admin',
    action: 'Deposit Rejected',
    target: 'DEP005',
    description: 'Rejected deposit of ₹2,000 for Anita Desai',
    dateTime: '2026-10-21 17:00:00',
    status: 'warning'
  },
  {
    id: 'ACT005',
    adminName: 'Support Lead',
    action: 'User Status Changed',
    target: 'USR005',
    description: 'Changed Vikram Singh status to inactive',
    dateTime: '2026-10-20 11:30:00',
    status: 'info'
  },
  {
    id: 'ACT006',
    adminName: 'Admin',
    action: 'Settings Updated',
    target: 'Withdrawal Settings',
    description: 'Updated service fee to 2%',
    dateTime: '2026-10-19 15:45:00',
    status: 'success'
  }
];

// Default settings
export const defaultSettings = {
  general: {
    applicationName: 'Lotto Link',
    supportEmail: 'support@lottolink.com',
    supportPhone: '+1 800 123 4567',
    currency: 'USD',
    timezone: 'America/New_York'
  },
  deposit: {
    minAmount: 100,
    maxAmount: 100000,
    enabled: true
  },
  withdrawal: {
    minAmount: 500,
    maxAmount: 50000,
    serviceFeeType: 'percentage', // 'fixed' or 'percentage'
    serviceFeeValue: 2,
    enabled: true
  },
  account: {
    registrationEnabled: true,
    defaultUserStatus: 'active',
    maintenanceMode: false
  }
};

// Initial demo credentials
export const demoCredentials = {
  email: 'admin@lottolink.com',
  password: '12345678'
};
