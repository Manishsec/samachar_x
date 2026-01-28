import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import NewsCard from '../components/NewsCard';
import Sidebar from '../components/Sidebar';
import { searchNews as searchNewsData } from '../data/news';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query.trim() && query.length >= 2) {
      const searchResults = searchNewsData(query);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="search-page">
      <div className="search-header">
        <div className="search-header-content">
          <h1 className="search-title">
            {query ? `Search Results for "${query}"` : 'Search News'}
          </h1>
          <p className="search-count">
            {results.length > 0
              ? `Found ${results.length} ${results.length === 1 ? 'result' : 'results'}`
              : query ? 'No results found' : 'Enter a search term to find news articles'}
          </p>
        </div>
      </div>

      <div className="content-wrapper">
        <main className="main-content-area">
          {results.length > 0 ? (
            <div className="news-list-modern">
              {results.map((item) => (
                <NewsCard key={item._id} news={item} modern={true} />
              ))}
            </div>
          ) : query ? (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h2>No articles found</h2>
              <p>Try searching with different keywords or check your spelling.</p>
              <div className="search-suggestions">
                <p>Popular searches:</p>
                <div className="suggestion-tags">
                  {['Technology', 'Business', 'Sports', 'Climate'].map(term => (
                    <a key={term} href={`/search?q=${term}`} className="suggestion-tag">
                      {term}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="no-results">
              <div className="no-results-icon">📰</div>
              <h2>Search SamacharX</h2>
              <p>Use the search bar above to find news articles.</p>
            </div>
          )}
        </main>

        <Sidebar />
      </div>
    </div>
  );
};

export default Search;
