import requests
import json
import os
import re
from datetime import datetime
from io import BytesIO
from PIL import Image
from google import genai
from google.genai import types

# ==========================================
# CONFIGURATION
# ==========================================

NEWSDATA_API_KEY = os.environ.get('NEWSDATA_API_KEY', '')
GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY', '')
UNSPLASH_ACCESS_KEY = os.environ.get('UNSPLASH_ACCESS_KEY', '')

# Category configuration - order matters for scheduling
CATEGORIES = [
    {'slug': 'breaking', 'name': 'Breaking News', 'query': 'breaking news today', 'icon': '🔥', 'color': '#f97316'},
    {'slug': 'technology', 'name': 'Technology', 'query': 'technology AI innovation', 'icon': '💻', 'color': '#0891b2'},
    {'slug': 'business', 'name': 'Business', 'query': 'business economy finance', 'icon': '💼', 'color': '#059669'},
    {'slug': 'sports', 'name': 'Sports', 'query': 'sports cricket football', 'icon': '⚽', 'color': '#dc2626'},
    {'slug': 'entertainment', 'name': 'Entertainment', 'query': 'entertainment movies bollywood', 'icon': '🎬', 'color': '#db2777'},
    {'slug': 'international', 'name': 'International', 'query': 'world international news', 'icon': '🌍', 'color': '#7c3aed'},
    {'slug': 'national', 'name': 'National', 'query': 'india national news', 'icon': '🏛️', 'color': '#1e3a8a'},
    {'slug': 'cybersecurity', 'name': 'Cybersecurity', 'query': 'cybersecurity hacking data breach', 'icon': '🔒', 'color': '#475569'},
]

# Paths
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
DATA_DIR = os.path.join(PROJECT_ROOT, 'frontend', 'src', 'data')
IMAGES_DIR = os.path.join(PROJECT_ROOT, 'frontend', 'public', 'news-images')
NEWS_JSON_PATH = os.path.join(DATA_DIR, 'news.json')

# Fallback images per category
FALLBACK_IMAGES = {
    'breaking': 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800',
    'technology': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
    'business': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
    'sports': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800',
    'entertainment': 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800',
    'international': 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800',
    'national': 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=800',
    'cybersecurity': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
}

# ==========================================
# UTILITY FUNCTIONS
# ==========================================

def slugify(text):
    """Convert text to URL-safe slug"""
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'[\s_-]+', '-', text)
    text = text.strip('-')
    return text[:50]

def get_category_index():
    """Get category index based on current hour (IST)"""
    hour_to_category = {
        6: 0, 8: 1, 10: 2, 12: 3, 14: 4, 16: 5, 18: 6, 22: 7,
    }
    from datetime import timezone, timedelta
    ist = timezone(timedelta(hours=5, minutes=30))
    current_hour = datetime.now(ist).hour
    scheduled_hours = sorted(hour_to_category.keys())
    for hour in scheduled_hours:
        if current_hour <= hour:
            return hour_to_category[hour]
    return 0

def get_gemini_client():
    """Initialize Gemini client"""
    if not GEMINI_API_KEY:
        return None
    return genai.Client(api_key=GEMINI_API_KEY)

def generate_image_search_query(client, title, category_name):
    """Use Gemini to generate a good Unsplash search query from article title"""
    if not client:
        words = title.lower().split()[:3]
        return ' '.join(words)
    
    try:
        prompt = f"""Generate a simple 2-3 word Unsplash image search query for this news headline.
The query should find a relevant, professional photo.

Headline: "{title}"
Category: {category_name}

Rules:
- Return ONLY the search query, nothing else
- Use 2-3 simple, common English words
- Focus on the main subject/theme
- Avoid names of people or specific places
- Example outputs: "business meeting", "city skyline", "technology laptop", "sports stadium"

Search query:"""

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.3,
                max_output_tokens=20,
            )
        )
        
        query = response.text.strip().strip('"\'').lower()
        query = ' '.join(query.split()[:3])
        print(f"   🔍 Generated search query: {query}")
        return query
        
    except Exception as e:
        print(f"   ⚠️ Query generation failed: {e}")
        return category_name.lower()

def search_unsplash_image(query):
    """Search Unsplash for an image matching the query"""
    if not UNSPLASH_ACCESS_KEY:
        print("   ⚠️ No Unsplash API key")
        return None
    
    try:
        url = "https://api.unsplash.com/search/photos"
        params = {
            'query': query,
            'per_page': 1,
            'orientation': 'landscape',
            'content_filter': 'high'
        }
        headers = {
            'Authorization': f'Client-ID {UNSPLASH_ACCESS_KEY}'
        }
        
        response = requests.get(url, params=params, headers=headers, timeout=15)
        data = response.json()
        
        if data.get('results') and len(data['results']) > 0:
            image_url = data['results'][0]['urls']['regular']
            print(f"   🖼️ Found Unsplash image for '{query}'")
            return image_url
        else:
            print(f"   ⚠️ No Unsplash results for '{query}'")
            return None
            
    except Exception as e:
        print(f"   ❌ Unsplash search failed: {e}")
        return None

