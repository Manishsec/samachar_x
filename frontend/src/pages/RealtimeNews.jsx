import React, { useState, useEffect, useCallback } from 'react';
import RSSNewsCard from '../components/RSSNewsCard';
import RSSSourceFilter from '../components/RSSSourceFilter';
import { fetchAllRSSFeeds, getRSSSources } from '../services/rssService';

const RealtimeNews = () => {
    const [newsItems, setNewsItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSources, setSelectedSources] = useState(() =>
        getRSSSources().map(s => s.id)
    );
    const [lastUpdated, setLastUpdated] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    const loadNews = useCallback(async (showRefreshIndicator = false) => {
        if (showRefreshIndicator) {
            setIsRefreshing(true);
        } else {
            setLoading(true);
        }
        setError(null);

        try {
            const items = await fetchAllRSSFeeds(selectedSources);
            setNewsItems(items);
            setLastUpdated(new Date());
        } catch (err) {
            setError('Failed to load news. Please try again.');
            console.error('Error loading news:', err);
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    }, [selectedSources]);

    useEffect(() => {
        loadNews();
    }, [loadNews]);

    useEffect(() => {
        const interval = setInterval(() => {
            loadNews(true);
        }, 5 * 60 * 1000);

        return () => clearInterval(interval);
    }, [loadNews]);

    const handleSourceToggle = (sourceId) => {
        setSelectedSources(prev => {
            if (prev.includes(sourceId)) {
                return prev.filter(id => id !== sourceId);
            }
            return [...prev, sourceId];
        });
    };

    const handleSelectAll = () => {
        setSelectedSources(getRSSSources().map(s => s.id));
    };

    const handleClearAll = () => {
        setSelectedSources([]);
    };

    const handleRefresh = () => {
        loadNews(true);
    };

    const formatLastUpdated = () => {
        if (!lastUpdated) return '';
        return lastUpdated.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="realtime-news-page">
            <div className="realtime-news-header">
                <div className="realtime-header-content">
                    <div className="realtime-title-section">
                        <h1 className="realtime-title">
                            <span className="realtime-icon">🌐</span>
                            Realtime News
                        </h1>
                        <p className="realtime-subtitle">
                            Live updates from {selectedSources.length} news sources across India
                        </p>
                    </div>

                    <div className="realtime-actions">
                        <button
                            className={`realtime-filter-toggle ${showFilters ? 'active' : ''}`}
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <span>🔧</span>
                            <span className="filter-toggle-text">Filters</span>
                            <span className="filter-count">{selectedSources.length}</span>
                        </button>

                        <button
                            className={`realtime-refresh-btn ${isRefreshing ? 'refreshing' : ''}`}
                            onClick={handleRefresh}
                            disabled={isRefreshing}
                        >
                            <span className="refresh-icon">🔄</span>
                            <span className="refresh-text">Refresh</span>
                        </button>

                        {lastUpdated && (
                            <span className="realtime-last-updated">
                                Updated: {formatLastUpdated()}
                            </span>
                        )}
                    </div>
                </div>

                <div className={`realtime-filters-panel ${showFilters ? 'open' : ''}`}>
                    <RSSSourceFilter
                        selectedSources={selectedSources}
                        onSourceToggle={handleSourceToggle}
                        onSelectAll={handleSelectAll}
                        onClearAll={handleClearAll}
                    />
                </div>
            </div>

            <div className="realtime-news-content">
                {loading && !isRefreshing && (
                    <div className="realtime-loading">
                        <div className="realtime-loader">
                            <div className="loader-pulse"></div>
                            <div className="loader-pulse"></div>
                            <div className="loader-pulse"></div>
                        </div>
                        <p>Fetching latest news from {selectedSources.length} sources...</p>
                    </div>
                )}

                {error && (
                    <div className="realtime-error">
                        <span className="error-icon">⚠️</span>
                        <p>{error}</p>
                        <button onClick={() => loadNews()} className="error-retry-btn">
                            Try Again
                        </button>
                    </div>
                )}

                {!loading && !error && newsItems.length === 0 && (
                    <div className="realtime-empty">
                        <span className="empty-icon">📭</span>
                        <h3>No news available</h3>
                        <p>
                            {selectedSources.length === 0
                                ? 'Please select at least one news source from the filters above.'
                                : 'Unable to fetch news from selected sources. Please try again.'}
                        </p>
                        {selectedSources.length === 0 && (
                            <button onClick={handleSelectAll} className="empty-select-btn">
                                Select All Sources
                            </button>
                        )}
                    </div>
                )}

                {!loading && !error && newsItems.length > 0 && (
                    <>
                        <div className="realtime-stats">
                            <span className="stat-item">
                                <span className="stat-icon">📰</span>
                                <span className="stat-value">{newsItems.length}</span>
                                <span className="stat-label">articles</span>
                            </span>
                            <span className="stat-item">
                                <span className="stat-icon">📡</span>
                                <span className="stat-value">{selectedSources.length}</span>
                                <span className="stat-label">sources</span>
                            </span>
                        </div>

                        <div className="realtime-news-grid">
                            {newsItems.map((item) => (
                                <RSSNewsCard key={item.id} item={item} />
                            ))}
                        </div>
                    </>
                )}

                {isRefreshing && (
                    <div className="realtime-refresh-overlay">
                        <div className="refresh-spinner"></div>
                        <span>Updating...</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RealtimeNews;
