import React from 'react';
import { Link } from 'react-router-dom';
import { getCategoryColor, formatDate } from '../utils/constants';

const Hero = ({ news }) => {
  if (!news) return null;

  const categoryName = news.category?.name || 'Featured';
  const categorySlug = news.category?.slug || categoryName.toLowerCase().replace(/\s+/g, '-');
  const categoryColor = getCategoryColor(categorySlug);

  return (
    <div className="hero-section">
      <Link to={`/article/${news._id}`} className="hero-link">
        <div className="hero-image-container">
          <img
            src={news.imageUrl || 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1600&h=700&fit=crop'}
            alt={news.title}
            className="hero-image"
          />
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <span
              className="hero-category-badge"
              style={{ backgroundColor: categoryColor }}
            >
              {categoryName.toUpperCase()}
            </span>
            <h1 className="hero-title">{news.title}</h1>
            <p className="hero-description">
              {news.excerpt || news.content?.substring(0, 180)}...
            </p>
            <div className="hero-meta">
              <span className="hero-author">By {news.author}</span>
              <span className="hero-separator">•</span>
              <span className="hero-time">{formatDate(news.publishedDate)}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Hero;
