import React from 'react';
import { Link } from 'react-router-dom';
import { getCategoryColor, formatTimeAgo } from '../utils/constants';

const NewsCard = ({ news, modern = false }) => {
  if (!news) return null;

  const categoryName = news.category?.name || 'News';
  const categorySlug = news.category?.slug || categoryName.toLowerCase().replace(/\s+/g, '-');
  const categoryColor = getCategoryColor(categorySlug);

  return (
    <article className="news-card-modern">
      <Link to={`/article/${news._id}`} className="news-card-link">
        <div className="news-card-image-wrapper">
          <img
            src={news.imageUrl || 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&h=600&fit=crop'}
            alt={news.title}
            className="news-card-image-modern"
            loading="lazy"
          />
          <span
            className="category-badge-modern"
            style={{ backgroundColor: categoryColor }}
          >
            {categoryName}
          </span>
        </div>
        <div className="news-card-body">
          <h3 className="news-card-title-modern">{news.title}</h3>
          <p className="news-card-excerpt-modern">
            {news.excerpt || news.content?.substring(0, 120)}...
          </p>
          <div className="news-card-footer">
            <span className="news-author-modern">✍️ {news.author}</span>
            <span className="news-time-modern">🕐 {formatTimeAgo(news.publishedDate)}</span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default NewsCard;
