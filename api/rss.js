export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { url, batch } = req.query;

    // Batch mode - fetch multiple URLs at once
    if (batch === 'true') {
        const urls = req.query.urls ? req.query.urls.split(',') : [];

        if (urls.length === 0) {
            return res.status(400).json({ error: 'URLs parameter is required for batch mode' });
        }

        try {
            const fetchPromises = urls.map(async (feedUrl) => {
                try {
                    const response = await fetch(feedUrl.trim(), {
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                            'Accept': 'application/rss+xml, application/xml, text/xml, */*'
                        }
                    });

                    if (!response.ok) {
                        return { url: feedUrl, error: `HTTP ${response.status}`, data: null };
                    }

                    const text = await response.text();
                    return { url: feedUrl, error: null, data: text };
                } catch (err) {
                    return { url: feedUrl, error: err.message, data: null };
                }
            });

            const results = await Promise.all(fetchPromises);

            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=7200');

            return res.status(200).json({ feeds: results });
        } catch (error) {
            console.error('Batch RSS fetch error:', error.message);
            return res.status(500).json({ error: error.message });
        }
    }

    // Single URL mode
    if (!url) {
        return res.status(400).json({ error: 'URL parameter is required' });
    }

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/rss+xml, application/xml, text/xml, */*'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const text = await response.text();

        res.setHeader('Content-Type', 'application/xml; charset=utf-8');
        res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=7200');

        return res.status(200).send(text);
    } catch (error) {
        console.error('RSS fetch error:', error.message);
        return res.status(500).json({ error: error.message });
    }
}
