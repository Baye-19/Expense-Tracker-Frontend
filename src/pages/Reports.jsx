// ============================================
// src/pages/Reports.jsx
// REPORTS PAGE (WITH BACK BUTTON)
// ============================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ← For back navigation
import './Reports.css';

const Reports = () => {
  const [period, setPeriod] = useState('month');
  const navigate = useNavigate(); // ← Hook for navigation

  return (
    <div className="reports-page">
      {/* ========================================
          PAGE HEADER
          ======================================== */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Reports</h1>
          <p className="page-subtitle">Visualize your spending patterns</p>
        </div>
        <div className="header-actions">
          {/* Period selector */}
          <div className="period-selector">
            <button 
              className={`btn btn-sm ${period === 'week' ? 'btn-primary' : 'btn-ghost'}`} 
              onClick={() => setPeriod('week')}
            >
              Week
            </button>
            <button 
              className={`btn btn-sm ${period === 'month' ? 'btn-primary' : 'btn-ghost'}`} 
              onClick={() => setPeriod('month')}
            >
              Month
            </button>
            <button 
              className={`btn btn-sm ${period === 'year' ? 'btn-primary' : 'btn-ghost'}`} 
              onClick={() => setPeriod('year')}
            >
              Year
            </button>
          </div>
          {/* ===== BACK BUTTON ===== */}
          <button onClick={() => navigate('/dashboard')} className="btn btn-ghost">
            ← Back to Dashboard
          </button>
        </div>
      </div>

      <div className="reports-grid">
        <div className="card report-card">
          <h3>📊 Spending by Category</h3>
          <div className="report-placeholder">
            <div className="placeholder-chart">
              <div className="pie-placeholder"></div>
            </div>
            <p className="placeholder-text">Chart will appear here when connected to backend</p>
          </div>
        </div>

        <div className="card report-card">
          <h3>📈 Monthly Trends</h3>
          <div className="report-placeholder">
            <div className="placeholder-chart">
              <div className="bar-placeholder">
                {[60, 80, 45, 90, 55, 70].map((h, i) => (
                  <div key={i} className="placeholder-bar" style={{ height: `${h}%` }}></div>
                ))}
              </div>
            </div>
            <p className="placeholder-text">Monthly comparison data will display here</p>
          </div>
        </div>

        <div className="card report-card">
          <h3>💳 Payment Method Breakdown</h3>
          <div className="report-placeholder">
            <p>Cash: 15%</p>
            <p>Credit Card: 45%</p>
            <p>Debit Card: 30%</p>
            <p>Bank Transfer: 10%</p>
          </div>
        </div>

        <div className="card report-card">
          <h3>🎯 Budget vs Actual</h3>
          <div className="report-placeholder">
            <p>Budget: $3,000</p>
            <p>Spent: $2,450</p>
            <p>Remaining: $550 (18.3%)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;