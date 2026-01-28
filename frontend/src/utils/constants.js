export const CATEGORY_COLORS = {
    breaking: '#f97316',
    national: '#1e3a8a',
    international: '#7c3aed',
    business: '#059669',
    technology: '#0891b2',
    sports: '#dc2626',
    entertainment: '#db2777',
    cybersecurity: '#475569',
};

export const CATEGORY_ICONS = {
    breaking: '🔥',
    national: '🏛️',
    international: '🌍',
    business: '💼',
    technology: '💻',
    sports: '⚽',
    entertainment: '🎬',
    cybersecurity: '🔒',
};

export const CATEGORIES = [
    { name: 'Breaking News', slug: 'breaking', icon: '🔥', color: '#f97316' },
    { name: 'National', slug: 'national', icon: '🏛️', color: '#1e3a8a' },
    { name: 'International', slug: 'international', icon: '🌍', color: '#7c3aed' },
    { name: 'Business', slug: 'business', icon: '💼', color: '#059669' },
    { name: 'Technology', slug: 'technology', icon: '💻', color: '#0891b2' },
    { name: 'Sports', slug: 'sports', icon: '⚽', color: '#dc2626' },
    { name: 'Entertainment', slug: 'entertainment', icon: '🎬', color: '#db2777' },
    { name: 'Cybersecurity', slug: 'cybersecurity', icon: '🔒', color: '#475569' },
];

export const getCategoryColor = (categoryName) => {
    if (!categoryName) return '#6b7280';
    const slug = categoryName.toLowerCase().replace(/\s+/g, '-');
    return CATEGORY_COLORS[slug] || '#6b7280';
};

export const getCategoryIcon = (categoryName) => {
    if (!categoryName) return '📰';
    const slug = categoryName.toLowerCase().replace(/\s+/g, '-');
    return CATEGORY_ICONS[slug] || '📰';
};

export const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / secondsInUnit);
        if (interval >= 1) {
            return `${interval} ${unit}${interval !== 1 ? 's' : ''} ago`;
        }
    }
    return 'Just now';
};

export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

export const formatViews = (views) => {
    if (views >= 1000000) {
        return (views / 1000000).toFixed(1) + 'M';
    }
    if (views >= 1000) {
        return (views / 1000).toFixed(1) + 'K';
    }
    return views?.toLocaleString() || '0';
};
