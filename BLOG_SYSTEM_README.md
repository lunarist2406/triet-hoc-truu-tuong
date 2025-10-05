# 📚 Hệ Thống Blog Triết Học MLN111

Hệ thống blog triết học được xây dựng với Next.js, cho phép tạo, đọc, chỉnh sửa và quản lý các bài viết về triết học Mác-Lênin.

## 🚀 Tính năng chính

### 📝 Quản lý bài viết

- ✅ **Tạo bài viết mới** với editor rich text
- ✅ **Chỉnh sửa bài viết** hiện có
- ✅ **Xóa bài viết** với xác nhận
- ✅ **Hệ thống tags** để phân loại
- ✅ **View counter** và **Like system**

### 🎨 Giao diện hiện đại

- ✅ **Background động** với particles animation
- ✅ **Responsive design** cho mọi thiết bị
- ✅ **Modern UI/UX** với Framer Motion
- ✅ **Toast notifications** và **Modal dialogs**
- ✅ **Skeleton loading** states

### 💾 Lưu trữ dữ liệu

- ✅ **File-based storage** (không cần database)
- ✅ **JSON format** dễ backup và migrate
- ✅ **Auto-save** và **validation**
- ✅ **Rate limiting** chống spam

## 📁 Cấu trúc dự án

```
├── app/
│   ├── api/blogs/          # API routes cho blog
│   ├── blog/               # Trang blog chính
│   └── quiz/               # Trang trắc nghiệm
├── components/
│   ├── blog-list.tsx       # Component hiển thị danh sách blog
│   ├── blog-editor.tsx     # Component editor bài viết
│   └── ui/                 # UI components
├── data/
│   └── blogs.json          # File lưu trữ bài viết
├── scripts/
│   ├── import-blog-posts.js    # Import bài viết từ markdown
│   ├── export-blog-posts.js    # Export bài viết ra markdown
│   └── clean-blog-posts.js     # Xóa/dọn dẹp bài viết
└── exported-blogs/         # Thư mục chứa file export
```

## 🛠️ Cách sử dụng

### 1. Chạy ứng dụng

```bash
npm run dev
```

### 2. Truy cập blog

- **Trang chủ:** http://localhost:3000
- **Blog:** http://localhost:3000/blog
- **Trắc nghiệm:** http://localhost:3000/quiz

### 3. Quản lý bài viết

#### Tạo bài viết mới

1. Vào trang `/blog`
2. Click nút "Viết Bài Mới"
3. Điền thông tin: tiêu đề, tác giả, nội dung, tags
4. Click "Tạo bài viết"

#### Chỉnh sửa bài viết

1. Tìm bài viết cần sửa
2. Click icon Edit (✏️)
3. Chỉnh sửa nội dung
4. Click "Cập nhật"

#### Xóa bài viết

1. Tìm bài viết cần xóa
2. Click icon Delete (🗑️)
3. Xác nhận trong dialog

## 📋 Scripts quản lý

### Import bài viết từ markdown

```bash
node scripts/import-blog-posts.js
```

- Import 18 bài viết triết học MLN111
- Tự động tạo ID và metadata
- Giữ nguyên nội dung và tags

### Export bài viết ra markdown

```bash
node scripts/export-blog-posts.js
```

- Export tất cả bài viết ra file `.md`
- Bao gồm metadata và frontmatter
- Tạo thư mục `exported-blogs/`

### Dọn dẹp bài viết

```bash
# Xóa tất cả, giữ lại 2 bài mẫu
node scripts/clean-blog-posts.js clean

# Xóa hoàn toàn tất cả
node scripts/clean-blog-posts.js clear
```

## 📊 Dữ liệu mẫu

Hệ thống đã được import sẵn **18 bài viết triết học** bao gồm:

### Chương 1: Triết học Mác-Lênin

1. Khái lược về triết học
2. Vấn đề cơ bản của triết học
3. Biện chứng và Siêu hình
4. Điều kiện lịch sử ra đời triết học Mác
5. Các thời kỳ hình thành & phát triển
6. Thực chất & ý nghĩa cách mạng triết học
7. Giai đoạn Lênin
8. Đối tượng & chức năng
9. Vai trò trong đời sống xã hội Việt Nam

### Chương 2: Duy vật biện chứng

10. Vật chất & phương thức tồn tại
11. Nguồn gốc, bản chất & kết cấu ý thức
12. Quan hệ giữa vật chất và ý thức
13. Hai loại hình biện chứng
14. Hai nguyên lý của phép biện chứng
15. Các phạm trù cơ bản
16. Các quy luật cơ bản
17. Quan niệm về nhận thức trong lịch sử
18. Lý luận nhận thức duy vật biện chứng

## 🔧 API Endpoints

### Blogs

- `GET /api/blogs` - Lấy tất cả bài viết
- `POST /api/blogs` - Tạo bài viết mới
- `GET /api/blogs/[id]` - Lấy bài viết theo ID
- `PUT /api/blogs/[id]` - Cập nhật bài viết
- `DELETE /api/blogs/[id]` - Xóa bài viết
- `POST /api/blogs/[id]/like` - Like bài viết

### Comments

- `GET /api/comments` - Lấy tất cả bình luận
- `POST /api/comments` - Tạo bình luận mới
- `DELETE /api/comments/[id]` - Xóa bình luận

### AI Chat

- `POST /api/ai/chat` - Chat với AI triết học

## 🎯 Tính năng nâng cao

### 🤖 AI Chatbot

- Tích hợp Groq API
- Trả lời câu hỏi về triết học
- Fallback system khi API lỗi
- Floating widget ở góc phải

### 📝 Comment System

- Bình luận và phản hồi
- Rate limiting chống spam
- Xóa bình luận theo IP
- Real-time notifications

### 🧠 Quiz System

- 23 câu hỏi trắc nghiệm
- Progress tracking
- Immediate feedback
- Score calculation

## 🚀 Deploy

### Vercel (Recommended)

1. Push code lên GitHub
2. Connect với Vercel
3. Set environment variables:
   - `GROQ_API_KEY=your_groq_api_key`
4. Deploy

### Environment Variables

```env
GROQ_API_KEY=gsk_your_groq_api_key_here
```

## 📝 Lưu ý

- **File-based storage**: Dữ liệu lưu trong `data/blogs.json`
- **Backup**: Thường xuyên backup file JSON
- **Rate limiting**: Giới hạn 5 comments/giờ, 20 comments/ngày
- **Responsive**: Tối ưu cho mobile và desktop
- **SEO friendly**: Meta tags và structured data

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push và tạo Pull Request

## 📄 License

MIT License - Xem file LICENSE để biết thêm chi tiết.

---

**🎓 Hệ thống blog triết học MLN111 - Nơi chia sẻ kiến thức triết học một cách hiện đại và tương tác!**
