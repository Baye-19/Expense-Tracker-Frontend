// ============================================
// src/pages/NotFound.jsx
// 404 NOT FOUND PAGE
// Shown when user navigates to a URL that
// doesn't match any route.
// ============================================

import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{
      textAlign: 'center',
      padding: '4rem 2rem',
      animation: 'fadeInUp 0.5s ease',
    }}>
      <div style={{ fontSize: '6rem', marginBottom: '1rem' }}>🔮</div>
      <h1 style={{ fontSize: '4rem', fontWeight: 800, color: 'var(--color-gray-900)', marginBottom: '1rem' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', color: 'var(--color-gray-600)', marginBottom: '0.5rem' }}>Page Not Found</h2>
      <p style={{ color: 'var(--color-gray-500)', marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem' }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary btn-lg">
        🏠 Back to Home
      </Link>
    </div>
  );
};

export default NotFound;