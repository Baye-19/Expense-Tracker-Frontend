// ============================================
// src/components/ProtectedRoute.jsx
// PROTECTED ROUTE COMPONENT
// This is a "layout route" that wraps all
// protected pages. It checks if the user is
// authenticated before showing the page.
//
// KEY CONCEPT: React Router Layout Routes
// A layout route uses <Outlet /> to render
// child routes. This lets us wrap multiple
// routes with the same logic (auth check).
// ============================================

import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  // ==========================================
  // HOOKS
  // useAuth() - Get authentication state
  // useLocation() - Get current URL (so we can
  //   redirect back after login)
  // ==========================================
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // ==========================================
  // LOADING STATE
  // While checking if user is logged in,
  // show nothing (or a spinner)
  // ==========================================
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh' 
      }}>
        <div className="app-loading-spinner" 
             style={{ borderTopColor: 'var(--color-primary)' }}></div>
      </div>
    );
  }

  // ==========================================
  // AUTH CHECK
  // If NOT authenticated, redirect to login page
  // The 'state' prop remembers where the user
  // was trying to go so we can send them back
  // after successful login.
  // ==========================================
  if (!isAuthenticated) {
    return (
      <Navigate 
        to="/login" 
        state={{ from: location.pathname }} 
        replace 
      />
    );
  }

  // ==========================================
  // AUTHENTICATED - SHOW PROTECTED CONTENT
  // <Outlet /> renders whatever child route
  // matched (Dashboard, AddExpense, etc.)
  // ==========================================
  return <Outlet />;
};

// ============================================
// WHAT YOU LEARNED:
// 1. <Outlet /> renders nested route content
// 2. <Navigate /> does programmatic redirects
// 3. useLocation() gives access to current URL
// 4. Location state passes data between routes
// 5. Layout routes protect multiple pages at once
// ============================================

export default ProtectedRoute;