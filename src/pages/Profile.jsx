import React, { useState, useEffect } from 'react';

function Profile() {
  // Authentication state
  const [currentUser, setCurrentUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [userArticles, setUserArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Profile editing state
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    birthDate: '',
    gender: '',
    bio: ''
  });

  // Message state
  const [message, setMessage] = useState('');

  // Load user data on component mount
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    setIsLoading(true);

    try {
      // Get current logged-in user
      const loggedInUser = localStorage.getItem('currentUser');
      if (!loggedInUser) {
        setIsLoading(false);
        return;
      }

      const currentUserData = JSON.parse(loggedInUser);
      setCurrentUser(currentUserData);

      // Get full user details from users array
      const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const fullUserDetails = allUsers.find(user => user.id === currentUserData.id);
      setUserDetails(fullUserDetails);

      // Get user's articles
      const allUserArticles = JSON.parse(localStorage.getItem('userArticles') || '[]');
      const myArticles = allUserArticles.filter(article => article.authorId === currentUserData.id);
      setUserArticles(myArticles);

      // Set edit data with current user info
      if (fullUserDetails) {
        setEditData({
          name: fullUserDetails.name || '',
          email: fullUserDetails.email || '',
          phone: fullUserDetails.phone || '',
          address: fullUserDetails.address || '',
          birthDate: fullUserDetails.birthDate || '',
          gender: fullUserDetails.gender || '',
          bio: fullUserDetails.bio || ''
        });
      }

    } catch (error) {
      console.error('Error loading user data:', error);
      setMessage('Có lỗi xảy ra khi tải dữ liệu người dùng.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value
    });
    // Clear message when user starts typing
    if (message) setMessage('');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    try {
      // Validation
      if (!editData.name.trim()) {
        setMessage('Vui lòng nhập tên!');
        return;
      }

      if (!editData.email.trim()) {
        setMessage('Vui lòng nhập email!');
        return;
      }

      // Update user in users array
      const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = allUsers.findIndex(user => user.id === currentUser.id);

      if (userIndex !== -1) {
        // Update user data
        allUsers[userIndex] = {
          ...allUsers[userIndex],
          name: editData.name.trim(),
          email: editData.email.trim(),
          phone: editData.phone.trim(),
          address: editData.address.trim(),
          birthDate: editData.birthDate,
          gender: editData.gender,
          bio: editData.bio.trim(),
          updatedAt: new Date().toISOString()
        };

        // Save to localStorage
        localStorage.setItem('users', JSON.stringify(allUsers));

        // Update current user session if name or email changed
        if (editData.name !== currentUser.name || editData.email !== currentUser.email) {
          const updatedCurrentUser = {
            ...currentUser,
            name: editData.name.trim(),
            email: editData.email.trim()
          };
          localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));
          setCurrentUser(updatedCurrentUser);

          // Dispatch auth state change event
          window.dispatchEvent(new Event('authStateChange'));
        }

        // Reload user data
        loadUserData();
        setIsEditing(false);
        setMessage('Cập nhật hồ sơ thành công!');
      } else {
        setMessage('Không tìm thấy thông tin người dùng!');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      setMessage('Có lỗi xảy ra khi lưu hồ sơ!');
    }
  };

  const handleCancel = () => {
    // Reset edit data to current user info
    if (userDetails) {
      setEditData({
        name: userDetails.name || '',
        email: userDetails.email || '',
        phone: userDetails.phone || '',
        address: userDetails.address || '',
        birthDate: userDetails.birthDate || '',
        gender: userDetails.gender || '',
        bio: userDetails.bio || ''
      });
    }
    setIsEditing(false);
    setMessage('');
  };

  const handleDeleteArticle = (articleId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      try {
        const allUserArticles = JSON.parse(localStorage.getItem('userArticles') || '[]');
        const updatedArticles = allUserArticles.filter(article => article.id !== articleId);
        localStorage.setItem('userArticles', JSON.stringify(updatedArticles));

        // Reload user data
        loadUserData();
        setMessage('Xóa bài viết thành công!');
      } catch (error) {
        console.error('Error deleting article:', error);
        setMessage('Có lỗi xảy ra khi xóa bài viết!');
      }
    }
  };

  // Calculate account statistics
  const getAccountStats = () => {
    if (!userDetails || !currentUser) return { daysJoined: 0, articlesCount: 0, publishedCount: 0, draftsCount: 0 };

    const createdDate = new Date(userDetails.createdAt);
    const now = new Date();
    const daysJoined = Math.floor((now - createdDate) / (1000 * 60 * 60 * 24));

    const articlesCount = userArticles.length;
    const publishedCount = userArticles.filter(article => !article.isDraft).length;
    const draftsCount = userArticles.filter(article => article.isDraft).length;

    return { daysJoined, articlesCount, publishedCount, draftsCount };
  };

  // If loading, show loading state
  if (isLoading) {
    return (
      <div className="page-container">
        <div className="profile-container">
          <div className="loading-state">
            <h2>Đang tải thông tin...</h2>
            <p>Vui lòng chờ trong giây lát.</p>
          </div>
        </div>
      </div>
    );
  }

  // If not logged in, show login prompt
  if (!currentUser) {
    return (
      <div className="page-container">
        <div className="profile-container">
          <div className="auth-prompt">
            <h1>Đăng nhập để xem hồ sơ</h1>
            <p>Bạn cần đăng nhập để có thể xem và quản lý hồ sơ cá nhân.</p>
            <button
              className="btn btn-primary"
              onClick={() => window.location.href = '#auth'}
            >
              Đăng nhập ngay
            </button>
          </div>
        </div>
      </div>
    );
  }

  const stats = getAccountStats();

  return (
    <div className="page-container">
      <div className="profile-container">
        <h1 className="page-title">Hồ sơ cá nhân</h1>

        <div className="profile-content">
          <div className="profile-header">
            <div className="avatar-section">
              <div className="avatar">
                <div className="avatar-placeholder">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="user-basic-info">
                <h2>{currentUser.name}</h2>
                <p className="user-email">{currentUser.email}</p>
                <p className="user-join-date">
                  Tham gia: {userDetails?.createdAt ? new Date(userDetails.createdAt).toLocaleDateString('vi-VN') : 'N/A'}
                </p>
                <p className="user-last-login">
                  Đăng nhập lần cuối: {new Date(currentUser.loginTime).toLocaleDateString('vi-VN')} lúc {new Date(currentUser.loginTime).toLocaleTimeString('vi-VN')}
                </p>
              </div>
            </div>

            <div className="profile-actions">
              {!isEditing ? (
                <button className="btn btn-primary" onClick={handleEdit}>
                  Chỉnh sửa hồ sơ
                </button>
              ) : (
                <div className="edit-actions">
                  <button className="btn btn-primary" onClick={handleSave}>
                    Lưu thay đổi
                  </button>
                  <button className="btn btn-secondary" onClick={handleCancel}>
                    Hủy
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="profile-info">
            <div className="info-section">
              <h3>Thông tin cơ bản</h3>
              
              <div className="info-grid">
                <div className="info-item">
                  <label>Họ và tên:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Nhập họ và tên"
                    />
                  ) : (
                    <span>{userDetails?.name || currentUser.name}</span>
                  )}
                </div>

                <div className="info-item">
                  <label>Email:</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Nhập địa chỉ email"
                    />
                  ) : (
                    <span>{userDetails?.email || currentUser.email}</span>
                  )}
                </div>

                <div className="info-item">
                  <label>Số điện thoại:</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={editData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Nhập số điện thoại"
                    />
                  ) : (
                    <span>{userDetails?.phone || 'Chưa cập nhật'}</span>
                  )}
                </div>

                <div className="info-item">
                  <label>Địa chỉ:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={editData.address}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Nhập địa chỉ"
                    />
                  ) : (
                    <span>{userDetails?.address || 'Chưa cập nhật'}</span>
                  )}
                </div>

                <div className="info-item">
                  <label>Ngày sinh:</label>
                  {isEditing ? (
                    <input
                      type="date"
                      name="birthDate"
                      value={editData.birthDate}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  ) : (
                    <span>{userDetails?.birthDate ? new Date(userDetails.birthDate).toLocaleDateString('vi-VN') : 'Chưa cập nhật'}</span>
                  )}
                </div>

                <div className="info-item">
                  <label>Giới tính:</label>
                  {isEditing ? (
                    <select
                      name="gender"
                      value={editData.gender}
                      onChange={handleInputChange}
                      className="form-input"
                    >
                      <option value="">Chọn giới tính</option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                      <option value="Khác">Khác</option>
                    </select>
                  ) : (
                    <span>{userDetails?.gender || 'Chưa cập nhật'}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="info-section">
              <h3>Giới thiệu bản thân</h3>
              <div className="bio-section">
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={editData.bio}
                    onChange={handleInputChange}
                    className="form-textarea"
                    rows="4"
                    placeholder="Viết vài dòng giới thiệu về bản thân..."
                  />
                ) : (
                  <p>{userDetails?.bio || 'Chưa có thông tin giới thiệu.'}</p>
                )}
              </div>
            </div>

            <div className="info-section">
              <h3>Thống kê tài khoản</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">{stats.daysJoined}</div>
                  <div className="stat-label">Ngày tham gia</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{stats.articlesCount}</div>
                  <div className="stat-label">Tổng bài viết</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{stats.publishedCount}</div>
                  <div className="stat-label">Đã đăng</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{stats.draftsCount}</div>
                  <div className="stat-label">Bản nháp</div>
                </div>
              </div>
            </div>

            {/* User's Articles Section */}
            <div className="info-section">
              <h3>Bài viết của tôi ({userArticles.length})</h3>
              {userArticles.length > 0 ? (
                <div className="user-articles-list">
                  {userArticles.map(article => (
                    <div key={article.id} className="article-item">
                      <div className="article-info">
                        <h4 className="article-title">{article.title}</h4>
                        <p className="article-summary">{article.summary}</p>
                        <div className="article-meta">
                          <span className="article-category">{article.category}</span>
                          <span className="article-date">{new Date(article.date).toLocaleDateString('vi-VN')}</span>
                          <span className={`article-status ${article.isDraft ? 'draft' : 'published'}`}>
                            {article.isDraft ? 'Bản nháp' : 'Đã đăng'}
                          </span>
                        </div>
                      </div>
                      <div className="article-actions">
                        <button
                          className="btn btn-small btn-secondary"
                          onClick={() => window.location.href = '#news'}
                          title="Xem bài viết"
                        >
                          Xem
                        </button>
                        <button
                          className="btn btn-small btn-danger"
                          onClick={() => handleDeleteArticle(article.id)}
                          title="Xóa bài viết"
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-articles">
                  <p>Bạn chưa có bài viết nào.</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => window.location.href = '#create-post'}
                  >
                    Tạo bài viết đầu tiên
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Message Display */}
          {message && (
            <div className={message.includes('thành công') ? 'message success' : 'message error'}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