def download_and_compress_image(url, filename, max_size_kb=450):
    """Download image and compress to under max_size_kb"""
    try:
        response = requests.get(url, timeout=30)
        if response.status_code != 200:
            return None
        
        img = Image.open(BytesIO(response.content))
        
        if img.mode in ('RGBA', 'P'):
            img = img.convert('RGB')
        
        max_dimension = 1200
        if max(img.size) > max_dimension:
            ratio = max_dimension / max(img.size)
            new_size = (int(img.size[0] * ratio), int(img.size[1] * ratio))
            img = img.resize(new_size, Image.Resampling.LANCZOS)
        
        os.makedirs(IMAGES_DIR, exist_ok=True)
        filepath = os.path.join(IMAGES_DIR, filename)
        
        quality = 85
        while quality > 20:
            buffer = BytesIO()
            img.save(buffer, format='JPEG', quality=quality, optimize=True)
            size_kb = len(buffer.getvalue()) / 1024
            
            if size_kb <= max_size_kb:
                with open(filepath, 'wb') as f:
                    f.write(buffer.getvalue())
                print(f"   📷 Saved image: {filename} ({size_kb:.1f}KB)")
                return f"/news-images/{filename}"
            
            quality -= 10
        
        img.save(filepath, format='JPEG', quality=20, optimize=True)
        print(f"   📷 Saved image: {filename} (compressed)")
        return f"/news-images/{filename}"
        
    except Exception as e:
        print(f"   ⚠️ Image download failed: {e}")
        return None

def generate_content_with_gemini(client, title, source_url, category_name):
    """Use Gemini to generate article content"""
    if not client:
        print("   ⚠️ No Gemini client, using placeholder content")
        return None, None
    
    try:
        prompt = f"""You are a professional news journalist for SamacharX, a premium news website.

Write a compelling, informative news article based on this headline:
**"{title}"**

Category: {category_name}
Source reference: {source_url}

IMPORTANT REQUIREMENTS:
1. First, write ONE paragraph (3-4 sentences) as the article EXCERPT/SUMMARY
2. Then, write 5-6 FULL paragraphs of detailed news content (minimum 500 words total)
3. Each paragraph should be 4-6 sentences long
4. Include relevant facts, context, background information, and expert perspectives
5. Use an engaging but objective journalistic tone
6. Make it informative, detailed, and valuable for readers
7. Do NOT include any disclaimers about AI or verification
8. Do NOT use labels like "EXCERPT:" or "CONTENT:" or "SUMMARY:"
9. Write as if you are a real news journalist reporting on current events

FORMAT YOUR RESPONSE EXACTLY LIKE THIS:
[One paragraph summary - 3-4 sentences]

[Paragraph 1 - Introduction and key details]

[Paragraph 2 - Background and context]

[Paragraph 3 - More details and developments]

[Paragraph 4 - Expert opinions or reactions]

[Paragraph 5 - Implications and what's next]

[Paragraph 6 - Conclusion or additional context]
"""
        
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.7,
                max_output_tokens=3000,
            )
        )
        
        text = response.text.strip()
        
        # Split into excerpt and content
        paragraphs = text.split('\n\n')
        
        if len(paragraphs) >= 2:
            excerpt = paragraphs[0].strip()
            content = '\n\n'.join(paragraphs[1:]).strip()
        else:
            # Single paragraph - use first 200 chars as excerpt
            excerpt = text[:200]
            content = text
        
        # Clean up any remaining labels
        excerpt = excerpt.replace('EXCERPT:', '').replace('SUMMARY:', '').strip()
        content = content.replace('CONTENT:', '').strip()
        
        print(f"   ✍️ Generated content with Gemini ({len(content)} chars)")
        return content, excerpt
        
    except Exception as e:
        print(f"   ❌ Gemini error: {e}")
        return None, None

# ==========================================
# MAIN FUNCTIONS
# ==========================================

def fetch_news_for_category(category):
    """Fetch news articles for a single category"""
    print(f"\n🔍 Fetching {category['name']}...")
    
    if not NEWSDATA_API_KEY:
        print("   ⚠️ No NewsData API key")
        return []
    
    url = "https://newsdata.io/api/1/news"
    params = {
        'apikey': NEWSDATA_API_KEY,
        'q': category['query'],
        'language': 'en',
        'size': 3
    }
    
    try:
        response = requests.get(url, params=params, timeout=30)
        data = response.json()
        
        if data.get('status') == 'success':
            return data.get('results', [])
        else:
            print(f"   ⚠️ API error: {data.get('message', 'Unknown')}")
            return []
    except Exception as e:
        print(f"   ❌ Request failed: {e}")
        return []

