// src/pages/SetBudget.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const SetBudget = () => {
  const navigate = useNavigate();
  const { setBudget } = useAuth();
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('monthly');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!amount || Number(amount) <= 0) {
      setError('Please enter a valid budget amount');
      return;
    }

    setBudget(amount, type);
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-decoration">
          <div className="auth-decoration-content">
            <h2>Set Your Budget 💰</h2>
            <p>Let's start by setting your spending limit. This helps you track and control your expenses.</p>
          </div>
        </div>
        <div className="auth-card">
          <div className="auth-card-header">
            <h1>What's Your Budget?</h1>
            <p>You can change this later in Settings</p>
          </div>

          {error && <div className="auth-alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Budget Type</label>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                <label className="checkbox-label">
                  <input
                    type="radio"
                    name="type"
                    value="monthly"
                    checked={type === 'monthly'}
                    onChange={(e) => setType(e.target.value)}
                  />
                  <span>📅 Monthly</span>
                </label>
                <label className="checkbox-label">
                  <input
                    type="radio"
                    name="type"
                    value="yearly"
                    checked={type === 'yearly'}
                    onChange={(e) => setType(e.target.value)}
                  />
                  <span>📆 Yearly</span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Budget Amount ($)</label>
              <div className="input-wrapper">
                <span className="input-icon">💵</span>
                <input
                  type="number"
                  className="form-control input-with-icon"
                  placeholder={type === 'monthly' ? 'e.g., 3000' : 'e.g., 36000'}
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setError('');
                  }}
                  min="0"
                  step="any"
                />
              </div>
              <small style={{ color: '#6b7280', marginTop: '0.25rem', display: 'block' }}>
                Enter any amount - e.g., 15000, 2500.50, or 100000
              </small>
            </div>

            <button type="submit" className="btn btn-primary btn-block btn-lg">
              ✅ Set Budget & Continue
            </button>

            <button
              type="button"
              className="btn btn-ghost btn-block"
              style={{ marginTop: '0.5rem' }}
              onClick={() => navigate('/dashboard')}
            >
              Skip for now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SetBudget;