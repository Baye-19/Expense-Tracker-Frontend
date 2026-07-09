// src/pages/Reports.jsx
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExpenses } from '../context/ExpenseContext';
import './Reports.css';

const Reports = () => {
  const [period, setPeriod] = useState('month'); // 'week', 'month', 'year'
  const navigate = useNavigate();
  const { expenses } = useExpenses();

  // Get current date
  const now = new Date();

  // Filter expenses based on selected period
  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      
      if (period === 'week') {
        const weekAgo = new Date(now);
        weekAgo.setDate(now.getDate() - 7);
        return expenseDate >= weekAgo;
      }
      
      if (period === 'month') {
        const monthAgo = new Date(now);
        monthAgo.setMonth(now.getMonth() - 1);
        return expenseDate >= monthAgo;
      }
      
      if (period === 'year') {
        const yearAgo = new Date(now);
        yearAgo.setFullYear(now.getFullYear() - 1);
        return expenseDate >= yearAgo;
      }
      
      return true;
    });
  }, [expenses, period, now]);

  // Calculate total for the period
  const totalSpent = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  // Calculate spending by category
  const categoryBreakdown = useMemo(() => {
    const breakdown = {};
    
    filteredExpenses.forEach((expense) => {
      const category = expense.category || 'Other';
      if (!breakdown[category]) {
        breakdown[category] = { total: 0, count: 0, expenses: [] };
      }
      breakdown[category].total += expense.amount;
      breakdown[category].count += 1;
      breakdown[category].expenses.push(expense);
    });

    // Sort by highest spending
    return Object.entries(breakdown)
      .sort((a, b) => b[1].total - a[1].total)
      .map(([category, data]) => ({
        category,
        total: data.total,
        count: data.count,
        percentage: totalSpent > 0 ? ((data.total / totalSpent) * 100).toFixed(1) : 0,
        expenses: data.expenses,
      }));
  }, [filteredExpenses, totalSpent]);

  // Calculate payment method breakdown
  const paymentBreakdown = useMemo(() => {
    const breakdown = {};
    
    filteredExpenses.forEach((expense) => {
      const method = expense.paymentMethod || 'Other';
      if (!breakdown[method]) {
        breakdown[method] = { total: 0, count: 0 };
      }
      breakdown[method].total += expense.amount;
      breakdown[method].count += 1;
    });

    return Object.entries(breakdown)
      .sort((a, b) => b[1].total - a[1].total)
      .map(([method, data]) => ({
        method,
        total: data.total,
        count: data.count,
        percentage: totalSpent > 0 ? ((data.total / totalSpent) * 100).toFixed(1) : 0,
      }));
  }, [filteredExpenses, totalSpent]);

  // Calculate daily spending for the period
  const dailySpending = useMemo(() => {
    const daily = {};
    
    filteredExpenses.forEach((expense) => {
      const dateKey = new Date(expense.date).toISOString().split('T')[0];
      if (!daily[dateKey]) {
        daily[dateKey] = 0;
      }
      daily[dateKey] += expense.amount;
    });

    return Object.entries(daily)
      .sort((a, b) => new Date(a[0]) - new Date(b[0]))
      .map(([date, total]) => ({ date, total }));
  }, [filteredExpenses]);

  // Find highest spending day
  const highestDay = dailySpending.length > 0 
    ? dailySpending.reduce((max, day) => day.total > max.total ? day : max, dailySpending[0])
    : null;

  // Average daily spending
  const avgDailySpending = dailySpending.length > 0
    ? (totalSpent / dailySpending.length).toFixed(2)
    : 0;

  // Get bar chart max height value
  const maxBarValue = dailySpending.length > 0
    ? Math.max(...dailySpending.map(d => d.total))
    : 1;

  const categoryColors = [
    '#6366f1', '#8b5cf6', '#ec4899', '#ef4444', '#f59e0b',
    '#10b981', '#06b6d4', '#3b82f6', '#f97316', '#84cc16'
  ];

  return (
    <div className="reports-page">
      <div className="page-header">
        <div className="page-header-left">
          <button onClick={() => navigate('/dashboard')} className="btn btn-ghost back-btn">← Back</button>
          <div>
            <h1 className="page-title">Reports</h1>
            <p className="page-subtitle">Real-time spending analysis</p>
          </div>
        </div>
        <div className="period-selector">
          {['week', 'month', 'year'].map(p => (
            <button
              key={p}
              className={`btn btn-sm ${period === p ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setPeriod(p)}
            >
              {p === 'week' ? '📅 Week' : p === 'month' ? '📆 Month' : '📊 Year'}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="report-summary-cards">
        <div className="report-summary-card">
          <span className="summary-icon">💰</span>
          <div>
            <p className="summary-label">Total Spent</p>
            <h3 className="summary-value">${totalSpent.toFixed(2)}</h3>
          </div>
        </div>
        <div className="report-summary-card">
          <span className="summary-icon">📋</span>
          <div>
            <p className="summary-label">Transactions</p>
            <h3 className="summary-value">{filteredExpenses.length}</h3>
          </div>
        </div>
        <div className="report-summary-card">
          <span className="summary-icon">📊</span>
          <div>
            <p className="summary-label">Avg Daily</p>
            <h3 className="summary-value">${avgDailySpending}</h3>
          </div>
        </div>
        {highestDay && (
          <div className="report-summary-card">
            <span className="summary-icon">🔝</span>
            <div>
              <p className="summary-label">Highest Day</p>
              <h3 className="summary-value">${highestDay.total.toFixed(2)}</h3>
              <p className="summary-sub">{new Date(highestDay.date).toLocaleDateString()}</p>
            </div>
          </div>
        )}
      </div>

      {/* Daily Spending Chart */}
      {dailySpending.length > 0 && (
        <div className="card report-section">
          <h3>📈 Daily Spending ({period})</h3>
          <div className="bar-chart">
            {dailySpending.map((day) => (
              <div key={day.date} className="bar-chart-item" title={`${day.date}: $${day.total.toFixed(2)}`}>
                <div className="bar-value">${day.total.toFixed(0)}</div>
                <div className="bar-container">
                  <div
                    className="bar-fill"
                    style={{
                      height: `${(day.total / maxBarValue) * 100}%`,
                      background: 'linear-gradient(to top, #6366f1, #8b5cf6)'
                    }}
                  ></div>
                </div>
                <div className="bar-label">
                  {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="reports-grid">
        {/* Category Breakdown */}
        <div className="card report-section">
          <h3>📂 Spending by Category</h3>
          {categoryBreakdown.length > 0 ? (
            <div className="category-list">
              {categoryBreakdown.map((cat, index) => (
                <div key={cat.category} className="category-item">
                  <div className="category-header">
                    <div className="category-info">
                      <span className="category-dot" style={{ background: categoryColors[index % categoryColors.length] }}></span>
                      <span className="category-name">{cat.category}</span>
                      <span className="category-count">({cat.count})</span>
                    </div>
                    <span className="category-amount">${cat.total.toFixed(2)}</span>
                  </div>
                  <div className="category-bar">
                    <div
                      className="category-bar-fill"
                      style={{
                        width: `${cat.percentage}%`,
                        background: categoryColors[index % categoryColors.length]
                      }}
                    ></div>
                  </div>
                  <span className="category-percentage">{cat.percentage}%</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-report">
              <p>📭 No expenses found for this period</p>
            </div>
          )}
        </div>

        {/* Payment Method Breakdown */}
        <div className="card report-section">
          <h3>💳 Payment Method Breakdown</h3>
          {paymentBreakdown.length > 0 ? (
            <div className="payment-list">
              {paymentBreakdown.map((pm) => (
                <div key={pm.method} className="payment-item">
                  <div className="payment-header">
                    <span className="payment-name">{pm.method}</span>
                    <span className="payment-amount">${pm.total.toFixed(2)}</span>
                  </div>
                  <div className="payment-bar">
                    <div
                      className="payment-bar-fill"
                      style={{ width: `${pm.percentage}%` }}
                    ></div>
                  </div>
                  <div className="payment-details">
                    <span>{pm.count} transactions</span>
                    <span>{pm.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-report">
              <p>📭 No expenses found</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Transactions in Period */}
      {filteredExpenses.length > 0 && (
        <div className="card report-section">
          <h3>📋 Recent Transactions ({period})</h3>
          <div className="recent-transactions">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Payment</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .slice(0, 20)
                  .map((expense) => (
                    <tr key={expense.id}>
                      <td>{new Date(expense.date).toLocaleDateString()}</td>
                      <td>{expense.title}</td>
                      <td><span className="table-category">{expense.category}</span></td>
                      <td>{expense.paymentMethod}</td>
                      <td className="table-amount">${expense.amount.toFixed(2)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;