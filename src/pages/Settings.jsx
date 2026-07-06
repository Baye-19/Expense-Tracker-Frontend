// src/pages/Settings.jsx
// Back button moved to the LEFT side

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Settings.css';

const Settings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    darkMode: false,
    currency: 'USD',
  });

  const handleToggle = (name) => {
    setSettings(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="settings-page">
      {/* ========================================
          PAGE HEADER - Back button on LEFT
          ======================================== */}
      <div className="page-header">
        <div className="page-header-left">
          <button onClick={() => navigate('/dashboard')} className="btn btn-ghost back-btn">
            ← Back
          </button>
          <div>
            <h1 className="page-title">Settings</h1>
            <p className="page-subtitle">Customize your experience</p>
          </div>
        </div>
      </div>
      
      <div className="card settings-section">
        <h3>Preferences</h3>
        
        <div className="setting-item">
          <div>
            <p className="setting-label">Email Notifications</p>
            <p className="setting-desc">Receive weekly expense summaries</p>
          </div>
          <button 
            className={`toggle ${settings.emailNotifications ? 'active' : ''}`}
            onClick={() => handleToggle('emailNotifications')}
          >
            <span className="toggle-dot"></span>
          </button>
        </div>

        <div className="setting-item">
          <div>
            <p className="setting-label">Dark Mode</p>
            <p className="setting-desc">Switch to dark color theme</p>
          </div>
          <button 
            className={`toggle ${settings.darkMode ? 'active' : ''}`}
            onClick={() => handleToggle('darkMode')}
          >
            <span className="toggle-dot"></span>
          </button>
        </div>

        <div className="setting-item">
          <div>
            <p className="setting-label">Currency</p>
            <p className="setting-desc">Choose your preferred currency</p>
          </div>
          <select className="form-control" style={{ width: 'auto' }}>
            <option>BIRR (Br)</option>
            <option>USD ($)</option>
            <option>EUR (€)</option>
            <option>GBP (£)</option>
          </select>
        </div>
      </div>

      <button className="btn btn-primary" style={{ marginTop: '1rem' }}>Save Settings</button>
    </div>
  );
};

export default Settings;