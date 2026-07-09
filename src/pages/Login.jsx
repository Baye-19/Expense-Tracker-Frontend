// src/pages/Login.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  
const handleSubmit = async (e) => {
  e.preventDefault();
  const newErrors = {};
  if (!formData.email.trim()) newErrors.email = 'Email is required';
  if (!formData.password) newErrors.password = 'Password is required';
  setErrors(newErrors);
  if (Object.keys(newErrors).length > 0) return;

  setIsSubmitting(true);
  const result = await login(formData);
  setIsSubmitting(false);

  if (result.success) {
    navigate('/dashboard', { replace: true });
  }else {
    setErrors({ form: result.error });
  }
};

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-decoration">
          <div className="auth-decoration-content">
            <h2>Welcome Back! 👋</h2>
            <p>Sign in to continue tracking your expenses and managing your finances.</p>
          </div>
        </div>
        <div className="auth-card">
          <div className="auth-card-header">
            <h1>Sign In</h1>
            <p>Enter your credentials to access your account</p>
          </div>

          {errors.form && <div className="auth-alert-error">{errors.form}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-wrapper">
                <span className="input-icon">📧</span>
                <input
                  type="email"
                  name="email"
                  className={`form-control input-with-icon ${errors.email ? 'error' : ''}`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
              {errors.email && <span className="form-error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className={`form-control input-with-icon input-with-toggle ${errors.password ? 'error' : ''}`}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && <span className="form-error-message">{errors.password}</span>}
            </div>

            <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-divider"><span>or</span></div>
          <p className="auth-switch">
            Don't have an account? <Link to="/register" className="auth-link">Create one now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;