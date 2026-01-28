import React, { useState } from 'react';
import { formatTimeAgo } from '../services/rssService';

const RSSNewsCard = ({ item }) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const defaultImage = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop';

    return (
        <article className="rss-news-card">
            <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="rss-card-link"
            >
                <div className="rss-card-image-container">
                    {!imageLoaded && !imageError && (
                        <div className="rss-card-image-skeleton">
                            <div className="skeleton-shimmer"></div>
                        </div>
                    )}
                    <img
                        src={imageError || !item.imageUrl ? defaultImage : item.imageUrl}
                        alt={item.title}
                        className={`rss-card-image ${imageLoaded ? 'loaded' : ''}`}
                        onError={handleImageError}
                        onLoad={handleImageLoad}
                        loading="lazy"
                    />
                    <div className="rss-card-overlay"></div>
                    <span
                        className="rss-source-badge"
                        style={{ backgroundColor: item.source.color }}
                    >
                        <span className="rss-source-logo">{item.source.logo}</span>
                        <span className="rss-source-name">{item.source.name}</span>
                    </span>
                </div>

                <div className="rss-card-content">
                    <h3 className="rss-card-title">{item.title}</h3>
                    {item.description && (
                        <p className="rss-card-description">{item.description}</p>
                    )}
                    <div className="rss-card-meta">
                        <span className="rss-card-time">
                            🕐 {formatTimeAgo(item.pubDate)}
                        </span>
                        {item.category && (
                            <span className="rss-card-category">
                                📂 {item.category}
                            </span>
                        )}
                    </div>
                </div>

                <div className="rss-card-hover-effect"></div>
            </a>
        </article>
    );
};

export default RSSNewsCard;
