import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="not-found-page">
            <div className="not-found-container">
                <div className="not-found-icon">📰</div>
                <h1 className="not-found-code">404</h1>
                <h2 className="not-found-title">Page Not Found</h2>
                <p className="not-found-message">
                    Oops! The page you're looking for doesn't exist or has been moved.
                </p>
                <div className="not-found-actions">
                    <Link to="/" className="not-found-btn primary">
                        🏠 Go Home
                    </Link>
                    <Link to="/category/breaking" className="not-found-btn secondary">
                        🔥 Breaking News
                    </Link>
                </div>
                <div className="not-found-links">
                    <p>Or explore our categories:</p>
                    <div className="not-found-categories">
                        <Link to="/category/technology">Technology</Link>
                        <Link to="/category/business">Business</Link>
                        <Link to="/category/sports">Sports</Link>
                        <Link to="/category/entertainment">Entertainment</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
