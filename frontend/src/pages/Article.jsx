import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getNewsById, getRelatedNews } from '../data/news';
import { getCategoryColor, formatDate, formatViews } from '../utils/constants';

const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);

  useEffect(() => {
    const data = getNewsById(id);
    if (data) {
      setArticle(data);
      setRelatedNews(getRelatedNews(data._id, 3));
    }
    window.scrollTo(0, 0);
  }, [id]);

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = article?.title || 'News Article';

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this article: ${url}`)}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  if (!article) {
    return (
      <div className="article-page">
        <div className="article-container">
          <div className="error-container">
            <h2>Article Not Found</h2>
            <p>The article you're looking for doesn't exist.</p>
            <Link to="/" className="back-link">← Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  const categoryName = article.category?.name || 'News';
  const categorySlug = article.category?.slug || categoryName.toLowerCase();
  const categoryColor = getCategoryColor(categorySlug);

  return (
    <div className="article-page">
      <div className="article-container">
        <article className="article">
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-separator">›</span>
            <Link to={`/category/${categorySlug}`}>{categoryName}</Link>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-current">{article.title.substring(0, 30)}...</span>
          </nav>

          <header className="article-header">
            <span
              className="article-category-badge"
              style={{ backgroundColor: categoryColor }}
            >
              {categoryName}
            </span>
            <h1 className="article-title">{article.title}</h1>

            <div className="article-meta">
              <div className="article-author-section">
                <div className="author-avatar">
                  {article.author?.charAt(0).toUpperCase()}
                </div>
                <div className="author-info">
                  <span className="article-author">{article.author}</span>
                  <span className="article-date">{formatDate(article.publishedDate)}</span>
                </div>
              </div>
            </div>
          </header>

          {article.imageUrl && (
            <div className="article-image-container">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="article-image"
                loading="lazy"
              />
            </div>
          )}

          <div className="share-buttons">
            <span className="share-label">Share:</span>
            <div className="share-buttons-row">
              <button className="share-btn" onClick={() => handleShare('facebook')}>
                📘 Facebook
              </button>
              <button className="share-btn" onClick={() => handleShare('twitter')}>
                🐦 Twitter
              </button>
              <button className="share-btn" onClick={() => handleShare('linkedin')}>
                💼 LinkedIn
              </button>
              <button className="share-btn" onClick={() => handleShare('email')}>
                📧 Email
              </button>
            </div>
          </div>

          <div className="article-content">
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>

        {relatedNews.length > 0 && (
          <section className="related-articles">
            <h2 className="section-title-modern">Related Articles</h2>
            <div className="section-divider"></div>
            <div className="related-grid">
              {relatedNews.map((news) => (
                <Link
                  to={`/article/${news._id}`}
                  key={news._id}
                  className="related-card"
                >
                  <img
                    src={news.imageUrl}
                    alt={news.title}
                    className="related-image"
                    loading="lazy"
                  />
                  <div className="related-content">
                    <span className="related-category">
                      {news.category?.name || 'News'}
                    </span>
                    <h3 className="related-title">{news.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Article;
