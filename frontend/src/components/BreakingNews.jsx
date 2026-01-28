import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getNews } from '../data/news';

const BreakingNews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [breakingNews, setBreakingNews] = useState([]);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const data = getNews({ limit: 5 });
    setBreakingNews(data.news.map(n => ({
      id: n._id,
      text: n.title
    })));
  }, []);

  useEffect(() => {
    if (breakingNews.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % breakingNews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [breakingNews.length, isPaused]);

  if (breakingNews.length === 0) return null;

  const currentNews = breakingNews[currentIndex];

  return (
    <div
      className="breaking-news"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="breaking-news-container">
        <span className="breaking-news-label">BREAKING</span>
        <div className="breaking-news-content">
          <Link
            to={`/article/${currentNews.id}`}
            className="breaking-news-link"
          >
            <p className="breaking-news-text">{currentNews.text}</p>
          </Link>
        </div>
        <div className="breaking-news-indicators">
          {breakingNews.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to news ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;
