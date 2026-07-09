
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  // STATE & HOOKS
 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  // HANDLERS
  
  // Logout handler: logs out and redirects to home
  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false); // Close mobile menu if open
    navigate('/');
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when a link is clicked
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // HELPER: Get user's first name for greeting

  const getFirstName = () => {
    if (!user?.name) return 'User';
    return user.name.split(' ')[0];
  };

  // RENDER
  return (
    <nav className="navbar">
      <div className="navbar-container">
  
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <span className="logo-icon">💰</span>
          <span className="logo-text">ExpenseTracker</span>
        </Link>

        {/* ====================================
            DESKTOP NAVIGATION
            Hidden on mobile, shown on desktop
            ==================================== */}
        <div className="navbar-links">
          {isAuthenticated ? (
            // ================================
            // LOGGED-IN LINKS
            // ================================
            <>
              <NavLink to="/dashboard" className="nav-link">
                <span className="nav-icon">📊</span>
                Dashboard
              </NavLink>
              <NavLink to="/add-expense" className="nav-link">
                <span className="nav-icon">➕</span>
                Add Expense
              </NavLink>
              <NavLink to="/reports" className="nav-link">
                <span className="nav-icon">📈</span>
                Reports
              </NavLink>
              
              {/* User dropdown area */}
              <div className="nav-user-section">
                <NavLink to="/profile" className="nav-link nav-user-link">
                    {user?.profileImage ? (
                      <img 
                        src={user.profileImage} 
                        alt={getFirstName()}
                        className="user-avatar-img"
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '2px solid #e0e7ff'
                        }}
                      />
                    ) : (
                      <div className="user-avatar">
                        {getFirstName().charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span>{getFirstName()}</span>
                  </NavLink>
                <button 
                  onClick={handleLogout} 
                  className="btn btn-ghost btn-sm nav-logout-btn"
                  title="Logout"
                >
                  Logout🚪
                </button>
              </div>
            </>
          ) : (
            // ================================
            // GUEST LINKS
            // ================================
            <>
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
              <NavLink to="/register" className="btn btn-primary btn-sm">
                Get Started
              </NavLink>
            </>
          )}
        </div>

        {/* ====================================
            MOBILE HAMBURGER BUTTON
            Only visible on small screens
            ==================================== */}
        <button 
          className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      {/* ====================================
          MOBILE MENU
          Slides down when hamburger is clicked
          ==================================== */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        {isAuthenticated ? (
          <>
            <NavLink to="/dashboard" className="mobile-link" onClick={closeMobileMenu}>
              📊 Dashboard
            </NavLink>
            <NavLink to="/add-expense" className="mobile-link" onClick={closeMobileMenu}>
              ➕ Add Expense
            </NavLink>
            <NavLink to="/reports" className="mobile-link" onClick={closeMobileMenu}>
              📈 Reports
            </NavLink>
            <NavLink to="/profile" className="mobile-link" onClick={() => setMobileMenu(false)}>
              👤 Profile
            </NavLink>
            <NavLink to="/settings" className="mobile-link" onClick={closeMobileMenu}>
              ⚙️ Settings
            </NavLink>
            <button onClick={handleLogout} className="mobile-link mobile-logout">
              🚪 Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="mobile-link" onClick={closeMobileMenu}>
              🔑 Login
            </NavLink>
            <NavLink to="/register" className="mobile-link mobile-cta" onClick={closeMobileMenu}>
              ✨ Get Started
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;