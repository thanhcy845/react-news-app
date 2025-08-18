import React, { useState } from 'react';

// Import local images for news articles
import reactImage from '../img/logo.png'; // Using logo as React placeholder
import jsImage from '../img/electronic.jpeg'; // Electronic theme for JavaScript
import webImage from '../img/retro.jpeg'; // Retro theme for web trends
import performanceImage from '../img/workout.jpg'; // Workout theme for performance
import cssImage from '../img/pop.jpg'; // Colorful theme for CSS

function News() {
  const [newsData] = useState([
    {
      id: 1,
      title: 'React 19 chính thức được phát hành',
      summary: 'Phiên bản React 19 mang đến nhiều tính năng mới và cải tiến hiệu suất đáng kể.',
      content: 'React 19 đã chính thức được phát hành với nhiều tính năng mới như Server Components, Concurrent Features và nhiều cải tiến về hiệu suất. Đây là một bước tiến quan trọng trong việc phát triển ứng dụng web hiện đại.',
      author: 'Meta Team',
      date: '2024-12-15',
      category: 'Công nghệ',
      image: reactImage
    },
    {
      id: 2,
      title: 'JavaScript ES2024 - Những tính năng mới đáng chú ý',
      summary: 'Tìm hiểu về các tính năng mới trong JavaScript ES2024 và cách áp dụng vào dự án.',
      content: 'JavaScript ES2024 mang đến nhiều tính năng mới như Array Grouping, Promise.withResolvers(), và nhiều cải tiến khác giúp lập trình viên viết code hiệu quả hơn.',
      author: 'Nguyễn Văn Dev',
      date: '2024-12-10',
      category: 'Lập trình',
      image: jsImage
    },
    {
      id: 3,
      title: 'Xu hướng phát triển web 2025',
      summary: 'Những xu hướng công nghệ web sẽ thống trị trong năm 2025.',
      content: 'Năm 2025 sẽ chứng kiến sự phát triển mạnh mẽ của AI trong web development, WebAssembly, và các framework mới. Các nhà phát triển cần chuẩn bị cho những thay đổi này.',
      author: 'Tech Insider',
      date: '2024-12-08',
      category: 'Xu hướng',
      image: webImage
    },
    {
      id: 4,
      title: 'Hướng dẫn tối ưu hóa hiệu suất React App',
      summary: 'Các kỹ thuật và best practices để tối ưu hóa hiệu suất ứng dụng React.',
      content: 'Bài viết hướng dẫn chi tiết các kỹ thuật tối ưu hóa như code splitting, lazy loading, memoization và nhiều kỹ thuật khác để cải thiện hiệu suất ứng dụng React.',
      author: 'React Expert',
      date: '2024-12-05',
      category: 'Hướng dẫn',
      image: performanceImage
    },
    {
      id: 5,
      title: 'CSS Grid vs Flexbox - Khi nào nên sử dụng?',
      summary: 'So sánh chi tiết giữa CSS Grid và Flexbox để chọn công cụ phù hợp.',
      content: 'CSS Grid và Flexbox đều là những công cụ mạnh mẽ cho layout. Bài viết này sẽ giúp bạn hiểu rõ khi nào nên sử dụng Grid và khi nào nên sử dụng Flexbox.',
      author: 'CSS Master',
      date: '2024-12-01',
      category: 'CSS',
      image: cssImage
    }
  ]);

  const [selectedNews, setSelectedNews] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  const categories = ['Tất cả', 'Công nghệ', 'Lập trình', 'Xu hướng', 'Hướng dẫn', 'CSS'];

  const filteredNews = selectedCategory === 'Tất cả' 
    ? newsData 
    : newsData.filter(news => news.category === selectedCategory);

  const handleNewsClick = (news) => {
    setSelectedNews(news);
  };

  const handleBackToList = () => {
    setSelectedNews(null);
  };

  if (selectedNews) {
    return (
      <div className="page-container">
        <div className="news-detail">
          <button className="btn btn-secondary" onClick={handleBackToList}>
            ← Quay lại danh sách
          </button>
          
          <article className="news-article">
            <img src={selectedNews.image} alt={selectedNews.title} className="news-detail-image" />
            
            <div className="news-meta">
              <span className="news-category">{selectedNews.category}</span>
              <span className="news-date">{new Date(selectedNews.date).toLocaleDateString('vi-VN')}</span>
              <span className="news-author">Tác giả: {selectedNews.author}</span>
            </div>
            
            <h1 className="news-detail-title">{selectedNews.title}</h1>
            
            <div className="news-content">
              <p className="news-summary">{selectedNews.summary}</p>
              <p>{selectedNews.content}</p>
              
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
              
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="news-container">
        <h1 className="page-title">Tin tức công nghệ</h1>
        
        <div className="news-filters">
          <h3>Danh mục:</h3>
          <div className="category-buttons">
            {categories.map(category => (
              <button
                key={category}
                className={selectedCategory === category ? 'btn btn-primary btn-small' : 'btn btn-secondary btn-small'}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="news-grid">
          {filteredNews.map(news => (
            <div key={news.id} className="news-card" onClick={() => handleNewsClick(news)}>
              <img src={news.image} alt={news.title} className="news-image" />
              
              <div className="news-card-content">
                <div className="news-card-meta">
                  <span className="news-category">{news.category}</span>
                  <span className="news-date">{new Date(news.date).toLocaleDateString('vi-VN')}</span>
                </div>
                
                <h3 className="news-card-title">{news.title}</h3>
                <p className="news-card-summary">{news.summary}</p>
                
                <div className="news-card-footer">
                  <span className="news-author">Tác giả: {news.author}</span>
                  <button className="btn btn-link">Đọc thêm →</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="no-news">
            <p>Không có tin tức nào trong danh mục này.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default News;
