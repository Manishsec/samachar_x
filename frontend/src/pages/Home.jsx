import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import NewsCard from '../components/NewsCard';
import Sidebar from '../components/Sidebar';
import { getNews } from '../data/news';

const Home = () => {
  const [featuredNews, setFeaturedNews] = useState(null);
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = getNews({ limit: 10 });
    const allNews = data.news || [];

    if (allNews.length > 0) {
      const featured = allNews.find(n => n.featured) || allNews[0];
      setFeaturedNews(featured);
      setLatestNews(allNews.filter(n => n._id !== featured._id).slice(0, 8));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="home-page">
        <div className="loading-container">
          <div className="loading-spinner">📰</div>
          <p>Loading news...</p>
        </div>
      </div>
    );
  }

  if (!featuredNews && latestNews.length === 0) {
    return (
      <div className="home-page">
        <div className="content-wrapper">
          <main className="main-content-area">
            <div className="no-news-welcome">
              <div className="welcome-icon">📰</div>
              <h1>Welcome to SamacharX</h1>
              <p>Your trusted source for breaking news, in-depth analysis, and comprehensive coverage.</p>
              <div className="welcome-info">
                <p>🤖 News is automatically fetched 8 times daily</p>
                <p>📂 8 categories: Breaking, Technology, Business, Sports, Entertainment, International, National, Cybersecurity</p>
                <p>✨ Fresh content is on its way!</p>
              </div>
            </div>
          </main>
          <Sidebar />
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      {featuredNews && <Hero news={featuredNews} />}

      <div className="content-wrapper">
        <main className="main-content-area">
          <div className="section-header">
            <h2 className="section-title-modern">Latest News</h2>
            <div className="section-divider"></div>
          </div>

          <div className="news-grid-modern">
            {latestNews.map((news) => (
              <NewsCard key={news._id} news={news} modern={true} />
            ))}
          </div>
        </main>

        <Sidebar />
      </div>
    </div>
  );
};

export default Home;
