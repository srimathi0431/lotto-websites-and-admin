// ===================================
// ADMIN LOGIN PAGE
// Wrapper for admin login - routes to /adminlogin
// ===================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, Ticket } from 'lucide-react';
import { saveAuthData, saveAdminProfile } from '../admin/utils/storage';
import { demoCredentials } from '../admin/data/demoData';
import '../admin/styles/globals.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // Demo authentication check
      if (email === demoCredentials.email && password === demoCredentials.password) {
        // Save auth data
        saveAuthData({
          isAuthenticated: true,
          email: email,
          loginTime: new Date().toISOString()
        });

        // Save admin profile
        saveAdminProfile({
          fullName: 'Super Admin',
          email: email,
          phone: '+91 98765 00000',
          role: 'Super Admin',
          status: 'active',
          avatar: null
        });

        // Navigate to admin dashboard
        navigate('/admin/dashboard');
      } else {
        setError('Invalid email or password. Please try again.');
        setIsLoading(false);
      }
    }, 1000);
  };

  const fillDemoCredentials = () => {
    setEmail(demoCredentials.email);
    setPassword(demoCredentials.password);
    setError('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '1rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '450px',
        backgroundColor: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        padding: '2.5rem',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        {/* Logo and Title */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 1rem',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)'
          }}>
            <Ticket size={40} />
          </div>
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: 900, 
            marginBottom: '0.5rem',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Admin Panel
          </h1>
          <p style={{ 
            fontSize: '1rem', 
            color: '#666' 
          }}>
            Lotto Link Administration
          </p>
        </div>

        {/* Demo Credentials Info */}
        <div style={{
          backgroundColor: '#F0F4FF',
          border: '2px solid #667eea',
          borderRadius: '12px',
          padding: '1.25rem',
          marginBottom: '1.5rem'
        }}>
          <p style={{ 
            fontSize: '0.875rem', 
            color: '#667eea', 
            fontWeight: 700,
            marginBottom: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            🔐 Demo Credentials
          </p>
          <p style={{ fontSize: '0.9rem', color: '#333', marginBottom: '0.25rem' }}>
            <strong>Email:</strong> admin@lottolink.com
          </p>
          <p style={{ fontSize: '0.9rem', color: '#333', marginBottom: '1rem' }}>
            <strong>Password:</strong> 12345678
          </p>
          <button
            type="button"
            onClick={fillDemoCredentials}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Use Demo Credentials
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#333',
              marginBottom: '0.5rem'
            }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={20} style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#999'
              }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem 0.875rem 3rem',
                  border: '2px solid #E5E7EB',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
              />
            </div>
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#333',
              marginBottom: '0.5rem'
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={20} style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#999'
              }} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '0.875rem 3rem 0.875rem 3rem',
                  border: '2px solid #E5E7EB',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#999',
                  padding: '0.25rem',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              backgroundColor: '#FEE2E2',
              border: '2px solid #EF4444',
              borderRadius: '10px',
              padding: '1rem',
              marginBottom: '1.25rem',
              fontSize: '0.875rem',
              color: '#991B1B',
              fontWeight: 600
            }}>
              ⚠️ {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '1rem',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
            }}
            onMouseOver={(e) => !isLoading && (e.target.style.transform = 'translateY(-2px)')}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            {isLoading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <div style={{ 
                  width: '20px', 
                  height: '20px', 
                  border: '3px solid rgba(255,255,255,0.3)',
                  borderTop: '3px solid white',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite'
                }} />
                <span>Signing in...</span>
              </div>
            ) : (
              '🔓 Sign In to Admin Panel'
            )}
          </button>
        </form>

        {/* Footer Note */}
        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          backgroundColor: '#FFFBEB',
          border: '2px solid #FCD34D',
          borderRadius: '10px',
          fontSize: '0.8125rem',
          color: '#78350F',
          textAlign: 'center',
          fontWeight: 500
        }}>
          <strong>⚡ Note:</strong> This is a demo admin panel. Use the credentials above to login.
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;
