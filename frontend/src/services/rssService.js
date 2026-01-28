const RSS_SOURCES = [
    {
        id: 'ndtv',
        name: 'NDTV',
        logo: '📺',
        color: '#e21b22',
        url: 'https://feeds.feedburner.com/ndtvnews-top-stories',
        category: 'general'
    },
    {
        id: 'toi',
        name: 'Times of India',
        logo: '📰',
        color: '#ff0000',
        url: 'https://timesofindia.indiatimes.com/rssfeedstopstories.cms',
        category: 'general'
    },
    {
        id: 'hindu',
        name: 'The Hindu',
        logo: '🗞️',
        color: '#004d99',
        url: 'https://www.thehindu.com/news/national/feeder/default.rss',
        category: 'general'
    },
    {
        id: 'ht',
        name: 'Hindustan Times',
        logo: '📄',
        color: '#0072bc',
        url: 'https://www.hindustantimes.com/feeds/rss/india-news/rssfeed.xml',
        category: 'general'
    },
    {
        id: 'ie',
        name: 'Indian Express',
        logo: '📋',
        color: '#c4161c',
        url: 'https://indianexpress.com/feed/',
        category: 'general'
    },
    {
        id: 'it',
        name: 'India Today',
        logo: '🔴',
        color: '#e42c22',
        url: 'https://www.indiatoday.in/rss/1206578',
        category: 'general'
    },
    {
        id: 'news18',
        name: 'News18',
        logo: '📡',
        color: '#d32f2f',
        url: 'https://www.news18.com/commonfeeds/v1/eng/rss/india.xml',
        category: 'general'
    },
    {
        id: 'zee',
        name: 'Zee News',
        logo: '📺',
        color: '#ff6600',
        url: 'https://zeenews.india.com/rss/india-national-news.xml',
        category: 'general'
    },
    {
        id: 'abp',
        name: 'ABP Live',
        logo: '🎯',
        color: '#e50914',
        url: 'https://news.abplive.com/home/feed',
        category: 'general'
    },
    {
        id: 'mint',
        name: 'Live Mint',
        logo: '💹',
        color: '#2e7d32',
        url: 'https://www.livemint.com/rss/news',
        category: 'business'
    },
    {
        id: 'dna',
        name: 'DNA India',
        logo: '🧬',
        color: '#1976d2',
        url: 'https://www.dnaindia.com/feeds/india.xml',
        category: 'general'
    },
    {
        id: 'print',
        name: 'ThePrint',
        logo: '🖨️',
        color: '#d4451d',
        url: 'https://theprint.in/feed/',
        category: 'analysis'
    }
];

const getApiUrl = () => {
    if (typeof window !== 'undefined') {
        return window.location.origin + '/api/rss';
    }
    return '/api/rss';
};

const parseRSSItem = (item, source) => {
    const getTextContent = (el, selector) => {
        const element = el.querySelector(selector);
        return element ? element.textContent?.trim() : '';
    };

    const getImageUrl = (item) => {
        const mediaContent = item.querySelector('media\\:content, content');
        if (mediaContent) {
            const url = mediaContent.getAttribute('url');
            if (url && url.startsWith('http')) return url;
        }

        const mediaThumbnail = item.querySelector('media\\:thumbnail, thumbnail');
        if (mediaThumbnail) {
            const url = mediaThumbnail.getAttribute('url');
            if (url && url.startsWith('http')) return url;
        }

        const enclosure = item.querySelector('enclosure');
        if (enclosure) {
            const type = enclosure.getAttribute('type') || '';
            if (type.startsWith('image')) {
                const url = enclosure.getAttribute('url');
                if (url) return url;
            }
        }

        const description = getTextContent(item, 'description');
        const imgMatch = description.match(/<img[^>]+src=["']([^"']+)["']/i);
        if (imgMatch && imgMatch[1].startsWith('http')) {
            return imgMatch[1];
        }

        const content = getTextContent(item, 'content\\:encoded');
        if (content) {
            const contentImgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
            if (contentImgMatch && contentImgMatch[1].startsWith('http')) {
                return contentImgMatch[1];
            }
        }

        return '';
    };

    const cleanDescription = (desc) => {
        if (!desc) return '';
        return desc
            .replace(/<[^>]*>/g, '')
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/\s+/g, ' ')
            .trim()
            .substring(0, 200);
    };

    const title = getTextContent(item, 'title');
    const link = getTextContent(item, 'link');
    const description = cleanDescription(getTextContent(item, 'description'));
    const pubDate = getTextContent(item, 'pubDate');
    const imageUrl = getImageUrl(item);
    const category = getTextContent(item, 'category') || source.category;

    return {
        id: `${source.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title,
        link,
        description,
        pubDate: pubDate ? new Date(pubDate) : new Date(),
        imageUrl,
        category,
        source: {
            id: source.id,
            name: source.name,
            logo: source.logo,
            color: source.color
        }
    };
};

const parseXMLFeed = (xmlText, source) => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlText, 'text/xml');

    const parseError = xml.querySelector('parsererror');
    if (parseError) {
        return [];
    }

    const items = xml.querySelectorAll('item');
    const parsedItems = [];

    items.forEach((item, index) => {
        if (index < 15) {
            const parsed = parseRSSItem(item, source);
            if (parsed.title && parsed.link && parsed.imageUrl) {
                parsedItems.push(parsed);
            }
        }
    });

    return parsedItems;
};

// Use batch API to fetch all feeds in ONE request
export const fetchAllRSSFeeds = async (selectedSources = null) => {
    const sourcesToFetch = selectedSources
        ? RSS_SOURCES.filter(s => selectedSources.includes(s.id))
        : RSS_SOURCES;

    const apiUrl = getApiUrl();
    const urls = sourcesToFetch.map(s => s.url).join(',');

    try {
        const response = await fetch(`${apiUrl}?batch=true&urls=${encodeURIComponent(urls)}`);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const result = await response.json();
        const allItems = [];

        result.feeds.forEach((feed) => {
            if (feed.data && !feed.error) {
                const source = sourcesToFetch.find(s => s.url === feed.url);
                if (source) {
                    const items = parseXMLFeed(feed.data, source);
                    allItems.push(...items);
                }
            }
        });

        allItems.sort((a, b) => b.pubDate - a.pubDate);
        return allItems;
    } catch (error) {
        console.error('Error fetching feeds:', error.message);
        return [];
    }
};

export const fetchSingleFeed = async (sourceId) => {
    const source = RSS_SOURCES.find(s => s.id === sourceId);
    if (!source) {
        throw new Error(`Source ${sourceId} not found`);
    }

    const apiUrl = getApiUrl();

    try {
        const response = await fetch(`${apiUrl}?url=${encodeURIComponent(source.url)}`);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const text = await response.text();
        return parseXMLFeed(text, source);
    } catch (error) {
        console.error(`Error fetching ${source.name}:`, error.message);
        return [];
    }
};

export const getRSSSources = () => RSS_SOURCES;

export const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;

    return new Date(date).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short'
    });
};
