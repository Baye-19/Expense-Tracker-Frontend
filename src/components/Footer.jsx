// ============================================
// src/components/Footer.jsx
// FOOTER COMPONENT
// Simple footer that appears at the bottom of
// every page. Shows copyright and links.
// ============================================

import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Footer.css';

const Footer = () => {
  const { isAuthenticated } = useAuth();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Footer top section */}
        <div className="footer-content">
          {/* Brand column */}
          <div className="footer-brand">
            <h3 className="footer-logo">
              <span>💰</span> ExpenseTracker
            </h3>
            <p className="footer-description">
              Take control of your finances. Track expenses, set budgets, 
              and achieve your financial goals.
            </p>
          </div>

          {/* Quick links column */}
          <div className="footer-links">
            <h4 className="footer-heading">Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              {isAuthenticated ? (
                <>
                  <li><Link to="/dashboard">Dashboard</Link></li>
                  <li><Link to="/add-expense">Add Expense</Link></li>
                  <li><Link to="/reports">Reports</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/register">Register</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Support links column */}
          <div className="footer-links">
            <h4 className="footer-heading">Support</h4>
            <ul>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/settings">Settings</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><a href="#privacy">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Footer bottom bar */}
        <div className="footer-bottom">
          <p>© {currentYear} ExpenseTracker. All rights reserved.</p>
          <p className="footer-tagline">
            Built By Baye Nigus
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;