# 🚀 Setup Groq API - Hướng dẫn chi tiết

## 🎯 **Groq là gì?**

- **Siêu nhanh**: 14,400 requests/ngày miễn phí
- **Llama 3**: Model AI mới nhất
- **Dễ setup**: Chỉ cần đăng ký và lấy API key

## 📝 **Bước 1: Đăng ký Groq**

1. **Truy cập**: https://console.groq.com/
2. **Click "Sign Up"**
3. **Đăng ký bằng**:
   - Email + Password
   - Hoặc Google/GitHub
4. **Verify email** (nếu cần)

## 🔑 **Bước 2: Tạo API Key**

1. **Login vào**: https://console.groq.com/
2. **Click "API Keys"** ở sidebar
3. **Click "Create API Key"**
4. **Đặt tên**: "Philosophy Chat"
5. **Copy API key** (bắt đầu bằng `gsk_`)

## ⚙️ **Bước 3: Cập nhật .env.local**

1. **Mở file**: `.env.local`
2. **Thay thế**: `gsk_your_groq_api_key_here` bằng API key thật
3. **Lưu file**

```env
GROQ_API_KEY=gsk_1234567890abcdef...
```

## 🧪 **Bước 4: Test**

1. **Restart server**:

   ```bash
   npm run dev
   ```

2. **Mở trang web**
3. **Click AI chat button** (góc phải dưới)
4. **Hỏi**: "Tự do là gì theo Sartre?"
5. **AI sẽ trả lời nhanh chóng!**

## 📊 **Giới hạn miễn phí:**

- **14,400 requests/ngày** (rất nhiều!)
- **Không cần credit card**
- **Không hết hạn**

## 🔧 **Troubleshooting:**

### **Lỗi "Invalid API Key":**

- Kiểm tra API key đúng chưa
- Đảm bảo bắt đầu bằng `gsk_`
- Copy đầy đủ không thiếu ký tự

### **Lỗi "Rate Limit":**

- Groq rất ít khi bị rate limit
- Nếu có, đợi 1 phút rồi thử lại

### **AI không trả lời:**

- Kiểm tra console log
- Thử câu hỏi đơn giản: "Xin chào"
- Fallback sẽ dùng simulated responses

## 🎉 **Kết quả:**

- ✅ AI trả lời siêu nhanh
- ✅ Chất lượng cao với Llama 3
- ✅ Hoàn toàn miễn phí
- ✅ Không cần credit card

## 💡 **Tips:**

- Groq là lựa chọn tốt nhất cho dự án
- Nhanh hơn OpenAI
- Miễn phí hơn nhiều dịch vụ khác
- Llama 3 model rất thông minh
