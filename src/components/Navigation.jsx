import React, { useState, useEffect } from 'react';

function Navigation({ currentPage, setCurrentPage }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Check login status
  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedInUser = localStorage.getItem('currentUser');
      if (loggedInUser) {
        const userData = JSON.parse(loggedInUser);
        setCurrentUser(userData);
        setIsLoggedIn(true);
      } else {
        setCurrentUser(null);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();

    // Listen for storage changes (when user logs in/out in another tab)
    window.addEventListener('storage', checkLoginStatus);

    // Custom event for same-tab login/logout
    window.addEventListener('authStateChange', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('authStateChange', checkLoginStatus);
    };
  }, []);

  const handleNavClick = (e, page) => {
    e.preventDefault();
    setCurrentPage(page);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setIsLoggedIn(false);
    setCurrentPage('home');

    // Dispatch custom event for auth state change
    window.dispatchEvent(new Event('authStateChange'));
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <h2 className="nav-logo">MyApp</h2>
        <ul className="nav-menu">
          <li className="nav-item">
            <a
              href="#home"
              className={currentPage === 'home' ? 'nav-link active' : 'nav-link'}
              onClick={(e) => handleNavClick(e, 'home')}
            >
              Trang chủ
            </a>
          </li>

          {!isLoggedIn ? (
            <li className="nav-item">
              <a
                href="#auth"
                className={currentPage === 'auth' ? 'nav-link active' : 'nav-link'}
                onClick={(e) => handleNavClick(e, 'auth')}
              >
                Đăng nhập
              </a>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <a
                  href="#profile"
                  className={currentPage === 'profile' ? 'nav-link active' : 'nav-link'}
                  onClick={(e) => handleNavClick(e, 'profile')}
                >
                  Hồ sơ
                </a>
              </li>
              <li className="nav-item">
                <span className="nav-user-info">
                  Xin chào, {currentUser?.fullName}
                </span>
              </li>
              <li className="nav-item">
                <a
                  href="#logout"
                  className="nav-link nav-logout"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </a>
              </li>
            </>
          )}

          <li className="nav-item">
            <a
              href="#news"
              className={currentPage === 'news' ? 'nav-link active' : 'nav-link'}
              onClick={(e) => handleNavClick(e, 'news')}
            >
              Tin tức
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
