import React, { useState, useEffect } from 'react';

function CreatePost() {
  // Check if user is authenticated
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Công nghệ',
    summary: '',
    image: null,
    imagePreview: null
  });

  // Available categories (matching existing ones)
  const categories = ['Công nghệ', 'Lập trình', 'Xu hướng', 'Hướng dẫn', 'CSS'];

  // Check authentication on component mount
  useEffect(() => {
    const loggedInUser = localStorage.getItem('currentUser');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear message when user starts typing
    if (message) setMessage('');
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setMessage('Chỉ hỗ trợ file ảnh định dạng JPG, PNG, WEBP!');
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setMessage('Kích thước ảnh không được vượt quá 5MB!');
      return;
    }

    // Convert to base64 for localStorage compatibility
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Image = event.target.result;
      setFormData(prev => ({
        ...prev,
        image: base64Image,
        imagePreview: base64Image
      }));
    };
    reader.readAsDataURL(file);
  };

  // Remove uploaded image
  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null,
      imagePreview: null
    }));
  };

  // Generate unique ID for article
  const generateArticleId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  // Save article (publish or draft)
  const saveArticle = (isDraft = false) => {
    // Validation
    if (!formData.title.trim()) {
      setMessage('Vui lòng nhập tiêu đề bài viết!');
      return;
    }

    if (!formData.content.trim()) {
      setMessage('Vui lòng nhập nội dung bài viết!');
      return;
    }

    if (!formData.summary.trim()) {
      setMessage('Vui lòng nhập tóm tắt bài viết!');
      return;
    }

    setIsLoading(true);

    try {
      // Create article object
      const newArticle = {
        id: generateArticleId(),
        title: formData.title.trim(),
        summary: formData.summary.trim(),
        content: formData.content.trim(),
        category: formData.category,
        author: user.name,
        authorId: user.id,
        date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
        image: formData.image || '/src/img/logo.png', // Default image if none uploaded
        isUserGenerated: true,
        isDraft: isDraft,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Get existing user articles
      const existingArticles = JSON.parse(localStorage.getItem('userArticles') || '[]');
      
      // Add new article
      existingArticles.push(newArticle);
      
      // Save to localStorage
      localStorage.setItem('userArticles', JSON.stringify(existingArticles));

      // Success message
      setMessage(isDraft ? 'Bài viết đã được lưu nháp!' : 'Bài viết đã được đăng thành công!');
      
      // Reset form
      setFormData({
        title: '',
        content: '',
        category: 'Công nghệ',
        summary: '',
        image: null,
        imagePreview: null
      });

      // Clear file input
      const fileInput = document.getElementById('imageUpload');
      if (fileInput) fileInput.value = '';

    } catch (error) {
      setMessage('Có lỗi xảy ra khi lưu bài viết. Vui lòng thử lại!');
      console.error('Error saving article:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    saveArticle(false); // Publish
  };

  // Handle save draft
  const handleSaveDraft = () => {
    saveArticle(true); // Save as draft
  };

  // If user is not authenticated, show login prompt
  if (!user) {
    return (
      <div className="page-container">
        <div className="auth-container">
          <div className="auth-prompt">
            <h1>Đăng nhập để tạo bài viết</h1>
            <p>Bạn cần đăng nhập để có thể tạo và đăng bài viết mới.</p>
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

  return (
    <div className="page-container">
      <div className="create-post-container">
        <h1 className="page-title">Tạo bài viết mới</h1>
        
        <div className="author-info">
          <p><strong>Tác giả:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>

        <form onSubmit={handleSubmit} className="create-post-form">
          {/* Title Input */}
          <div className="form-group">
            <label htmlFor="title">Tiêu đề bài viết *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Nhập tiêu đề bài viết..."
              className="form-input"
              maxLength="200"
            />
            <small className="char-count">{formData.title.length}/200</small>
          </div>

          {/* Summary Input */}
          <div className="form-group">
            <label htmlFor="summary">Tóm tắt bài viết *</label>
            <textarea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleInputChange}
              placeholder="Nhập tóm tắt ngắn gọn về bài viết..."
              className="form-textarea"
              rows="3"
              maxLength="300"
            />
            <small className="char-count">{formData.summary.length}/300</small>
          </div>

          {/* Category Selection */}
          <div className="form-group">
            <label htmlFor="category">Danh mục *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="form-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div className="form-group">
            <label htmlFor="imageUpload">Hình ảnh bài viết</label>
            <input
              type="file"
              id="imageUpload"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleImageUpload}
              className="form-file-input"
            />
            <small className="file-info">Hỗ trợ: JPG, PNG, WEBP. Tối đa 5MB.</small>
            
            {/* Image Preview */}
            {formData.imagePreview && (
              <div className="image-preview">
                <img src={formData.imagePreview} alt="Preview" className="preview-image" />
                <button type="button" onClick={removeImage} className="remove-image-btn">
                  Xóa ảnh
                </button>
              </div>
            )}
          </div>

          {/* Content Textarea */}
          <div className="form-group">
            <label htmlFor="content">Nội dung bài viết *</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Viết nội dung bài viết của bạn tại đây..."
              className="form-textarea content-textarea"
              rows="15"
            />
            <small className="char-count">{formData.content.length} ký tự</small>
          </div>

          {/* Action Buttons */}
          <div className="form-actions">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="btn btn-secondary"
              disabled={isLoading}
            >
              {isLoading ? 'Đang lưu...' : 'Lưu nháp'}
            </button>
            
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Đang đăng...' : 'Đăng bài viết'}
            </button>
          </div>
        </form>

        {/* Message Display */}
        {message && (
          <div className={message.includes('thành công') || message.includes('lưu nháp') ? 'message success' : 'message error'}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default CreatePost;
