import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useExpenses } from '../context/ExpenseContext'; // ← GLOBAL CONTEXT
import './ExpenseDetails.css';

const ExpenseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Global context – NO MORE MOCK DATA
  const { getExpenseById, deleteExpense } = useExpenses();

  const [expense, setExpense] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // LOAD EXPENSE FROM GLOBAL CONTEXT
  // ==========================================
  useEffect(() => {
    const found = getExpenseById(id);
    setExpense(found || null);
    setLoading(false);
  }, [id, getExpenseById]);

  // Delete expense
  const handleDelete = async () => {
    if (!window.confirm('Delete this expense? This cannot be undone.')) return;

    // Delete from global context
    deleteExpense(Number(id));
    navigate('/dashboard');
  };

  // ==========================================
  // LOADING STATE
  // ==========================================
  if (loading) {
    return (
      <div className="expense-details-page">
        <div className="card" style={{ textAlign: 'center', padding: '4rem' }}>
          <div className="app-loading-spinner" style={{ borderTopColor: 'var(--color-primary)', margin: '0 auto 1rem' }}></div>
          <p>Loading expense details...</p>
        </div>
      </div>
    );
  }

  // ==========================================
  // NOT FOUND STATE
  // ==========================================
  if (!expense) {
    return (
      <div className="expense-details-page">
        <div className="card" style={{ textAlign: 'center', padding: '4rem' }}>
          <div style={{ fontSize: '4rem' }}>🔍</div>
          <h2>Expense Not Found</h2>
          <p style={{ color: 'var(--color-gray-500)', marginBottom: '1.5rem' }}>
            The expense you're looking for doesn't exist or was deleted.
          </p>
          <button onClick={() => navigate('/dashboard')} className="btn btn-primary">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER DETAILS
  // ==========================================
  return (
    <div className="expense-details-page">
      <div className="page-header">
        <div className="page-header-left">
          <button onClick={() => navigate(-1)} className="btn btn-ghost back-btn">← Back</button>
          <div>
            <h1 className="page-title">{expense.title}</h1>
            <p className="page-subtitle">Expense #{expense.id}</p>
          </div>
        </div>
      </div>

      <div className="details-grid">
        <div className="card details-main">
          <div className="detail-amount">
            <span className="detail-amount-label">Amount</span>
            <span className="detail-amount-value">${expense.amount.toFixed(2)}</span>
          </div>

          <div className="detail-section">
            <h3>Details</h3>
            <div className="detail-row">
              <span className="detail-label">Category</span>
              <span className="detail-value">
                <span className={`category-badge category-${expense.category.toLowerCase()}`}>
                  {expense.category}
                </span>
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Date</span>
              <span className="detail-value">
                {new Date(expense.date).toLocaleDateString('en-US', {
                  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                })}
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Payment Method</span>
              <span className="detail-value">{expense.paymentMethod}</span>
            </div>
          </div>

          {expense.description && (
            <div className="detail-section">
              <h3>Description</h3>
              <p>{expense.description}</p>
            </div>
          )}

          {expense.notes && (
            <div className="detail-section">
              <h3>Notes</h3>
              <p>{expense.notes}</p>
            </div>
          )}

          <div className="detail-actions">
            <Link to={`/edit-expense/${expense.id}`} className="btn btn-primary">
              ✏️ Edit
            </Link>
            <button onClick={handleDelete} className="btn btn-danger">
              🗑️ Delete
            </button>
          </div>
        </div>

        <div className="card details-sidebar">
          <h3>Quick Info</h3>
          <div className="sidebar-stat">
            <span>Category spending this month</span>
            <strong>$450.00</strong>
          </div>
          <div className="sidebar-stat">
            <span>Percentage of total</span>
            <strong>18.5%</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseDetails;
