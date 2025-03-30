import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <Link to="/" className="logo">
            <img src="/images/logo.png" alt="Crimble Logo" />
            <span>Crimble</span>
          </Link>

          <div className="nav-links">
            <Link to="/" className={isActive('/')}>Core Learning</Link>
            <Link to="/jobs" className={isActive('/jobs')}>Jobs</Link>
            <Link to="/talent" className={isActive('/talent')}>Talent Management</Link>
            <Link to="/analytics" className={isActive('/analytics')}>Analytics</Link>
            <Link to="/admin/content" className={isActive('/admin/content')}>Content Management</Link>
          </div>

          <div className="nav-buttons">
            <button className="btn-outline">Sign In</button>
            <button className="btn-primary">Sign Up</button>
          </div>

          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <i className={mobileMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>Core Learning</Link>
          <Link to="/jobs" onClick={() => setMobileMenuOpen(false)}>Jobs</Link>
          <Link to="/talent" onClick={() => setMobileMenuOpen(false)}>Talent Management</Link>
          <Link to="/analytics" onClick={() => setMobileMenuOpen(false)}>Analytics</Link>
          <Link to="/admin/content" onClick={() => setMobileMenuOpen(false)}>Content Management</Link>
          <button className="btn-outline">Sign In</button>
          <button className="btn-primary">Sign Up</button>
        </div>
      )}
    </header>
  );
};

export default Header; 