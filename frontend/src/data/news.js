import newsData from './news.json';

export const getNews = (options = {}) => {
    const { category, limit = 10, page = 1, featured } = options;

    let filtered = [...newsData];

    if (category) {
        filtered = filtered.filter(n => n.category?.slug === category);
    }

    if (featured) {
        filtered = filtered.filter(n => n.featured === true);
    }

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedNews = filtered.slice(start, end);

    return {
        news: paginatedNews,
        total: filtered.length,
        page,
        pages: Math.ceil(filtered.length / limit)
    };
};

export const getNewsById = (id) => {
    return newsData.find(n => n._id === id || n.slug === id);
};

export const searchNews = (query) => {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase();
    return newsData.filter(n =>
        n.title?.toLowerCase().includes(q) ||
        n.content?.toLowerCase().includes(q) ||
        n.author?.toLowerCase().includes(q) ||
        n.category?.name?.toLowerCase().includes(q)
    );
};

export const getRelatedNews = (id, limit = 3) => {
    const article = getNewsById(id);
    if (!article) return [];

    return newsData
        .filter(n => n._id !== id && n.category?.slug === article.category?.slug)
        .slice(0, limit);
};

export const getTrendingNews = (limit = 5) => {
    // Return latest news as "trending"
    return [...newsData].slice(0, limit);
};

export { newsData };
