// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ExpenseProvider } from './context/ExpenseContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddExpense from './pages/AddExpense';
import EditExpense from './pages/EditExpense';
import ExpenseDetails from './pages/ExpenseDetails';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import SetBudget from './pages/SetBudget';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function AppContent() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="app-loading">
        <div className="app-loading-spinner"></div>
        <p className="app-loading-text">Loading your account...</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/set-budget" element={<SetBudget />} />
            <Route path="/add-expense" element={<AddExpense />} />
            <Route path="/edit-expense/:id" element={<EditExpense />} />
            <Route path="/expense/:id" element={<ExpenseDetails />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ExpenseProvider>
        <Router>
          <AppContent />
        </Router>
      </ExpenseProvider>
    </AuthProvider>
  );
}

export default App;