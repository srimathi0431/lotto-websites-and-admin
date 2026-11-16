// ===================================
// UTILITY HELPER FUNCTIONS
// ===================================

// Format currency in USD
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Format date
export const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

// Format date and time
export const formatDateTime = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Format relative time (e.g., "2 hours ago")
export const formatRelativeTime = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  return formatDate(dateString);
};

// Get initials from name
export const getInitials = (name) => {
  if (!name) return '?';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

// Get status badge class
export const getStatusBadgeClass = (status) => {
  const statusMap = {
    active: 'badge-success',
    inactive: 'badge-inactive',
    pending: 'badge-warning',
    approved: 'badge-success',
    rejected: 'badge-danger',
    paid: 'badge-success',
    completed: 'badge-success',
    processing: 'badge-info',
    failed: 'badge-danger',
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-danger',
    info: 'badge-info'
  };
  return statusMap[status?.toLowerCase()] || 'badge-info';
};

// Calculate percentage change
export const calculatePercentageChange = (current, previous) => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

// Generate unique ID
export const generateId = (prefix = 'ID') => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7);
  return `${prefix}${timestamp}${random}`.toUpperCase();
};

// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate mobile number (Indian format)
export const isValidMobile = (mobile) => {
  const mobileRegex = /^(\+91[\s]?)?[6-9]\d{9}$/;
  return mobileRegex.test(mobile.replace(/[\s-]/g, ''));
};

// Format mobile number
export const formatMobile = (mobile) => {
  if (!mobile) return '';
  const cleaned = mobile.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91 ${cleaned.substring(0, 5)} ${cleaned.substring(5)}`;
  }
  if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return `+91 ${cleaned.substring(2, 7)} ${cleaned.substring(7)}`;
  }
  return mobile;
};

// Truncate text
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Sort array of objects
export const sortData = (data, key, direction = 'asc') => {
  return [...data].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (typeof aVal === 'string') {
      return direction === 'asc' 
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }
    
    return direction === 'asc' 
      ? aVal - bVal
      : bVal - aVal;
  });
};

// Filter data by search query
export const filterBySearch = (data, query, fields) => {
  if (!query) return data;
  const lowerQuery = query.toLowerCase();
  
  return data.filter(item => {
    return fields.some(field => {
      const value = item[field];
      return value && value.toString().toLowerCase().includes(lowerQuery);
    });
  });
};

// Paginate data
export const paginateData = (data, page, pageSize) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return data.slice(startIndex, endIndex);
};

// Calculate total pages
export const getTotalPages = (totalItems, pageSize) => {
  return Math.ceil(totalItems / pageSize);
};

// Export to CSV
export const exportToCSV = (data, filename = 'export.csv') => {
  if (!data || data.length === 0) {
    return;
  }

  // Get headers from the first object
  const headers = Object.keys(data[0]);
  
  // Create CSV content
  const csvContent = [
    headers.join(','), // Header row
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escape values containing commas or quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Debounce function
export const debounce = (func, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Deep clone object
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// Calculate service fee
export const calculateServiceFee = (amount, feeType, feeValue) => {
  if (feeType === 'percentage') {
    return (amount * feeValue) / 100;
  }
  return feeValue;
};

// Calculate net payable amount
export const calculateNetPayable = (amount, serviceFee) => {
  return amount - serviceFee;
};

// Mask account details
export const maskAccountDetails = (details) => {
  if (!details) return '';
  if (details.length <= 4) return details;
  return 'XXXX' + details.slice(-4);
};

// Get date range for filters
export const getDateRange = (range) => {
  const today = new Date();
  const startDate = new Date();
  
  switch(range) {
    case 'today':
      startDate.setHours(0, 0, 0, 0);
      break;
    case 'yesterday':
      startDate.setDate(today.getDate() - 1);
      startDate.setHours(0, 0, 0, 0);
      break;
    case 'last7days':
      startDate.setDate(today.getDate() - 7);
      break;
    case 'last30days':
      startDate.setDate(today.getDate() - 30);
      break;
    case 'thisMonth':
      startDate.setDate(1);
      startDate.setHours(0, 0, 0, 0);
      break;
    case 'lastMonth':
      startDate.setMonth(today.getMonth() - 1);
      startDate.setDate(1);
      startDate.setHours(0, 0, 0, 0);
      break;
    default:
      return null;
  }
  
  return { startDate, endDate: today };
};

// Check if date is in range
export const isDateInRange = (dateString, startDate, endDate) => {
  if (!dateString) return false;
  const date = new Date(dateString);
  return date >= startDate && date <= endDate;
};

// Calculate statistics from array
export const calculateStats = (data, key) => {
  if (!data || data.length === 0) return { total: 0, average: 0, min: 0, max: 0 };
  
  const values = data.map(item => item[key] || 0);
  const total = values.reduce((sum, val) => sum + val, 0);
  const average = total / values.length;
  const min = Math.min(...values);
  const max = Math.max(...values);
  
  return { total, average, min, max };
};

// Group data by key
export const groupBy = (data, key) => {
  return data.reduce((groups, item) => {
    const value = item[key];
    if (!groups[value]) {
      groups[value] = [];
    }
    groups[value].push(item);
    return groups;
  }, {});
};

// Get current date in YYYY-MM-DD format
export const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Get current time in HH:MM:SS format
export const getCurrentTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

// Get current datetime string
export const getCurrentDateTime = () => {
  return `${getCurrentDate()} ${getCurrentTime()}`;
};
