// ============================================
// src/pages/Home.jsx
// HOME PAGE (LANDING PAGE)
// The first page visitors see. It should be
// welcoming and explain what our app does.
// Shows different content for logged-in users.
//
// KEY CONCEPT: Presentational Component
// This page is mostly presentational - it
// displays information and links. It doesn't
// manage complex state or fetch data.
// ============================================

import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  // Get authentication state
  const { isAuthenticated, user } = useAuth();

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="home">
      {/* ========================================
          HERO SECTION
          Main headline and call to action
          ======================================== */}
      <section className="hero">
        <div className="hero-content">
          {/* Badge */}
          <div className="hero-badge">
            <span className="badge-dot"></span>
            Trusted by thousands of users
          </div>

          {/* Main heading */}
          <h1 className="hero-title">
            {isAuthenticated ? (
              <>
                {getGreeting()},{' '}
                <span className="text-gradient">{user?.name?.split(' ')[0]}</span>
              </>
            ) : (
              <>
                Take Control of Your{' '}
                <span className="text-gradient">Finances</span>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle">
            {isAuthenticated
              ? 'Ready to track your expenses? Your financial dashboard is just a click away.'
              : 'Track every expense, set budgets, and achieve your financial goals with our easy-to-use expense tracker.'}
          </p>

          {/* Call to action buttons */}
          <div className="hero-actions">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="btn btn-primary btn-lg">
                  📊 Go to Dashboard
                </Link>
                <Link to="/add-expense" className="btn btn-outline btn-lg">
                  ➕ Add New Expense
                </Link>
              </>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary btn-lg">
                  🚀 Get Started 
                </Link>
                <Link to="/login" className="btn btn-outline btn-lg">
                  🔑 Sign In
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Hero illustration area */}
        <div className="hero-visual">
          <div className="hero-card">
            <div className="hero-card-header">
              <span className="hero-card-dot red"></span>
              <span className="hero-card-dot yellow"></span>
              <span className="hero-card-dot green"></span>
            </div>
            <div className="hero-card-content">
              <div className="hero-stat-row">
                <div className="hero-stat">
                  <span className="hero-stat-label">Balance</span>
                  <span className="hero-stat-value positive">$12,450.00</span>
                </div>
                <div className="hero-stat">
                  <span className="hero-stat-label">Expenses</span>
                  <span className="hero-stat-value negative">-$3,280.00</span>
                </div>
              </div>
              <div className="hero-chart-bars">
                <div className="bar" style={{height: '40px'}}></div>
                <div className="bar" style={{height: '65px'}}></div>
                <div className="bar" style={{height: '30px'}}></div>
                <div className="bar" style={{height: '80px'}}></div>
                <div className="bar" style={{height: '50px'}}></div>
                <div className="bar active" style={{height: '70px'}}></div>
                <div className="bar" style={{height: '45px'}}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          FEATURES SECTION
          Three key features of our app
          ======================================== */}
      <section className="features">
        <h2 className="section-title">Why Choose ExpenseTracker?</h2>
        <div className="features-grid">
          {/* Feature 1 */}
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Visual Reports</h3>
            <p>Beautiful charts and graphs that help you understand your spending patterns at a glance.</p>
          </div>

          {/* Feature 2 */}
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure & Private</h3>
            <p>Your financial data is encrypted and protected. We never share your information with third parties.</p>
          </div>

          {/* Feature 3 */}
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Works Everywhere</h3>
            <p>Responsive design that works perfectly on desktop, tablet, and mobile devices. Track on the go!</p>
          </div>

          {/* Feature 4 */}
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Budget Goals</h3>
            <p>Set monthly budgets for different categories and get alerts when you're close to your limit.</p>
          </div>

          {/* Feature 5 */}
          <div className="feature-card">
            <div className="feature-icon">🏷️</div>
            <h3>Smart Categories</h3>
            <p>Automatically categorize your expenses. Food, transport, entertainment - we organize it all.</p>
          </div>

          {/* Feature 6 */}
          <div className="feature-card">
            <div className="feature-icon">📤</div>
            <h3>Export Data</h3>
            <p>Export your expense reports to CSV or PDF. Perfect for tax season or financial planning.</p>
          </div>
        </div>
      </section>

      {/* ========================================
          STATS SECTION
          Social proof numbers
          ======================================== */}
      <section className="stats-section">
        <div className="stats-grid-home">
          <div className="stat-item">
            <span className="stat-number">5K+</span>
            <span className="stat-label">Active Users</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">$20M+</span>
            <span className="stat-label">Transactions Tracked</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">4.9</span>
            <span className="stat-label">User Rating</span>
          </div>
        </div>
      </section>

      {/* ========================================
          CTA SECTION
          Final call to action
          ======================================== */}
      <section className="cta-section">
        <h2>Ready to Start Tracking?</h2>
        <p>Join thousands of users who are taking control of their finances today.</p>
        {!isAuthenticated && (
          <Link to="/register" className="btn btn-primary btn-lg">
            ✨ Create Account
          </Link>
        )}
      </section>
    </div>
  );
};

export default Home;