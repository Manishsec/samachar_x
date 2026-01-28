import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getTrendingNews } from '../data/news';
import { CATEGORIES } from '../utils/constants';

const Sidebar = () => {
  const location = useLocation();
  const trendingNews = getTrendingNews(5);

  return (
    <aside className="sidebar">
      <div className="sidebar-card trending-card">
        <h3 className="sidebar-title">🔥 Trending Now</h3>
        <ul className="trending-list">
          {trendingNews.map((news, index) => (
            <li key={news._id} className="trending-item">
              <span className="trending-number">{index + 1}</span>
              <Link to={`/article/${news._id}`} className="trending-link">
                {news.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-card categories-card">
        <h3 className="sidebar-title">📂 Categories</h3>
        <div className="category-links">
          {CATEGORIES.map((category) => {
            const isActive = location.pathname === `/category/${category.slug}`;
            return (
              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                className={`category-link ${isActive ? 'active' : ''}`}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
