# 🤖 Hướng dẫn tích hợp AI Chatbot vào Website Triết Học

## 📋 **Tổng quan**

Website triết học này đã được tích hợp sẵn AI chatbot sử dụng Groq API với model Llama 3.1. Bot có thể trả lời các câu hỏi về triết học, giải thích khái niệm, và hỗ trợ học tập.

## 🎯 **Tính năng hiện có**

### ✅ **Đã tích hợp sẵn:**

- **Floating Chat Widget**: Nút chat nổi ở góc phải dưới màn hình
- **Groq API Integration**: Sử dụng Llama 3.1-8b-instant model
- **Fallback System**: Tự động chuyển sang simulated responses nếu API lỗi
- **Responsive Design**: Hoạt động tốt trên mọi thiết bị
- **Philosophy-focused**: Được tối ưu cho câu hỏi triết học

## 🚀 **Cách sử dụng**

### **1. Kích hoạt AI Chat**

```bash
# 1. Cài đặt dependencies (đã có sẵn)
npm install

# 2. Cấu hình API key
cp .env.example .env.local
# Chỉnh sửa .env.local với GROQ_API_KEY thật

# 3. Chạy ứng dụng
npm run dev
```

### **2. Truy cập Chat Widget**

- Mở website: `http://localhost:3000`
- Click nút chat màu cam ở góc phải dưới
- Bắt đầu trò chuyện với AI

## 🔧 **Cấu hình API Key**

### **Bước 1: Đăng ký Groq**

1. Truy cập: https://console.groq.com/
2. Đăng ký tài khoản miễn phí
3. Tạo API Key mới

### **Bước 2: Cập nhật Environment**

```env
# .env.local
GROQ_API_KEY=gsk_your_actual_api_key_here
```

### **Bước 3: Restart Server**

```bash
npm run dev
```

## 📁 **Cấu trúc Code**

### **1. Component chính: `AIPhilosophyChat`**

```typescript
// components/ai-philosophy-chat.tsx
export function AIPhilosophyChat() {
  // Floating widget với chat interface
  // Tích hợp với Groq API
  // Fallback system cho simulated responses
}
```

### **2. API Route: `/api/ai/chat`**

```typescript
// app/api/ai/chat/route.ts
export async function POST(request: NextRequest) {
  // Xử lý request từ frontend
  // Gọi Groq API với Llama 3.1 model
  // Trả về response cho frontend
}
```

### **3. Integration trong Main Page**

```typescript
// app/page.tsx
export default function Home() {
  return (
    <div>
      {/* Các component khác */}
      <AIPhilosophyChat /> {/* Chat widget */}
    </div>
  );
}
```

## 🎨 **Tùy chỉnh Giao diện**

### **1. Thay đổi vị trí Chat Widget**

```typescript
// components/ai-philosophy-chat.tsx
<div className="fixed bottom-6 right-6 z-50">
  {/* Thay đổi bottom-6, right-6 để điều chỉnh vị trí */}
</div>
```

### **2. Thay đổi màu sắc**

```typescript
// Màu nút chat
className = "bg-gradient-to-r from-orange-500 to-yellow-500";

// Màu chat window
className = "bg-white border border-gray-200";
```

### **3. Thay đổi kích thước**

```typescript
// Kích thước chat window
className = "w-96 h-[500px]";

// Kích thước nút chat
className = "w-14 h-14";
```

## 🔄 **Tùy chỉnh AI Behavior**

### **1. Thay đổi System Prompt**

```typescript
// app/api/ai/chat/route.ts
messages: [
  {
    role: "system",
    content:
      "Bạn là chuyên gia triết học. Trả lời chính xác, dễ hiểu, bằng tiếng Việt.",
  },
  { role: "user", content: message },
];
```

### **2. Điều chỉnh Model Parameters**

```typescript
// app/api/ai/chat/route.ts
body: JSON.stringify({
  model: "llama-3.1-8b-instant", // Có thể thay đổi model
  temperature: 0.7, // Điều chỉnh độ sáng tạo
  max_tokens: 500, // Giới hạn độ dài response
});
```

### **3. Thêm Context cho AI**

```typescript
// Thêm thông tin về viewpoint hiện tại
const systemPrompt = `
Bạn là chuyên gia triết học chuyên về ${currentViewpoint}.
Hiện tại người dùng đang xem: ${viewpointTitle}.
Hãy trả lời câu hỏi liên quan đến chủ đề này.
`;
```

## 📱 **Responsive Design**

### **Mobile Optimization**

```typescript
// components/ai-philosophy-chat.tsx
<div className={`
  fixed bottom-4 right-4 z-50
  sm:bottom-6 sm:right-6
  ${isOpen ? 'w-full h-full sm:w-96 sm:h-[500px]' : 'w-14 h-14'}
