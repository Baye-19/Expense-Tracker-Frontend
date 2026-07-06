// ============================================
// src/components/StatCard.jsx
// STATISTIC CARD COMPONENT
// A reusable card for displaying financial
// statistics. Used 3 times on the Dashboard
// for Balance, Income, and Expenses.
//
// KEY CONCEPT: Props
// Props (short for "properties") are how parent
// components pass data to child components.
// Think of them like function arguments.
// Here, Dashboard passes title, amount, color, etc.
// and StatCard renders them beautifully.
// ============================================

import './StatCard.css';

const StatCard = ({ 
  title,        // e.g., "Total Balance"
  amount,       // e.g., 1500.00
  color,        // e.g., "#6366f1" (used for accent)
  icon,         // e.g., "💰" (emoji icon)
  trend,        // e.g., "+12.5% from last month" (optional)
  trendUp       // true = green trend, false = red trend (optional)
}) => {
  // ==========================================
  // Format the amount as currency
  // toLocaleString adds commas to large numbers
  // toFixed(2) ensures 2 decimal places
  // ==========================================
  const formattedAmount = Math.abs(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Determine if amount is positive, negative, or zero
  const isPositive = amount > 0;
  const isNegative = amount < 0;

  return (
    <div 
      className="stat-card"
      style={{ 
        // Dynamic border-top color based on the 'color' prop
        borderTop: `4px solid ${color}` 
      }}
    >
      {/* ========================================
          CARD HEADER: Icon and Title
          ======================================== */}
      <div className="stat-card-header">
        {/* Icon container with colored background */}
        <div 
          className="stat-card-icon"
          style={{ 
            backgroundColor: `${color}15`,  // 15 = 8% opacity in hex
            color: color 
          }}
        >
          {icon || '📊'}
        </div>
        
        {/* Title text */}
        <h3 className="stat-card-title">{title}</h3>
      </div>

      {/* ========================================
          AMOUNT DISPLAY
          Shows the dollar amount with color coding
          ======================================== */}
      <div className="stat-card-body">
        <p 
          className="stat-card-amount"
          style={{ color: color }}
        >
          {/* Show minus sign for negative amounts */}
          {isNegative && '−'}
          ${formattedAmount}
        </p>
      </div>

      {/* ========================================
          TREND INDICATOR (Optional)
          Shows percentage change if provided
          ======================================== */}
      {trend && (
        <div className="stat-card-footer">
          <span 
            className={`stat-trend ${trendUp ? 'trend-up' : 'trend-down'}`}
          >
            {/* Arrow based on direction */}
            <span className="trend-arrow">
              {trendUp ? '↑' : '↓'}
            </span>
            {trend}
          </span>
          <span className="trend-label">vs last month</span>
        </div>
      )}
    </div>
  );
};

// ============================================
// WHAT YOU LEARNED:
// 1. Props make components reusable
// 2. Destructuring props in function params is clean
// 3. Inline styles can be dynamic (based on props)
// 4. toLocaleString formats numbers nicely
// 5. Optional props (trend) need conditional rendering
// ============================================

export default StatCard;