// src/pages/Dashboard.jsx - Updated stats section
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useExpenses } from '../context/ExpenseContext';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import ExpenseCard from '../components/ExpenseCard';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import EmptyState from '../components/EmptyState';
import './Dashboard.css';

const CATEGORY_OPTIONS = [
  { value: 'All', label: '📂 All Categories' },
  { value: 'Food', label: '🍔 Food' },
  { value: 'Transport', label: '🚗 Transport' },
  { value: 'Entertainment', label: '🎬 Entertainment' },
  { value: 'Utilities', label: '⚡ Utilities' },
  { value: 'Shopping', label: '🛍️ Shopping' },
  { value: 'Healthcare', label: '🏥 Healthcare' },
  { value: 'Education', label: '📚 Education' },
  { value: 'Other', label: '📌 Other' },
];

const Dashboard = () => {
  const { user } = useAuth();
  const { expenses, addExpense, totalExpenses, loading } = useExpenses();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortBy, setSortBy] = useState('date');
  const [quickForm, setQuickForm] = useState({
    title: '', amount: '', category: 'Food',
    date: new Date().toISOString().split('T')[0], paymentMethod: 'Cash'
  });
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  // Budget calculations
  const budget = user?.budget || 0;
  const budgetType = user?.budgetType || 'monthly';
  const remaining = budget - totalExpenses;
  const percentUsed = budget > 0 ? ((totalExpenses / budget) * 100).toFixed(1) : 0;

  const filteredExpenses = expenses
    .filter(exp => {
      if (!searchTerm.trim()) return true;
      const s = searchTerm.toLowerCase();
      return exp.title.toLowerCase().includes(s) || exp.category.toLowerCase().includes(s);
    })
    .filter(exp => filterCategory === 'All' || exp.category === filterCategory)
    .sort((a, b) => {
      if (sortBy === 'amount') return b.amount - a.amount;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return new Date(b.date) - new Date(a.date);
    });

  const recentExpenses = filteredExpenses.slice(0, 5);

  const handleQuickAdd = async (e) => {
    e.preventDefault();
    if (!quickForm.title.trim() || !quickForm.amount || !quickForm.date) return;
    try {
      await addExpense({
        title: quickForm.title, description: '',
        amount: parseFloat(quickForm.amount), category: quickForm.category,
        date: quickForm.date, paymentMethod: quickForm.paymentMethod, notes: ''
      });
      setQuickForm({ title: '', amount: '', category: 'Food', date: new Date().toISOString().split('T')[0], paymentMethod: 'Cash' });
      setShowQuickAdd(false);
    } catch { alert('Failed to add expense'); }
  };

  if (loading) return <div className="card" style={{textAlign:'center',padding:'4rem'}}><p>Loading expenses...</p></div>;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Welcome back, {user?.name?.split(' ')[0]} 👋</h1>
          <p className="dashboard-subtitle">
            {budget > 0 ? `Your ${budgetType} budget: $${budget.toLocaleString()}` : 'Set a budget to start tracking!'}
          </p>
        </div>
        <Link to="/add-expense" className="btn btn-primary">➕ Add Expense</Link>
      </div>

      {/* Budget Warning */}
      {percentUsed >= 80 && budget > 0 && (
        <div className="budget-warning" style={{
          background: percentUsed >= 100 ? '#fee2e2' : '#fef3c7',
          border: `2px solid ${percentUsed >= 100 ? '#ef4444' : '#f59e0b'}`,
          borderRadius: '0.75rem',
          padding: '1rem 1.5rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          fontWeight: 600,
          color: percentUsed >= 100 ? '#991b1b' : '#92400e'
        }}>
          <span style={{fontSize:'1.5rem'}}>{percentUsed >= 100 ? '🚨' : '⚠️'}</span>
          {percentUsed >= 100 
            ? `You've exceeded your ${budgetType} budget! Spent $${totalExpenses.toFixed(2)} of $${budget.toLocaleString()}`
            : `You've used ${percentUsed}% of your ${budgetType} budget. $${remaining.toFixed(2)} remaining.`
          }
        </div>
      )}

      {/* Budget Progress Bar */}
      {budget > 0 && (
        <div style={{
          background: '#f3f4f6',
          borderRadius: '0.5rem',
          height: '12px',
          marginBottom: '1.5rem',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${Math.min(percentUsed, 100)}%`,
            height: '100%',
            background: percentUsed >= 100 
              ? '#ef4444' 
              : percentUsed >= 80 
                ? '#f59e0b' 
                : '#10b981',
            borderRadius: '0.5rem',
            transition: 'width 0.5s ease'
          }}></div>
        </div>
      )}

      <div className="stats-grid">
        <StatCard
          title={`${budgetType ? budgetType.charAt(0).toUpperCase() + budgetType.slice(1) : ''} Budget`}
          amount={budget}
          color="#6366f1"
          icon="🎯"
        />
        <StatCard
          title="Total Expenses"
          amount={totalExpenses}
          color="#ef4444"
          icon="📤"
        />
        <StatCard
          title="Remaining"
          amount={remaining}
          color={remaining >= 0 ? '#10b981' : '#ef4444'}
          icon={remaining >= 0 ? '💵' : '⚠️'}
        />
      </div>

      <div className="dashboard-controls">
        <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onClear={() => setSearchTerm('')} />
        <FilterDropdown value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} options={CATEGORY_OPTIONS} label="Category:" />
        <FilterDropdown value={sortBy} onChange={(e) => setSortBy(e.target.value)} options={[
          {value:'date',label:'📅 Newest'},{value:'amount',label:'💰 Amount'},{value:'title',label:'🔤 A-Z'}
        ]} label="Sort:" />
      </div>

      <section className="dashboard-section">
        <div className="section-header"><h2 className="section-title-sm">Recent Transactions</h2></div>
        {recentExpenses.length > 0 
          ? recentExpenses.map(exp => <ExpenseCard key={exp.id} expense={exp} />) 
          : <EmptyState icon="🔍" title="No expenses found" description="Start by adding your first expense" />
        }
      </section>

      <section className="dashboard-section">
        <div className="section-header">
          <h2 className="section-title-sm">Quick Add</h2>
          <button className="btn btn-ghost btn-sm" onClick={()=>setShowQuickAdd(!showQuickAdd)}>
            {showQuickAdd?'🔽 Hide':'🔼 Show'}
          </button>
        </div>
        {showQuickAdd && (
          <div className="card quick-add-card">
            <form onSubmit={handleQuickAdd} className="quick-add-form">
              <div className="form-group"><label className="form-label">Title</label><input type="text" name="title" className="form-control" value={quickForm.title} onChange={e=>setQuickForm(p=>({...p,title:e.target.value}))} required /></div>
              <div className="form-group"><label className="form-label">Amount ($)</label><input type="number" name="amount" className="form-control" step="0.01" min="0" value={quickForm.amount} onChange={e=>setQuickForm(p=>({...p,amount:e.target.value}))} required /></div>
              <div className="form-group"><label className="form-label">Category</label><select name="category" className="form-control" value={quickForm.category} onChange={e=>setQuickForm(p=>({...p,category:e.target.value}))}>{CATEGORY_OPTIONS.filter(c=>c.value!=='All').map(c=><option key={c.value}>{c.value}</option>)}</select></div>
              <div className="form-group"><label className="form-label">Date</label><input type="date" name="date" className="form-control" value={quickForm.date} onChange={e=>setQuickForm(p=>({...p,date:e.target.value}))} required /></div>
              <div className="form-group"><label className="form-label">Payment</label><select name="paymentMethod" className="form-control" value={quickForm.paymentMethod} onChange={e=>setQuickForm(p=>({...p,paymentMethod:e.target.value}))}>{['Cash','Credit Card','Debit Card','Bank Transfer'].map(m=><option key={m}>{m}</option>)}</select></div>
              <button type="submit" className="btn btn-primary btn-block">✅ Add Expense</button>
            </form>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;