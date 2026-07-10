
import { Link } from 'react-router-dom';
import './ExpenseCard.css';

const ExpenseCard = ({ expense }) => {
  const { 
    id, 
    title, 
    amount, 
    category, 
    date, 
    paymentMethod, 
    description 
  } = expense;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

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

export default ExpenseCard;