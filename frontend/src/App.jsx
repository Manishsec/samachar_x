import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BreakingNews from './components/BreakingNews';
import Home from './pages/Home';
import Article from './pages/Article';
import Category from './pages/Category';
import Search from './pages/Search';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';
import Disclaimer from './pages/Disclaimer';
import NotFound from './pages/NotFound';
import RealtimeNews from './pages/RealtimeNews';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <BreakingNews />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/realtime" element={<RealtimeNews />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="/category/:categoryId" element={<Category />} />
            <Route path="/search" element={<Search />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
