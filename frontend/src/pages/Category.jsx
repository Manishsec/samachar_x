import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NewsCard from '../components/NewsCard';
import Sidebar from '../components/Sidebar';
import { getNews } from '../data/news';
import { CATEGORY_ICONS, CATEGORY_COLORS } from '../utils/constants';

const Category = () => {
  const { categoryId } = useParams();
  const [news, setNews] = useState([]);

  useEffect(() => {
    const data = getNews({ category: categoryId, limit: 20 });
    setNews(data.news || []);
  }, [categoryId]);

  const categoryIcon = CATEGORY_ICONS[categoryId] || '📰';
  const categoryColor = CATEGORY_COLORS[categoryId] || '#1e3a8a';
  const categoryTitle = categoryId.charAt(0).toUpperCase() + categoryId.slice(1);

  return (
    <div className="category-page">
      <div className="category-banner" style={{ background: `linear-gradient(135deg, ${categoryColor}, ${categoryColor}dd)` }}>
        <div className="category-banner-content">
          <span className="category-icon-large">{categoryIcon}</span>
          <h1 className="category-title-large">{categoryTitle}</h1>
          <p className="category-description-large">
            Stay updated with the latest {categoryTitle.toLowerCase()} news, analysis, and exclusive stories
          </p>
        </div>
      </div>

      <div className="content-wrapper">
        <main className="main-content-area">
          {news.length > 0 ? (
            <div className="news-list-modern">
              {news.map((item) => (
                <NewsCard key={item._id} news={item} modern={true} />
              ))}
            </div>
          ) : (
            <div className="no-news">
              <div className="no-news-icon">{categoryIcon}</div>
              <h3>No news available</h3>
              <p>Check back later for updates in {categoryTitle.toLowerCase()}.</p>
            </div>
          )}
        </main>

        <Sidebar />
      </div>
    </div>
  );
};

export default Category;
