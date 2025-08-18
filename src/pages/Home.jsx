import React from 'react';

function Home() {
  return (
    <div className="page-container">
      <div className="home-content">
        <h1 className="page-title">Chào mừng đến với Tech News Hub</h1>

        <div className="welcome-section">
          <h2>Cập nhật tin tức công nghệ mới nhất!</h2>
          <p className="welcome-text">
            Khám phá thế giới công nghệ với những tin tức, xu hướng và cập nhật mới nhất về React, JavaScript, Web Development và nhiều chủ đề thú vị khác.
            Tham gia cộng đồng để không bỏ lỡ bất kỳ thông tin quan trọng nào.
          </p>
        </div>

        <div className="features-section">
          <h3>Khám phá nội dung đa dạng:</h3>
          <div className="features-grid">
            <div className="feature-card">
              <h4>📰 Tin tức công nghệ</h4>
              <p>Cập nhật những tin tức mới nhất về React, JavaScript, Web Development</p>
            </div>

            <div className="feature-card">
              <h4>� Xu hướng mới</h4>
              <p>Khám phá các xu hướng công nghệ và framework đang hot</p>
            </div>

            <div className="feature-card">
              <h4>� Hướng dẫn</h4>
              <p>Các bài hướng dẫn chi tiết về lập trình và phát triển web</p>
            </div>

            <div className="feature-card">
              <h4>⚡ Performance</h4>
              <p>Tips và tricks để tối ưu hóa hiệu suất ứng dụng</p>
            </div>

            <div className="feature-card">
              <h4>🎨 CSS & Design</h4>
              <p>Thiết kế giao diện đẹp với CSS Grid, Flexbox và các kỹ thuật hiện đại</p>
            </div>
          </div>
        </div>

        <div className="stats-section">
          <h3>Thống kê nội dung:</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">25+</div>
              <div className="stat-label">Bài viết công nghệ</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">5</div>
              <div className="stat-label">Chủ đề chính</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100%</div>
              <div className="stat-label">Nội dung chất lượng</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Cập nhật liên tục</div>
            </div>
          </div>
        </div>

        <div className="getting-started">
          <h3>Bắt đầu khám phá:</h3>
          <p>
            Đăng ký tài khoản để theo dõi những bài viết yêu thích và nhận thông báo về tin tức mới nhất.
            Tham gia cộng đồng lập trình viên để chia sẻ kiến thức và học hỏi từ nhau.
          </p>
          <div className="cta-buttons">
            <button className="btn btn-primary">Đọc tin tức ngay</button>
            <button className="btn btn-secondary">Đăng ký tài khoản</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
