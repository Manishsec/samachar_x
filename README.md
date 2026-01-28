# 📰 SamacharX - Automated News Platform

A fully automated news website that fetches, generates, and publishes news articles 8 times daily using AI.

![SamacharX](https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=300&fit=crop)

## ✨ Features

### 🤖 Fully Automated
- **8 automated updates daily** - one category per update
- **AI-generated content** using Gemini 2.0 Flash
- **Zero manual intervention** - runs on GitHub Actions

### 📰 8 News Categories
| Category | Icon | Update Time (IST) |
|----------|------|-------------------|
| Breaking News | 🔥 | 6:00 AM |
| Technology | 💻 | 8:00 AM |
| Business | 💼 | 10:00 AM |
| Sports | ⚽ | 12:00 PM |
| Entertainment | 🎬 | 2:00 PM |
| International | 🌍 | 4:00 PM |
| National | 🏛️ | 6:00 PM |
| Cybersecurity | 🔒 | 10:00 PM |

### 🎨 Modern UI
- **Responsive design** - works on all devices
- **Dark mode** - with persistence
- **Breaking news ticker** - auto-rotating headlines
- **Fast loading** - optimized images under 450KB

### 🖼️ Smart Image Handling
- Auto-downloads article images
- Compresses to under 450KB
- Stores locally on GitHub
- Fallback images per category

### 📝 AI Content Generation
- Uses **Gemini 2.0 Flash** for article content
- Professional journalistic tone
- Engaging and informative articles
- Auto-generated excerpts

### 📅 Daily Briefing
- **Today's Quote** - Daily inspirational quote
- **On This Day** - Historical events from today's date

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **Styling**: Vanilla CSS with CSS Variables
- **Automation**: Python + GitHub Actions
- **AI**: Google Gemini 2.5 Flash (google-genai SDK)
- **Images**: Unsplash API (smart image search)
- **News API**: NewsData.io
- **Hosting**: Vercel (auto-deploy on push)

## 🚀 Setup

### 1. Clone Repository
```bash
git clone https://github.com/Manishsec/samachar_x.git
cd samachar_x
```

### 2. Install Frontend Dependencies
```bash
cd frontend
pnpm install
```

### 3. Run Locally
```bash
pnpm run dev
```

### 4. Configure GitHub Secrets
Add these secrets in your GitHub repo settings:

| Secret | Description |
|--------|-------------|
| `PAT_TOKEN` | GitHub Personal Access Token with repo write permissions |
| `NEWSDATA_API_KEY` | Get free from [newsdata.io](https://newsdata.io) |
| `GEMINI_API_KEY` | Get from [Google AI Studio](https://aistudio.google.com/apikey) |
| `UNSPLASH_ACCESS_KEY` | Get free from [Unsplash Developers](https://unsplash.com/developers) |

### 5. Deploy to Vercel
1. Import repo to Vercel
2. Framework: Vite
3. Root directory: `frontend`
4. Deploy!

## 📁 Project Structure

```
samachar_x/
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── data/
│   │   │   ├── news.js     # Data loader
│   │   │   └── news.json   # Auto-updated news
│   │   └── utils/          # Utilities
│   └── public/
│       └── news-images/    # Compressed images
├── automation/
│   ├── fetch_news.py       # Main automation script
│   └── requirements.txt    # Python dependencies
└── .github/
    └── workflows/
        └── news-automation.yml
```

## ⏰ Automation Schedule

The automation runs 8 times daily via GitHub Actions:

```
06:00 AM IST → 🔥 Breaking News
08:00 AM IST → 💻 Technology
10:00 AM IST → 💼 Business
12:00 PM IST → ⚽ Sports
02:00 PM IST → 🎬 Entertainment
04:00 PM IST → 🌍 International
06:00 PM IST → 🏛️ National
10:00 PM IST → 🔒 Cybersecurity
```

## 🔑 API Usage

**Per Day:**
- NewsData.io: 8 requests (1 per category)
- Gemini API: ~24 requests (3 articles × 8 categories)

**Monthly:**
- NewsData.io: ~240 requests (free tier: 200/day)
- Gemini API: ~720 requests (free tier: unlimited)

## 📱 Pages

- **Home** - Featured article + latest news grid
- **Category** - Category-specific news listing
- **Article** - Full article with share buttons
- **Search** - Search across all articles
- **Legal** - Privacy, Terms, Cookies, Disclaimer

## 🎯 Performance

- ⚡ Images compressed to <450KB
- 🚀 Vite optimized build
- 📦 Lazy loading images
- 🎨 CSS variables for theming

## 📄 License

MIT License - Free to use and modify

---

**Built with ❤️ by SamacharX Team**
