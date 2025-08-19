# Tech News Hub - React News Application

## Giới thiệu

Tech News Hub là một ứng dụng tin tức công nghệ được xây dựng bằng React, cho phép người dùng đọc tin tức, tạo bài viết và quản lý hồ sơ cá nhân. Ứng dụng được thiết kế với giao diện hiện đại, thân thiện với người dùng và tích hợp đầy đủ các tính năng của một nền tảng tin tức chuyên nghiệp.

## Tính năng chính

### 1. Hệ thống xác thực người dùng

#### Đăng ký tài khoản
- Tạo tài khoản mới với thông tin cơ bản
- Xác thực email và mật khẩu
- Kiểm tra độ mạnh mật khẩu (tối thiểu 6 ký tự)
- Xác nhận mật khẩu để đảm bảo chính xác
- Kiểm tra email trùng lặp trong hệ thống
- Tự động đăng nhập sau khi đăng ký thành công

#### Đăng nhập
- Đăng nhập bằng email và mật khẩu
- Xác thực thông tin người dùng
- Lưu trạng thái đăng nhập trong localStorage
- Hiển thị thông báo lỗi khi thông tin không chính xác
- Chuyển hướng tự động sau khi đăng nhập thành công

#### Quản lý phiên làm việc
- Duy trì trạng thái đăng nhập qua các phiên
- Đăng xuất an toàn với xóa dữ liệu phiên
- Hiển thị thông tin người dùng trong thanh điều hướng
- Bảo vệ các trang yêu cầu đăng nhập

### 2. Trang chủ thông tin

#### Giới thiệu ứng dụng
- Tiêu đề chào mừng và mô tả ngắn gọn
- Thống kê tổng quan về nội dung
- Các danh mục nội dung chính

#### Danh mục nội dung
- Tin tức công nghệ: Cập nhật tin tức mới nhất về React, JavaScript, Web Development
- Xu hướng mới: Khám phá các xu hướng công nghệ và framework đang hot
- Hướng dẫn: Các bài hướng dẫn chi tiết về lập trình và phát triển web
- Performance: Tips và tricks để tối ưu hóa hiệu suất ứng dụng
- CSS & Design: Thiết kế giao diện đẹp với CSS Grid, Flexbox và các kỹ thuật hiện đại

#### Thống kê nội dung
- Số lượng bài viết có sẵn
- Số lượng người dùng đã đăng ký
- Số lượng danh mục tin tức

#### Nút hành động
- Đọc tin tức ngay: Chuyển đến trang tin tức
- Đăng ký tài khoản: Chuyển đến trang đăng ký

### 3. Hệ thống tin tức

#### Hiển thị tin tức
- Danh sách tin tức dạng lưới (grid layout)
- Hình ảnh đại diện cho mỗi bài viết
- Tiêu đề, tóm tắt và thông tin meta
- Hiển thị tác giả, ngày đăng và danh mục
- Thiết kế responsive cho mọi thiết bị

#### Lọc theo danh mục
- Bộ lọc danh mục: Tất cả, Công nghệ, Lập trình, Xu hướng, Hướng dẫn, CSS
- Chuyển đổi danh mục dễ dàng bằng nút bấm
- Cập nhật danh sách tin tức theo thời gian thực
- Hiển thị số lượng bài viết trong mỗi danh mục

#### Xem chi tiết bài viết
- Trang chi tiết với hình ảnh lớn
- Nội dung đầy đủ với định dạng đẹp
- Thông tin tác giả và thời gian đăng
- Nút quay lại danh sách tin tức
- Chia sẻ bài viết (tính năng mở rộng)

#### Tích hợp bài viết người dùng
- Hiển thị bài viết do người dùng tạo cùng với tin tức mặc định
- Phân biệt bài viết người dùng với nhãn đặc biệt
- Chỉ hiển thị bài viết đã được xuất bản (không hiển thị bản nháp)
- Sắp xếp theo thời gian đăng mới nhất

### 4. Tạo và quản lý bài viết

#### Tạo bài viết mới
- Form tạo bài viết với đầy đủ trường thông tin
- Tiêu đề bài viết (tối đa 200 ký tự)
- Tóm tắt bài viết (tối đa 300 ký tự)
- Nội dung chi tiết (không giới hạn)
- Chọn danh mục từ danh sách có sẵn
- Tải lên hình ảnh đại diện

#### Quản lý hình ảnh
- Tải lên file ảnh (JPG, PNG, WEBP)
- Giới hạn kích thước file (tối đa 5MB)
- Xem trước hình ảnh trước khi đăng
- Xóa và thay đổi hình ảnh dễ dàng
- Tự động chuyển đổi sang base64 để lưu trữ

#### Hệ thống bản nháp
- Lưu bài viết dưới dạng bản nháp
- Xuất bản bài viết ngay lập tức
- Chuyển đổi giữa bản nháp và xuất bản
- Quản lý trạng thái bài viết

#### Xác thực và kiểm tra
- Kiểm tra đăng nhập trước khi cho phép tạo bài
- Xác thực các trường bắt buộc
- Hiển thị số ký tự đã nhập/còn lại
- Thông báo lỗi chi tiết khi có vấn đề
- Xác nhận trước khi lưu hoặc xuất bản

### 5. Hồ sơ cá nhân

#### Thông tin tài khoản
- Hiển thị avatar với chữ cái đầu tên
- Tên đầy đủ và địa chỉ email
- Ngày tham gia và lần đăng nhập cuối
- Thống kê hoạt động của người dùng

