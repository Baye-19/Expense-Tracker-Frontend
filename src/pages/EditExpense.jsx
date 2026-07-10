import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useExpenses } from '../context/ExpenseContext'; // ← GLOBAL CONTEXT
import './AddExpense.css'; // Reuses AddExpense form styles

const CATEGORIES = ['Food', 'Transport', 'Entertainment', 'Utilities', 'Shopping', 'Healthcare', 'Education', 'Other'];
const PAYMENT_METHODS = ['Cash', 'Credit Card', 'Debit Card', 'Bank Transfer', 'Other'];

const EditExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Global context functions – NO MORE MOCK DATA
  const { getExpenseById, updateExpense, deleteExpense } = useExpenses();

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    amount: '',
    category: 'Food',
    date: '',
    paymentMethod: 'Cash',
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // LOAD EXPENSE FROM GLOBAL CONTEXT
  useEffect(() => {
    const expense = getExpenseById(id);

    if (expense) {
      // Pre-fill form with existing data
      setFormData({
        title: expense.title,
        description: expense.description || '',
        amount: expense.amount.toString(),
        category: expense.category,
        date: expense.date,
        paymentMethod: expense.paymentMethod,
        notes: expense.notes || '',
      });
      setNotFound(false);
    } else {
      setNotFound(true);
    }

    setLoading(false);
  }, [id, getExpenseById]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // Validate
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.amount || parseFloat(formData.amount) <= 0) newErrors.amount = 'Valid amount required';
    if (!formData.date) newErrors.date = 'Date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Update global expense – Dashboard will reflect changes!
      updateExpense(Number(id), {
        title: formData.title,
        description: formData.description,
        amount: parseFloat(formData.amount),
        category: formData.category,
        date: formData.date,
        paymentMethod: formData.paymentMethod,
        notes: formData.notes,
      });

      navigate('/dashboard');
    } catch (error) {
      setErrors({ form: 'Failed to update expense.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete expense
  const handleDelete = () => {
    if (!window.confirm('Are you sure you want to delete this expense?')) return;

    // Delete from global context
    deleteExpense(Number(id));
    navigate('/dashboard');
  };

  // LOADING STATE
  if (loading) {
    return (
      <div className="add-expense-page">
        <div className="card" style={{ textAlign: 'center', padding: '4rem' }}>
          <div className="app-loading-spinner" style={{ borderTopColor: 'var(--color-primary)', margin: '0 auto 1rem' }}></div>
          <p>Loading expense...</p>
        </div>
      </div>
    );
  }

  // NOT FOUND STATE
  if (notFound) {
    return (
      <div className="add-expense-page">
        <div className="card" style={{ textAlign: 'center', padding: '4rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
          <h2>Expense Not Found</h2>
          <p style={{ color: 'var(--color-gray-500)', marginBottom: '1.5rem' }}>
            The expense you're looking for doesn't exist.
          </p>
          <button onClick={() => navigate('/dashboard')} className="btn btn-primary">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // RENDER FORM
  return (
    <div className="add-expense-page">
      <div className="page-header">
        <div className="page-header-left">
          <button onClick={() => navigate(-1)} className="btn btn-ghost back-btn">← Back</button>
          <div>
            <h1 className="page-title">Edit Expense</h1>
            <p className="page-subtitle">Update expense #{id}</p>
          </div>
        </div>
      </div>

      <div className="card">
        {errors.form && <div className="auth-alert auth-alert-error">{errors.form}</div>}

        <form onSubmit={handleSubmit} className="expense-form" noValidate>
          <div className="form-group">
            <label className="form-label form-label-required">Title</label>
            <input type="text" name="title" className={`form-control ${errors.title ? 'error' : ''}`} value={formData.title} onChange={handleChange} disabled={isSubmitting} />
            {errors.title && <span className="form-error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <input type="text" name="description" className="form-control" value={formData.description} onChange={handleChange} disabled={isSubmitting} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label form-label-required">Amount ($)</label>
              <input type="number" name="amount" className={`form-control ${errors.amount ? 'error' : ''}`} step="0.01" min="0.01" value={formData.amount} onChange={handleChange} disabled={isSubmitting} />
              {errors.amount && <span className="form-error-message">{errors.amount}</span>}
            </div>
            <div className="form-group">
              <label className="form-label form-label-required">Category</label>
              <select name="category" className="form-control" value={formData.category} onChange={handleChange} disabled={isSubmitting}>
                {CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label form-label-required">Date</label>
              <input type="date" name="date" className={`form-control ${errors.date ? 'error' : ''}`} value={formData.date} onChange={handleChange} disabled={isSubmitting} />
              {errors.date && <span className="form-error-message">{errors.date}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Payment Method</label>
              <select name="paymentMethod" className="form-control" value={formData.paymentMethod} onChange={handleChange} disabled={isSubmitting}>
                {PAYMENT_METHODS.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Notes</label>
            <textarea name="notes" className="form-control" rows="3" value={formData.notes} onChange={handleChange} disabled={isSubmitting} />
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-danger" onClick={handleDelete} disabled={isSubmitting}>
              🗑️ Delete
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : '💾 Update Expense'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditExpense;