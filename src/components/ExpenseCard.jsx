// ============================================
// src/components/ExpenseCard.jsx
// EXPENSE CARD COMPONENT
// Displays a summary of a single expense.
// Used in lists like "Recent Transactions"
// on the Dashboard.
//
// KEY CONCEPT: Lists and Keys
// When this component is used in a .map(),
// React needs a unique "key" prop on each
// ExpenseCard to efficiently update the list.
// ============================================

import { Link } from 'react-router-dom';
import './ExpenseCard.css';

const ExpenseCard = ({ expense }) => {
  // ==========================================
  // Destructure all fields we need from expense
  // This makes the code cleaner than writing
  // expense.title, expense.amount, etc.
  // ==========================================
  const { 
    id, 
    title, 
    amount, 
    category, 
    date, 
    paymentMethod, 
    description 
  } = expense;

  // ==========================================
  // Format the date to a readable string
  // e.g., "June 25, 2026"
  // ==========================================
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // ==========================================
  // Get the emoji icon for each category
  // This makes categories visually distinct
  // ==========================================
  const categoryIcons = {
    Food: '🍔',
    Transport: '🚗',
    Entertainment: '🎬',
    Utilities: '⚡',
    Shopping: '🛍️',
    Healthcare: '🏥',
    Education: '📚',
    Other: '📌',
  };

  // ==========================================
  // Get color class for category badge
  // This maps to CSS classes in ExpenseCard.css
  // ==========================================
  const categoryClass = category.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="expense-card">
      {/* ========================================
          LEFT SECTION: Category badge and info
          ======================================== */}
      <div className="expense-card-left">
        {/* Category badge with colored background */}
        <div className={`category-badge category-${categoryClass}`}>
          <span className="category-icon">
            {categoryIcons[category] || '📌'}
          </span>
          <span className="category-name">{category}</span>
        </div>
        
        {/* Title, description, date, payment method */}
        <div className="expense-info">
          <h4 className="expense-title">{title}</h4>
          {description && (
            <p className="expense-description">{description}</p>
          )}
          <div className="expense-meta">
            <span className="expense-date">📅 {formattedDate}</span>
            <span className="expense-payment">💳 {paymentMethod}</span>
          </div>
        </div>
      </div>

      {/* ========================================
          RIGHT SECTION: Amount and view link
          ======================================== */}
      <div className="expense-card-right">
        {/* Amount with color: red for expenses, green for income */}
        <span className={`expense-amount ${amount > 0 ? 'positive' : 'negative'}`}>
          ${Math.abs(amount).toFixed(2)}
        </span>
        
        {/* Link to view full expense details */}
        <Link to={`/expense/${id}`} className="expense-view-btn">
          View
          <span className="arrow">→</span>
        </Link>
      </div>
    </div>
  );
};

// ============================================
// WHAT YOU LEARNED:
// 1. Destructuring props for cleaner code
// 2. Date formatting with toLocaleDateString
// 3. Dynamic CSS classes based on data
// 4. Using Link for navigation with dynamic URLs
// 5. Objects as lookup tables (categoryIcons)
// ============================================

export default ExpenseCard;