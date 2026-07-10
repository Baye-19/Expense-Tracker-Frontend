// src/pages/Settings.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Settings.css';

const Settings = () => {
  const navigate = useNavigate();

  // Load settings from localStorage or use defaults
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('appSettings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return { emailNotifications: true, darkMode: false, currency: 'USD' };
      }
    }
    return { emailNotifications: true, darkMode: false, currency: 'USD' };
  });

  const [saveMessage, setSaveMessage] = useState('');

  // Apply dark mode on page load from saved settings
  useEffect(() => {
    const saved = localStorage.getItem('appSettings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.darkMode) {
          document.body.classList.add('dark-mode');
        } else {
          document.body.classList.remove('dark-mode');
        }
      } catch {
        // Invalid settings, ignore
      }
    }
  }, []);

  // Handle toggle changes
  const handleToggle = (name) => {
    setSettings(prev => ({ ...prev, [name]: !prev[name] }));
  };

  // Handle currency change
  const handleCurrencyChange = (e) => {
    setSettings(prev => ({ ...prev, currency: e.target.value }));
  };

  // Apply dark mode
  const applyDarkMode = (isDark) => {
    if (isDark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  // Save settings
  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('appSettings', JSON.stringify(settings));
    
    // Apply dark mode immediately
    applyDarkMode(settings.darkMode);
    
    // Show success message
    setSaveMessage('✅ Settings saved successfully!');
    
    // Clear message after 3 seconds
    setTimeout(() => setSaveMessage(''), 3000);
  };

  return (
    <div className="settings-page">
      {/* ========================================
          PAGE HEADER
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

      {/* Success Message */}
      {saveMessage && (
        <div className="settings-save-message">{saveMessage}</div>
      )}

      {/* ========================================
          PREFERENCES SECTION
          ======================================== */}
      <div className="card settings-section">
        <h3>⚙️ Preferences</h3>

        {/* Email Notifications */}
        <div className="setting-item">
          <div>
            <p className="setting-label">Email Notifications</p>
            <p className="setting-desc">Receive weekly expense summaries via email</p>
          </div>
          <button
            className={`toggle ${settings.emailNotifications ? 'active' : ''}`}
            onClick={() => handleToggle('emailNotifications')}
            aria-label="Toggle email notifications"
          >
            <span className="toggle-dot"></span>
          </button>
        </div>

        {/* Dark Mode */}
        <div className="setting-item">
          <div>
            <p className="setting-label">Dark Mode</p>
            <p className="setting-desc">Switch to dark color theme for comfortable viewing</p>
          </div>
          <button
            className={`toggle ${settings.darkMode ? 'active' : ''}`}
            onClick={() => handleToggle('darkMode')}
            aria-label="Toggle dark mode"
          >
            <span className="toggle-dot"></span>
          </button>
        </div>

        {/* Currency */}
        <div className="setting-item">
          <div>
            <p className="setting-label">Currency</p>
            <p className="setting-desc">Choose your preferred currency display</p>
          </div>
          <select
            className="form-control"
            style={{ width: 'auto', minWidth: '180px' }}
            value={settings.currency}
            onChange={handleCurrencyChange}
          >
            <option value="USD">USD ($) - US Dollar</option>
            <option value="EUR">EUR (€) - Euro</option>
            <option value="GBP">GBP (£) - British Pound</option>
            <option value="ETB">ETB (Br) - Ethiopian Birr</option>
            <option value="INR">INR (₹) - Indian Rupee</option>
            <option value="JPY">JPY (¥) - Japanese Yen</option>
            <option value="CAD">CAD (C$) - Canadian Dollar</option>
            <option value="AUD">AUD (A$) - Australian Dollar</option>
          </select>
        </div>
      </div>

      {/* ========================================
          ACCOUNT SECTION
          ======================================== */}
      <div className="card settings-section">
        <h3>🔐 Account</h3>

        {/* Change Password */}
        <div className="setting-item">
          <div>
            <p className="setting-label">Change Password</p>
            <p className="setting-desc">Update your account password for better security</p>
          </div>
          <button className="btn btn-sm btn-outline" disabled>
            Coming Soon
          </button>
        </div>

        {/* Two-Factor Authentication */}
        <div className="setting-item">
          <div>
            <p className="setting-label">Two-Factor Authentication</p>
            <p className="setting-desc">Add an extra layer of security to your account</p>
          </div>
          <button className="btn btn-sm btn-outline" disabled>
            Coming Soon
          </button>
        </div>

        {/* Delete Account */}
        <div className="setting-item">
          <div>
            <p className="setting-label">Delete Account</p>
            <p className="setting-desc">Permanently delete your account and all associated data</p>
          </div>
          <button className="btn btn-sm btn-danger" disabled>
            Coming Soon
          </button>
        </div>
      </div>

      {/* ========================================
          DATA SECTION
          ======================================== */}
      <div className="card settings-section">
        <h3>📊 Data</h3>

        {/* Export Data */}
        <div className="setting-item">
          <div>
            <p className="setting-label">Export Expenses</p>
            <p className="setting-desc">Download your expense data as a CSV file</p>
          </div>
          <button className="btn btn-sm btn-outline" disabled>
            Coming Soon
          </button>
        </div>

        {/* Clear Data */}
        <div className="setting-item">
          <div>
            <p className="setting-label">Clear All Data</p>
            <p className="setting-desc">Remove all your expenses and start fresh</p>
          </div>
          <button className="btn btn-sm btn-danger" disabled>
            Coming Soon
          </button>
        </div>
      </div>

      {/* ========================================
          SAVE BUTTON
          ======================================== */}
      <button
        className="btn btn-primary btn-lg"
        style={{ marginTop: '1.5rem', width: '100%' }}
        onClick={handleSave}
      >
        💾 Save Settings
      </button>
    </div>
  );
};

export default Settings;