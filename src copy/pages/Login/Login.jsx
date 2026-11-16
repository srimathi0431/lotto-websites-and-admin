// ===================================
// LOGIN PAGE
// Demo authentication with admin@lottolink.com / 12345678
// ===================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, Ticket } from 'lucide-react';
import { saveAuthData, saveAdminProfile } from '../../utils/storage';
import { demoCredentials } from '../../data/demoData';
import '../../styles/globals.css';

const Login = () => {
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

        // Navigate to dashboard
        navigate('/dashboard');
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
      backgroundColor: 'var(--bg-app)',
      padding: '1rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '450px',
        backgroundColor: 'var(--bg-content)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-lg)',
        padding: '2.5rem',
        border: '1px solid var(--border-light)'
      }}>
        {/* Logo and Title */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            margin: '0 auto 1rem',
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-purple))',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <Ticket size={32} />
          </div>
          <h1 style={{ 
            fontSize: '1.75rem', 
            fontWeight: 700, 
            marginBottom: '0.5rem',
            color: 'var(--text-primary)'
          }}>
            Lotto Link Admin
          </h1>
          <p style={{ 
            fontSize: '0.9375rem', 
            color: 'var(--text-secondary)' 
          }}>
            Sign in to access your dashboard
          </p>
        </div>

        {/* Demo Credentials Info */}
        <div style={{
          backgroundColor: '#EEF2FF',
          border: '1px solid #C7D2FE',
          borderRadius: 'var(--radius-md)',
          padding: '1rem',
          marginBottom: '1.5rem'
        }}>
          <p style={{ 
            fontSize: '0.875rem', 
            color: 'var(--color-primary)', 
            fontWeight: 600,
            marginBottom: '0.5rem'
          }}>
            Demo Credentials
          </p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
            <strong>Email:</strong> admin@lottolink.com
          </p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
            <strong>Password:</strong> 12345678
          </p>
          <button
            type="button"
            onClick={fillDemoCredentials}
            className="btn btn-primary btn-sm"
            style={{ width: '100%', fontSize: '0.8125rem' }}
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
              fontWeight: 500,
              color: 'var(--text-primary)',
              marginBottom: '0.5rem'
            }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{
                position: 'absolute',
                left: '0.875rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)'
              }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={isLoading}
                style={{
                  paddingLeft: '2.5rem',
                  width: '100%'
                }}
              />
            </div>
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'var(--text-primary)',
              marginBottom: '0.5rem'
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{
                position: 'absolute',
                left: '0.875rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)'
              }} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={isLoading}
                style={{
                  paddingLeft: '2.5rem',
                  paddingRight: '2.5rem',
                  width: '100%'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
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
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              backgroundColor: '#FEE2E2',
              border: '1px solid #FCA5A5',
              borderRadius: 'var(--radius-md)',
              padding: '0.75rem',
              marginBottom: '1.25rem',
              fontSize: '0.875rem',
              color: '#991B1B'
            }}>
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '0.75rem',
              fontSize: '1rem',
              fontWeight: 600
            }}
          >
            {isLoading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <div className="spinner" style={{ width: '18px', height: '18px', borderWidth: '2px' }} />
                <span>Signing in...</span>
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Footer Note */}
        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          backgroundColor: '#FEF3C7',
          border: '1px solid #FCD34D',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.8125rem',
          color: '#78350F',
          textAlign: 'center'
        }}>
          <strong>Note:</strong> This is a frontend-only demo. No real authentication or server communication occurs.
        </div>
      </div>
    </div>
  );
};

export default Login;