def process_article(article, category, index, gemini_client):
    """Process a single article - download image, generate content"""
    title = article.get('title', 'Untitled')
    slug = slugify(title)
    article_id = f"{category['slug']}-{slug}-{index}"
    
    print(f"\n   📰 Processing: {title[:50]}...")
    
    # Try to get image from NewsData.io first
    image_url = article.get('image_url', '')
    local_image_path = None
    
    if image_url and image_url.startswith('http'):
        filename = f"{article_id}.jpg"
        local_image_path = download_and_compress_image(image_url, filename)
    
    # If no image from NewsData, use Unsplash with Gemini-generated query
    if not local_image_path:
        print("   🔄 No source image, searching Unsplash...")
        search_query = generate_image_search_query(gemini_client, title, category['name'])
        unsplash_url = search_unsplash_image(search_query)
        
        if unsplash_url:
            filename = f"{article_id}.jpg"
            local_image_path = download_and_compress_image(unsplash_url, filename)
    
    # Final fallback to static category image
    if not local_image_path:
        print("   📷 Using category fallback image")
        local_image_path = FALLBACK_IMAGES.get(category['slug'], FALLBACK_IMAGES['breaking'])
    
    # Generate content with Gemini
    source_url = article.get('link', '')
    content, excerpt = generate_content_with_gemini(gemini_client, title, source_url, category['name'])
    
    # Fallback content
    if not content:
        content = article.get('content') or article.get('description') or f"Breaking news: {title}. Stay tuned for more updates on this developing story."
        excerpt = article.get('description', '')[:200] if article.get('description') else content[:200]
    
    # Get author/source
    author = article.get('source_id') or article.get('source_name') or 'SamacharX'
    author = author.replace('_', ' ').title()
    
    return {
        '_id': article_id,
        'title': title,
        'slug': slug,
        'content': content,
        'excerpt': excerpt[:250] + '...' if len(excerpt) > 250 else excerpt,
        'author': author,
        'category': {
            'name': category['name'],
            'slug': category['slug'],
            'icon': category['icon'],
            'color': category['color']
        },
        'imageUrl': local_image_path,
        'publishedDate': article.get('pubDate') or datetime.now().isoformat(),
        'sourceUrl': source_url
    }

def load_existing_news():
    """Load existing news from JSON"""
    try:
        with open(NEWS_JSON_PATH, 'r', encoding='utf-8') as f:
            return json.load(f)
    except:
        return []

def save_news(news_list):
    """Save news to JSON file"""
    os.makedirs(DATA_DIR, exist_ok=True)
    with open(NEWS_JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(news_list, f, indent=2, ensure_ascii=False)
    print(f"\n💾 Saved {len(news_list)} articles to news.json")

def main():
    """Main function - process one category based on schedule"""
    print("=" * 50)
    print("📰 SamacharX News Automation")
    print("=" * 50)
    print(f"⏰ Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    # Initialize Gemini client
    gemini_client = get_gemini_client()
    if gemini_client:
        print("✅ Gemini client initialized")
    else:
        print("⚠️ No Gemini API key - using fallback content")
    
    # Get category index
    category_index = int(os.environ.get('CATEGORY_INDEX', -1))
    if category_index < 0:
        category_index = get_category_index()
    
    category = CATEGORIES[category_index % len(CATEGORIES)]
    print(f"📂 Category: {category['icon']} {category['name']}")
    
    # Fetch news
    articles = fetch_news_for_category(category)
    
    if not articles:
        print("\n⚠️ No articles fetched. Exiting.")
        return
    
    # Load existing news
    existing_news = load_existing_news()
    existing_ids = {n['_id'] for n in existing_news}
    
    # Process new articles
    new_articles = []
    for idx, article in enumerate(articles[:3]):
        processed = process_article(article, category, idx, gemini_client)
        
        if processed['_id'] not in existing_ids:
            new_articles.append(processed)
    
    print(f"\n📊 New articles: {len(new_articles)}")
    
    if new_articles:
        # Remove old articles from same category
        existing_news = [n for n in existing_news if n.get('category', {}).get('slug') != category['slug']]
        
        # Add new articles at the beginning
        updated_news = new_articles + existing_news
        
        # Keep only latest 50 articles
        updated_news = updated_news[:50]
        
        save_news(updated_news)
    
    print("\n✅ Done!")

if __name__ == '__main__':
    main()
