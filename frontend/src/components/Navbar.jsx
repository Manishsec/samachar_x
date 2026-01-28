import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CATEGORIES } from '../utils/constants';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <span className="logo-icon">📰</span>
            <span className="logo-text">Samachar<span className="logo-x">X</span></span>
          </Link>

          <ul className="navbar-menu">
            <li className="navbar-item">
              <Link to="/" className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}>
                🏠 Home
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/realtime" className={`navbar-link realtime-link ${location.pathname === '/realtime' ? 'active' : ''}`}>
                🌐 Realtime
              </Link>
            </li>
            {CATEGORIES.map((category) => (
              <li className="navbar-item" key={category.slug}>
                <Link
                  to={`/category/${category.slug}`}
                  className={`navbar-link ${location.pathname === `/category/${category.slug}` ? 'active' : ''}`}
                >
                  {category.icon} {category.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="navbar-actions">
            <form className="search-form-inline" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input-inline"
              />
              <button type="submit" className="search-button-inline">
                🔍
              </button>
            </form>

            <button
              className="theme-toggle"
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>

            <button
              className="mobile-menu-toggle"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)} />
        <div className="mobile-menu-content">
          <div className="mobile-menu-header">
            <Link to="/" className="navbar-logo" onClick={() => setMobileMenuOpen(false)}>
              <span className="logo-icon">📰</span>
              <span className="logo-text">Samachar<span className="logo-x">X</span></span>
            </Link>
            <button className="mobile-menu-close" onClick={() => setMobileMenuOpen(false)}>
              ✕
            </button>
          </div>

          <form className="mobile-search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mobile-search-input"
            />
            <button type="submit" className="mobile-search-button">
              🔍
            </button>
          </form>

          <ul className="mobile-menu-links">
            <li>
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                🏠 Home
              </Link>
            </li>
            <li>
              <Link to="/realtime" onClick={() => setMobileMenuOpen(false)} className="realtime-mobile-link">
                🌐 Realtime News
              </Link>
            </li>
            {CATEGORIES.map((category) => (
              <li key={category.slug}>
                <Link
                  to={`/category/${category.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {category.icon} {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
