import React, { useState, useEffect } from 'react';

function Auth() {
  // Simple state variables with clear names
  const [showLogin, setShowLogin] = useState(true); // true = login, false = register
  const [user, setUser] = useState(null); // Current logged in user
  const [errorMessage, setErrorMessage] = useState(''); // Error or success messages

  // Simple form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Check if user is already logged in when page loads
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Clear all form fields
  const clearForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrorMessage('');
  };

  // Switch between login and register
  const switchMode = () => {
    setShowLogin(!showLogin);
    clearForm();
  };

  // Simple email validation
  const isValidEmail = (email) => {
    return email.includes('@') && email.includes('.');
  };

  // Handle user registration
  const register = () => {
    // Check if all fields are filled
    if (!name || !email || !password) {
      setErrorMessage('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    // Simple email validation
    if (!isValidEmail(email)) {
      setErrorMessage('Email không hợp lệ!');
      return;
    }

    // Password length check
    if (password.length < 6) {
      setErrorMessage('Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }

    // Password confirmation check
    if (password !== confirmPassword) {
      setErrorMessage('Mật khẩu xác nhận không khớp!');
      return;
    }

    // Get existing users from localStorage
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if email already exists
    const emailExists = allUsers.some(user => user.email === email);
    if (emailExists) {
      setErrorMessage('Email này đã được đăng ký!');
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      name: name,
      email: email,
      password: password,
      createdAt: new Date().toISOString()
    };

    // Save user to localStorage
    allUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(allUsers));

    // Auto login the new user
    const loggedInUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      loginTime: new Date().toISOString()
    };

    localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    setErrorMessage('Đăng ký thành công! Chào mừng ' + name);
  };

  // Handle user login
  const login = () => {
    // Check if email and password are provided
    if (!email || !password) {
      setErrorMessage('Vui lòng điền đầy đủ email và mật khẩu!');
      return;
    }

    // Simple email validation
    if (!isValidEmail(email)) {
      setErrorMessage('Email không hợp lệ!');
      return;
    }

    // Get all users from localStorage
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');

    // Find user with matching email and password
    const foundUser = allUsers.find(
      user => user.email === email && user.password === password
    );

    if (!foundUser) {
      setErrorMessage('Email hoặc mật khẩu không đúng!');
      return;
    }

    // Create login session
    const loggedInUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      loginTime: new Date().toISOString()
    };

    // Save login session
    localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    setErrorMessage('Đăng nhập thành công! Chào mừng bạn trở lại.');
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (showLogin) {
      login();
    } else {
      register();
    }
  };

  // Handle user logout
  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    clearForm();
    setErrorMessage('Đã đăng xuất thành công!');
  };

  // Show welcome page if user is logged in
  if (user) {
    return (
      <div className="page-container">
        <div className="auth-container">
          <div className="auth-success">
            <div className="success-icon">✅</div>
            <h1>Chào mừng, {user.name}!</h1>
            <p>Bạn đã đăng nhập thành công vào hệ thống.</p>

            <div className="user-info-card">
              <h3>Thông tin tài khoản:</h3>
              <p><strong>Tên:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Thời gian đăng nhập:</strong> {new Date(user.loginTime).toLocaleString('vi-VN')}</p>
            </div>

            <div className="action-buttons">
              <button className="btn btn-primary" onClick={() => window.location.href = '#profile'}>
                Xem hồ sơ
              </button>
              <button className="btn btn-secondary" onClick={logout}>
                Đăng xuất
              </button>
            </div>

            {errorMessage && (
              <div className="message success">
                {errorMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="auth-container">
        <div className="auth-header">
          <h1 className="page-title">
            {showLogin ? 'Đăng nhập' : 'Đăng ký tài khoản'}
          </h1>

          <div className="auth-toggle">
            <button
              className={`toggle-btn ${showLogin ? 'active' : ''}`}
              onClick={() => setShowLogin(true)}
            >
              Đăng nhập
            </button>
            <button
              className={`toggle-btn ${!showLogin ? 'active' : ''}`}
              onClick={() => setShowLogin(false)}
            >
              Đăng ký
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!showLogin && (
            <div className="form-group">
              <label htmlFor="name">Họ và tên:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập họ và tên của bạn"
                className="form-input"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập địa chỉ email"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật khẩu:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={showLogin ? "Nhập mật khẩu" : "Nhập mật khẩu (ít nhất 6 ký tự)"}
              className="form-input"
            />
          </div>

          {!showLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Xác nhận mật khẩu:</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Nhập lại mật khẩu"
                className="form-input"
              />
            </div>
          )}

          {showLogin && (
            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                Ghi nhớ đăng nhập
              </label>
              <a href="#forgot-password" className="forgot-link">Quên mật khẩu?</a>
            </div>
          )}

          <button type="submit" className="btn btn-primary btn-full">
            {showLogin ? 'Đăng nhập' : 'Đăng ký'}
          </button>
        </form>

        {errorMessage && (
          <div className={errorMessage.includes('thành công') ? 'message success' : 'message error'}>
            {errorMessage}
          </div>
        )}

        <div className="auth-footer">
          <p>
            {showLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
            <button
              type="button"
              className="link-button"
              onClick={switchMode}
            >
              {showLogin ? 'Đăng ký ngay' : 'Đăng nhập ngay'}
            </button>
          </p>
        </div>

        {showLogin && (
          <div className="demo-info">
            <h4>Thông tin demo (nếu chưa có tài khoản):</h4>
            <p>Bạn có thể đăng ký tài khoản mới hoặc sử dụng tài khoản demo nếu đã tạo trước đó.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Auth;
