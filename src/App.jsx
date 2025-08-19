import { useState, useEffect } from 'react'
import './App.css'

// Import components
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Profile from './pages/Profile'
import News from './pages/News'
import CreatePost from './pages/CreatePost'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  // Google Analytics page tracking
  useEffect(() => {
    // Track page view when currentPage changes
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'G-3Q7BYMC575', {
        page_title: currentPage,
        page_location: window.location.href
      });
      console.log(`GA4 Page view tracked: ${currentPage}`);
    }
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />
      case 'auth':
        return <Auth />
      case 'profile':
        return <Profile />
      case 'news':
        return <News />
      case 'create-post':
        return <CreatePost />
      default:
        return <Home />
    }
  }

  return (
    <div className="app">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  )
}

export default App
