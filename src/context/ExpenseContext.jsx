import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { fetchExpenses, createExpense, editExpense, removeExpense } from '../services/api';

const ExpenseContext = createContext();

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) throw new Error('useExpenses must be used within ExpenseProvider');
  return context;
};

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const loadExpenses = useCallback(async () => {
    if (!user?.token) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetchExpenses();
      setExpenses(res.data);
    } catch (err) {
      setError('Failed to load expenses');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { loadExpenses(); }, [loadExpenses]);

  const addExpense = async (data) => {
    const res = await createExpense(data);
    setExpenses(prev => [res.data, ...prev]);
    return res.data;
  };

  const updateExpense = async (id, data) => {
    const res = await editExpense(id, data);
    setExpenses(prev => prev.map(e => e.id === id ? res.data : e));
    return res.data;
  };

  const deleteExpense = async (id) => {
    await removeExpense(id);
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  const getExpenseById = (id) => expenses.find(e => e.id === Number(id)) || null;
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalIncome = 5000;
  const balance = totalIncome - totalExpenses;

  return (
    <ExpenseContext.Provider value={{
      expenses, loading, error, addExpense, updateExpense, deleteExpense,
      getExpenseById, totalExpenses, totalIncome, balance, refresh: loadExpenses
    }}>
      {children}
    </ExpenseContext.Provider>
  );
};