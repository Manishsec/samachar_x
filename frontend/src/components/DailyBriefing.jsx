import React, { useState, useEffect } from 'react';

const DailyBriefing = () => {
    const [quote, setQuote] = useState(null);
    const [history, setHistory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Quote
                const quoteRes = await fetch('https://dummyjson.com/quotes/random');
                const quoteData = await quoteRes.json();
                setQuote(quoteData);

                // Fetch History
                const date = new Date();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const historyRes = await fetch(`https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/selected/${month}/${day}`);
                const historyData = await historyRes.json();

                if (historyData && historyData.selected && historyData.selected.length > 0) {
                    // Pick a random event to keep it fresh
                    const randomIndex = Math.floor(Math.random() * historyData.selected.length);
                    setHistory(historyData.selected[randomIndex]);
                }
            } catch (error) {
                console.error("Error fetching daily briefing:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="daily-briefing-section">
                <div className="briefing-grid">
                    <div className="briefing-card loading-card">
                        <div className="loading-spinner-small"></div>
                    </div>
                    <div className="briefing-card loading-card">
                        <div className="loading-spinner-small"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="daily-briefing-section">
            <div className="briefing-grid">
                {/* Quote Card */}
                {quote && (
                    <div className="briefing-card quote-card">
                        <div className="card-icon">💡</div>
                        <div className="card-content">
                            <h3 className="card-title">Daily Inspiration</h3>
                            <blockquote className="quote-text">"{quote.quote}"</blockquote>
                            <p className="quote-author">— {quote.author}</p>
                        </div>
                    </div>
                )}

                {/* History Card */}
                {history && (
                    <div className="briefing-card history-card">
                        <div className="card-icon">📜</div>
                        <div className="card-content">
                            <h3 className="card-title">On This Day ({history.year})</h3>
                            <p className="history-text">{history.text}</p>
                            <div className="history-meta">
                                {history.pages && history.pages[0] && (
                                    <a
                                        href={history.pages[0].content_urls.desktop.page}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="read-more-link"
                                    >
                                        Read more on Wikipedia →
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DailyBriefing;
