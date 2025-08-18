import React from 'react';

function Home() {
  return (
    <div className="page-container">
      <div className="home-content">
        <h1 className="page-title">Chào mừng đến với MyApp!</h1>
        
        <div className="welcome-section">
          <h2>Xin chào và chào mừng bạn!</h2>
          <p className="welcome-text">
            Đây là ứng dụng React đơn giản được xây dựng với JSX. 
            Ứng dụng này bao gồm 5 trang chính để bạn khám phá.
          </p>
        </div>

        <div className="features-section">
          <h3>Tính năng của ứng dụng:</h3>
          <div className="features-grid">
            <div className="feature-card">
              <h4>🏠 Trang chủ</h4>
              <p>Trang chào mừng và giới thiệu về ứng dụng</p>
            </div>
            
            <div className="feature-card">
              <h4>📝 Đăng ký</h4>
              <p>Form đăng ký tài khoản mới với thông tin cơ bản</p>
            </div>
            
            <div className="feature-card">
              <h4>🔐 Đăng nhập</h4>
              <p>Form đăng nhập vào hệ thống</p>
            </div>
            
            <div className="feature-card">
              <h4>👤 Hồ sơ</h4>
              <p>Xem và quản lý thông tin cá nhân</p>
            </div>
            
            <div className="feature-card">
              <h4>📰 Tin tức</h4>
              <p>Đọc các bài tin tức và cập nhật mới nhất</p>
            </div>
          </div>
        </div>

        <div className="getting-started">
          <h3>Bắt đầu sử dụng:</h3>
          <p>
            Sử dụng menu điều hướng ở trên để chuyển đổi giữa các trang. 
            Mỗi trang được thiết kế đơn giản và dễ sử dụng.
          </p>
          <div className="cta-buttons">
            <button className="btn btn-primary">Khám phá ngay</button>
            <button className="btn btn-secondary">Tìm hiểu thêm</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