#### Chỉnh sửa thông tin
- Cập nhật tên và email
- Thêm thông tin cá nhân: số điện thoại, địa chỉ, ngày sinh, giới tính
- Viết giới thiệu bản thân
- Lưu thay đổi với xác thực dữ liệu
- Hủy thay đổi và khôi phục dữ liệu cũ

#### Thống kê tài khoản
- Số ngày đã tham gia
- Tổng số bài viết đã tạo
- Số bài viết đã xuất bản
- Số bài viết đang ở dạng bản nháp

#### Quản lý bài viết cá nhân
- Danh sách tất cả bài viết đã tạo
- Hiển thị trạng thái: Đã đăng hoặc Bản nháp
- Xem bài viết trong trang tin tức
- Xóa bài viết với xác nhận
- Thống kê chi tiết cho từng bài viết

### 6. Giao diện và trải nghiệm người dùng

#### Thiết kế responsive
- Tương thích với mọi kích thước màn hình
- Tối ưu cho điện thoại di động
- Layout linh hoạt với CSS Grid và Flexbox
- Typography rõ ràng và dễ đọc

#### Điều hướng thông minh
- Thanh điều hướng cố định
- Hiển thị trang hiện tại
- Menu thay đổi theo trạng thái đăng nhập
- Chuyển trang mượt mà không reload

#### Phản hồi người dùng
- Thông báo thành công/lỗi rõ ràng
- Loading states khi xử lý dữ liệu
- Xác nhận trước khi thực hiện hành động quan trọng
- Hiệu ứng hover và transition mượt mà

#### Accessibility
- Giao diện không sử dụng emoji, dễ đọc với screen reader
- Contrast màu sắc phù hợp
- Keyboard navigation support
- Semantic HTML structure

### 7. Lưu trữ và quản lý dữ liệu

#### LocalStorage Integration
- Lưu trữ thông tin người dùng
- Quản lý phiên đăng nhập
- Lưu bài viết và bản nháp
- Đồng bộ dữ liệu giữa các tab

#### Cấu trúc dữ liệu
- users: Danh sách tất cả người dùng đã đăng ký
- currentUser: Thông tin người dùng hiện tại
- userArticles: Bài viết do người dùng tạo

#### Bảo mật dữ liệu
- Validation dữ liệu đầu vào
- Kiểm tra quyền truy cập
- Bảo vệ thông tin cá nhân
- Xử lý lỗi an toàn

## Công nghệ sử dụng

### Frontend Framework
- React 18 với Hooks (useState, useEffect)
- Vite build tool cho development nhanh
- CSS3 với Grid và Flexbox
- Responsive design principles

### Quản lý state
- React Hooks cho component state
- LocalStorage cho persistent data
- Event-driven communication giữa components

### Styling
- CSS Modules approach
- Custom CSS với variables
- Gradient backgrounds và animations
- Mobile-first responsive design

### Development Tools
- Hot Module Replacement (HMR)
- ESLint cho code quality
- Git version control
- Google Analytics integration

## Cài đặt và chạy ứng dụng

### Yêu cầu hệ thống
- Node.js phiên bản 16 trở lên
- npm hoặc yarn package manager
- Trình duyệt web hiện đại

### Các bước cài đặt
1. Clone repository về máy local
2. Cài đặt dependencies: `npm install`
3. Chạy development server: `npm run dev`
4. Mở trình duyệt tại `http://localhost:5173`

### Build production
- Chạy lệnh: `npm run build`
- Deploy thư mục `dist` lên hosting
- Cấu hình server cho Single Page Application

## Tính năng nâng cao (có thể mở rộng)

### Hệ thống bình luận
- Thêm bình luận cho bài viết
- Reply và nested comments
- Moderation system

### Tìm kiếm và lọc
- Tìm kiếm full-text trong bài viết
- Lọc theo tác giả, ngày đăng
- Sắp xếp theo popularity

### Social features
- Follow/unfollow tác giả
- Like và share bài viết
- Notification system

### Admin panel
- Quản lý người dùng
- Moderation nội dung
- Analytics và reports

## Đóng góp và phát triển

Ứng dụng được thiết kế với kiến trúc modular, dễ dàng mở rộng và bảo trì. Mọi đóng góp và ý kiến phát triển đều được hoan nghênh.

### Cấu trúc project
- `/src/components`: Các component tái sử dụng
- `/src/pages`: Các trang chính của ứng dụng
- `/src/utils`: Utility functions và helpers
- `/src/data`: Dữ liệu mẫu và constants

### Coding standards
- Sử dụng functional components với Hooks
- Prop validation với PropTypes
- Consistent naming conventions
- Comment code khi cần thiết

## Tính năng đặc biệt

### Quản lý trạng thái bài viết
- Hệ thống draft/publish cho phép người dùng lưu bài viết dưới dạng bản nháp
- Chuyển đổi linh hoạt giữa trạng thái draft và published
- Hiển thị rõ ràng trạng thái bài viết trong profile

### Tích hợp hình ảnh
- Upload và preview hình ảnh real-time
- Validation file type và size
- Tự động resize và optimize
- Base64 encoding cho localStorage compatibility

### Authentication flow
- Seamless login/logout experience
- Session persistence across browser tabs
- Automatic redirect sau khi login
- Protected routes cho authenticated users

### Responsive design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interface
- Optimized cho mọi screen size

---

**Tech News Hub** - Nền tảng tin tức công nghệ hiện đại và thân thiện với người dùng.
