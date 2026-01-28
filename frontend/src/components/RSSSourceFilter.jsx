import React from 'react';
import { getRSSSources } from '../services/rssService';

const RSSSourceFilter = ({ selectedSources, onSourceToggle, onSelectAll, onClearAll }) => {
    const sources = getRSSSources();
    const allSelected = selectedSources.length === sources.length;
    const noneSelected = selectedSources.length === 0;

    return (
        <div className="rss-source-filter">
            <div className="rss-filter-header">
                <h3 className="rss-filter-title">📡 News Sources</h3>
                <div className="rss-filter-actions">
                    <button
                        className={`rss-filter-btn ${allSelected ? 'active' : ''}`}
                        onClick={onSelectAll}
                        disabled={allSelected}
                    >
                        Select All
                    </button>
                    <button
                        className={`rss-filter-btn ${noneSelected ? 'active' : ''}`}
                        onClick={onClearAll}
                        disabled={noneSelected}
                    >
                        Clear All
                    </button>
                </div>
            </div>

            <div className="rss-source-chips">
                {sources.map((source) => {
                    const isSelected = selectedSources.includes(source.id);
                    return (
                        <button
                            key={source.id}
                            className={`rss-source-chip ${isSelected ? 'selected' : ''}`}
                            onClick={() => onSourceToggle(source.id)}
                            style={{
                                '--source-color': source.color,
                                borderColor: isSelected ? source.color : 'transparent',
                                backgroundColor: isSelected ? `${source.color}15` : 'transparent'
                            }}
                        >
                            <span className="chip-logo">{source.logo}</span>
                            <span className="chip-name">{source.name}</span>
                            {isSelected && <span className="chip-check">✓</span>}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default RSSSourceFilter;
