import React, { useState } from 'react';

function Profile() {
  const [userInfo, setUserInfo] = useState({
    fullName: 'Nguyễn Văn An',
    email: 'nguyenvanan@example.com',
    phone: '0123456789',
    address: 'Hà Nội, Việt Nam',
    birthDate: '1990-01-15',
    gender: 'Nam',
    bio: 'Tôi là một lập trình viên React đam mê công nghệ.'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...userInfo });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...userInfo });
  };

  const handleSave = () => {
    setUserInfo({ ...editData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...userInfo });
    setIsEditing(false);
  };

  return (
    <div className="page-container">
      <div className="profile-container">
        <h1 className="page-title">Hồ sơ cá nhân</h1>
        
        <div className="profile-content">
          <div className="profile-header">
            <div className="avatar-section">
              <div className="avatar">
                <img 
                  src="https://via.placeholder.com/150/4CAF50/FFFFFF?text=A" 
                  alt="Avatar" 
                  className="avatar-img"
                />
              </div>
              <button className="btn btn-secondary btn-small">Đổi ảnh</button>
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
                      name="fullName"
                      value={editData.fullName}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  ) : (
                    <span>{userInfo.fullName}</span>
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
                    />
                  ) : (
                    <span>{userInfo.email}</span>
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
                    />
                  ) : (
                    <span>{userInfo.phone}</span>
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
                    />
                  ) : (
                    <span>{userInfo.address}</span>
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
                    <span>{new Date(userInfo.birthDate).toLocaleDateString('vi-VN')}</span>
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
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                      <option value="Khác">Khác</option>
                    </select>
                  ) : (
                    <span>{userInfo.gender}</span>
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
                  <p>{userInfo.bio}</p>
                )}
              </div>
            </div>

            <div className="info-section">
              <h3>Thống kê tài khoản</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">15</div>
                  <div className="stat-label">Ngày tham gia</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">42</div>
                  <div className="stat-label">Bài viết</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">128</div>
                  <div className="stat-label">Lượt xem</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
