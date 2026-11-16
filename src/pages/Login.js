import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../user/contexts/UserContext';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Temporary: Direct redirect to admin login
      // TODO: Implement proper user authentication later
      if (formData.email && formData.password) {
        // Redirect to admin login page
        navigate('/adminlogin');
      } else {
        setError('Please enter valid credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Animated Background */}
      <div className="auth-background">
        <div className="bg-gradient-primary"></div>
        <div className="bg-wave wave-1"></div>
        <div className="bg-wave wave-2"></div>
        <div className="bg-wave wave-3"></div>
        <div className="bg-glow glow-1"></div>
        <div className="bg-glow glow-2"></div>
        <div className="bg-stars"></div>
        <div className="bg-dots dots-1"></div>
        <div className="bg-dots dots-2"></div>
      </div>

      {/* Left Side - Branding */}
      <div className="auth-branding">
        {/* Logo */}
        <div className="logo-container">
          <div className="logo-symbol">
            <div className="logo-circle circle-pink"></div>
            <div className="logo-circle circle-gold"></div>
          </div>
          <h2 className="logo-text">
            LOTTO <span className="gradient-text">LINK</span>
          </h2>
        </div>

        {/* Headline */}
        <div className="headline-container">
          <h1 className="headline">
            <span className="headline-line play-today">Play Today</span>
            <span className="headline-line win-tomorrow">
              <span className="win-text">Win</span> <span className="tomorrow-text">Tomorrow</span>
            </span>
          </h1>
          <div className="headline-underline"></div>
        </div>
      </div>

      {/* Right Side - Login Card */}
      <div className="auth-container">
        <div className="login-card">
          {/* Card Header */}
          <div className="card-header">
            <h1 className="card-title">
              Welcome <span className="gradient-text">Back</span>
            </h1>
            <p className="card-subtitle">Login to access your Lotto Link account</p>
          </div>

          {/* Login Form */}
          <form className="login-form" onSubmit={handleSubmit} noValidate>
            {/* Error Message */}
            {error && (
              <div className="error-message" role="alert">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div className="form-field">
              <label htmlFor="email" className="field-label">
                EMAIL ADDRESS
              </label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={20} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="field-input"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-field">
              <label htmlFor="password" className="field-label">
                PASSWORD
              </label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className="field-input"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="form-options">
              <label className="checkbox-wrapper">
                <input
                  type="checkbox"
                  name="rememberMe"
                  className="checkbox-input"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <span className="checkbox-label">Remember me</span>
              </label>
              <Link 
                to="/forgot-password" 
                className="forgot-link"
                tabIndex={isLoading ? -1 : 0}
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="login-button"
              disabled={isLoading}
              aria-busy={isLoading}
            >
              <span>{isLoading ? 'Logging in...' : 'Login'}</span>
              <span className="button-arrow">→</span>
            </button>

            {/* Divider */}
            <div className="divider">
              <span className="divider-line"></span>
              <span className="divider-text">OR</span>
              <span className="divider-line"></span>
            </div>

            {/* Register Link */}
            <p className="register-text">
              Don't have an account? <Link to="/register" className="register-link">Register here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