`}>
```

### **Touch-friendly Interface**

```typescript
// Nút chat lớn hơn trên mobile
<button className="w-12 h-12 sm:w-14 sm:h-14">
```

## 🔒 **Bảo mật và Rate Limiting**

### **1. API Key Protection**

```typescript
// app/api/ai/chat/route.ts
const groqApiKey = process.env.GROQ_API_KEY;
if (!groqApiKey) {
  return NextResponse.json(
    { error: "Thiếu GROQ_API_KEY trên server" },
    { status: 500 }
  );
}
```

### **2. Input Validation**

```typescript
// Kiểm tra input từ user
if (!message || !message.trim()) {
  return NextResponse.json({ error: "Thiếu 'message'" }, { status: 400 });
}
```

### **3. Error Handling**

```typescript
// Fallback khi API lỗi
try {
  const response = await fetch("/api/ai/chat", { ... });
  // Xử lý response
} catch (error) {
  // Sử dụng simulated response
  const fallbackResponse = await simulateAIResponse(input.trim());
}
```

## 🧪 **Testing**

### **1. Test API Connection**

```bash
# Test API endpoint
curl -X POST http://localhost:3000/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Tự do là gì theo Sartre?"}'
```

### **2. Test UI Components**

```typescript
// Test chat widget
import { render, fireEvent } from "@testing-library/react";
import { AIPhilosophyChat } from "@/components/ai-philosophy-chat";

test("chat widget opens and closes", () => {
  const { getByRole } = render(<AIPhilosophyChat />);
  const chatButton = getByRole("button");
  fireEvent.click(chatButton);
  // Kiểm tra chat window hiển thị
});
```

## 📊 **Monitoring và Analytics**

### **1. Track Chat Usage**

```typescript
// Thêm analytics
const trackChatEvent = (event: string, data?: any) => {
  // Google Analytics, Mixpanel, etc.
  gtag("event", event, data);
};

// Sử dụng
trackChatEvent("chat_message_sent", { message_length: input.length });
```

### **2. Error Logging**

```typescript
// Log errors để debug
console.error("Error sending message:", error);
// Hoặc gửi lên error tracking service
```

## 🚀 **Deployment**

### **1. Environment Variables**

```bash
# Production environment
GROQ_API_KEY=your_production_api_key
```

### **2. Vercel Deployment**

```bash
# Deploy lên Vercel
vercel --prod

# Hoặc connect GitHub repo với Vercel
# Vercel sẽ tự động deploy khi push code
```

### **3. Domain Configuration**

```typescript
// next.config.ts
module.exports = {
  env: {
    GROQ_API_KEY: process.env.GROQ_API_KEY,
  },
};
```

## 🔧 **Troubleshooting**

### **Lỗi thường gặp:**

#### **1. "Thiếu GROQ_API_KEY"**

```bash
# Kiểm tra .env.local
cat .env.local | grep GROQ_API_KEY

# Restart server
npm run dev
```

#### **2. "API call failed"**

```typescript
// Kiểm tra network tab trong DevTools
// Xem response từ Groq API
```

#### **3. "Chat widget không hiển thị"**

```typescript
// Kiểm tra z-index
className = "fixed bottom-6 right-6 z-50";

// Kiểm tra CSS conflicts
```

## 📈 **Performance Optimization**

### **1. Lazy Loading**

```typescript
// Chỉ load chat khi cần
const [isOpen, setIsOpen] = useState(false);
const [isLoaded, setIsLoaded] = useState(false);

useEffect(() => {
  if (isOpen && !isLoaded) {
    // Load chat components
    setIsLoaded(true);
  }
}, [isOpen]);
```

### **2. Message Caching**

```typescript
// Cache messages trong localStorage
const saveMessages = (messages: Message[]) => {
  localStorage.setItem("chat_messages", JSON.stringify(messages));
};
```

### **3. Debounce Input**

```typescript
// Tránh gửi quá nhiều requests
const debouncedSendMessage = useMemo(
  () => debounce(sendMessage, 300),
  [sendMessage]
);
```

## 🎯 **Kết luận**

AI Chatbot đã được tích hợp hoàn chỉnh vào website triết học với:

- ✅ **Groq API** với Llama 3.1 model
- ✅ **Floating widget** design
- ✅ **Fallback system** khi API lỗi
- ✅ **Responsive** trên mọi thiết bị
- ✅ **Philosophy-focused** responses
- ✅ **Easy customization** và deployment

Chỉ cần cấu hình API key là có thể sử dụng ngay!

## 📚 **Tài liệu tham khảo**

- [Groq API Documentation](https://console.groq.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**💡 Tip**: Để có trải nghiệm tốt nhất, hãy đảm bảo API key Groq hợp lệ và server được restart sau khi thay đổi environment variables.
