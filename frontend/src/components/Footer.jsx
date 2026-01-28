import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content footer-simple">
          <div className="footer-brand">
            <div className="footer-logo-section">
              <span className="footer-logo-icon">📰</span>
              <span className="footer-logo-text">Samachar<span className="footer-logo-x">X</span></span>
            </div>
            <p className="footer-description">
              Your trusted source for breaking news, in-depth analysis, and comprehensive
              coverage of events that matter. Stay informed with SamacharX.
            </p>
          </div>

          <div className="footer-legal">
            <h4 className="footer-title">Legal</h4>
            <ul className="footer-links">
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/cookies">Cookie Policy</Link></li>
              <li><Link to="/disclaimer">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p className="copyright">
            © {currentYear} SamacharX. All rights reserved.
          </p>
          <p className="footer-tagline">
            News Beyond Headlines
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
