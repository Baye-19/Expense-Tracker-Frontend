// src/pages/AddExpense.jsx (UPDATED)
// Now uses global ExpenseContext

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExpenses } from '../context/ExpenseContext'; // ← ADD THIS
import './AddExpense.css';

const CATEGORIES = ['Food', 'Transport', 'Entertainment', 'Utilities', 'Shopping', 'Healthcare', 'Education', 'Other'];
const PAYMENT_METHODS = ['Cash', 'Credit Card', 'Debit Card', 'Bank Transfer', 'Other'];

const AddExpense = () => {
  const navigate = useNavigate();
  const { addExpense } = useExpenses(); // ← GET GLOBAL ADD FUNCTION

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
    paymentMethod: 'Cash',
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.amount || parseFloat(formData.amount) <= 0) newErrors.amount = 'Please enter a valid amount greater than 0';
    if (!formData.date) newErrors.date = 'Date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // ADD TO GLOBAL CONTEXT (this updates ALL pages!)
      addExpense({
        title: formData.title,
        description: formData.description,
        amount: parseFloat(formData.amount),
        category: formData.category,
        date: formData.date,
        paymentMethod: formData.paymentMethod,
        notes: formData.notes,
      });

      // Show success and redirect
      setShowSuccess(true);
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (error) {
      setErrors({ form: 'Failed to add expense.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="add-expense-page">
        <div className="success-card card">
          <div className="success-icon">✅</div>
          <h2>Expense Added Successfully!</h2>
          <p>Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="add-expense-page">
      <div className="page-header">
        <div className="page-header-left">
          <button onClick={() => navigate(-1)} className="btn btn-ghost back-btn">← Back</button>
          <div>
            <h1 className="page-title">Add New Expense</h1>
            <p className="page-subtitle">Record a new expense to track your spending</p>
          </div>
        </div>
      </div>

      <div className="card">
        {errors.form && <div className="auth-alert auth-alert-error">{errors.form}</div>}

        <form onSubmit={handleSubmit} className="expense-form" noValidate>
          <div className="form-group">
            <label className="form-label form-label-required">Expense Title</label>
            <input type="text" name="title" className={`form-control ${errors.title ? 'error' : ''}`} placeholder="e.g., Weekly groceries" value={formData.title} onChange={handleChange} disabled={isSubmitting} />
            {errors.title && <span className="form-error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Description (Optional)</label>
            <input type="text" name="description" className="form-control" placeholder="Brief description" value={formData.description} onChange={handleChange} disabled={isSubmitting} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label form-label-required">Amount ($)</label>
              <input type="number" name="amount" className={`form-control ${errors.amount ? 'error' : ''}`} placeholder="0.00" step="any" min="0" value={formData.amount} onChange={handleChange} disabled={isSubmitting} />
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
            <label className="form-label">Notes (Optional)</label>
            <textarea name="notes" className="form-control" rows="3" placeholder="Any additional notes..." value={formData.notes} onChange={handleChange} disabled={isSubmitting} />
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => setFormData({ title: '', description: '', amount: '', category: 'Food', date: new Date().toISOString().split('T')[0], paymentMethod: 'Cash', notes: '' })} disabled={isSubmitting}>🔄 Reset</button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Adding...' : '✅ Add Expense'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;