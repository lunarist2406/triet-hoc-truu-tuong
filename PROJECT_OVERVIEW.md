# 🎓 Triết Học Trừu Tượng - Philosophy Website

## 📋 **Tổng quan dự án**

Website triết học với giao diện hiện đại, tích hợp nhiều tính năng tương tác và nội dung phong phú về triết học Mác-Lênin.

## 🚀 **Tính năng chính**

### **1. Landing Page**
- ✅ Hero section với animation và typewriter effect
- ✅ Viewpoint sections với image carousel
- ✅ Comment system với nested replies
- ✅ Testimonials section
- ✅ Footer với navigation

### **2. Blog System**
- ✅ CRUD operations cho blog posts
- ✅ Markdown support với real-time preview
- ✅ Like/Unlike system với localStorage
- ✅ Comment system Facebook-style (split view)
- ✅ Tag system và search
- ✅ Responsive design

### **3. Quiz System**
- ✅ 20 câu hỏi triết học
- ✅ Dynamic background với particles
- ✅ Progress tracking và scoring
- ✅ Explanations cho mỗi câu trả lời

### **4. AI Chatbot**
- ✅ Groq API integration
- ✅ Fallback to simulated responses
- ✅ Floating widget design
- ✅ Philosophy-focused responses

### **5. Comment Systems**
- ✅ Main page comments (viewpoint-based)
- ✅ Blog comments (Facebook-style layout)
- ✅ Nested replies (max 3 levels)
- ✅ Rate limiting và spam protection

## 🛠️ **Tech Stack**

### **Frontend**
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

### **Backend**
- **Next.js API Routes** - Serverless functions
- **File-based storage** - JSON files
- **Groq API** - AI responses

### **UI Components**
- **shadcn/ui** - Component library
- **React Hot Toast** - Notifications
- **Custom components** - Blog, comments, etc.

## 📁 **Cấu trúc thư mục**

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── ai/chat/       # AI chatbot API
│   │   ├── blog-comments/ # Blog comments API
│   │   ├── blogs/         # Blog posts API
│   │   └── comments/      # Main comments API
│   ├── blog/              # Blog page
│   ├── quiz/              # Quiz page
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── blog-*.tsx        # Blog-related components
│   ├── comment-*.tsx     # Comment systems
│   └── *.tsx             # Other components
├── data/                 # JSON data files
│   ├── blogs.json        # Blog posts
│   ├── blog-comments.json # Blog comments
│   ├── comments.json     # Main comments
│   └── rate-limit.json   # Rate limiting data
├── scripts/              # Utility scripts
└── public/               # Static assets
```

## 🎨 **Design System**

### **Color Palette**
- **Primary**: Orange (#f97316) to Yellow (#eab308)
- **Background**: Slate (#0f172a) with gradients
- **Text**: White/Gray with orange accents
- **Cards**: White with orange/yellow gradients

### **Typography**
- **Headers**: Bold, gradient text
- **Body**: Clean, readable fonts
- **Code**: Monospace for technical content

### **Animations**
- **Framer Motion**: Smooth transitions
- **Hover effects**: Scale and color changes
- **Loading states**: Skeleton screens
- **Particles**: Dynamic backgrounds

## 📊 **Data Management**

### **Blog Posts**
- **Storage**: `data/blogs.json`
- **Fields**: id, title, content, author, tags, likes, views, timestamps
- **Features**: CRUD, search, pagination

### **Comments**
- **Main Comments**: `data/comments.json`
- **Blog Comments**: `data/blog-comments.json`
- **Features**: Nested replies, rate limiting, IP tracking

### **User Data**
- **Likes**: localStorage (client-side)
- **Rate Limiting**: IP-based (server-side)

## 🔧 **API Endpoints**

### **Blogs**
- `GET /api/blogs` - Get all blogs
- `POST /api/blogs` - Create blog
- `GET /api/blogs/[id]` - Get blog by ID
- `PUT /api/blogs/[id]` - Update blog
- `DELETE /api/blogs/[id]` - Delete blog
- `POST /api/blogs/[id]/like` - Like/Unlike blog

### **Comments**
- `GET /api/comments` - Get main comments
- `POST /api/comments` - Create comment
- `DELETE /api/comments/[id]` - Delete comment
- `GET /api/blog-comments?blogId=xxx` - Get blog comments
- `POST /api/blog-comments` - Create blog comment
- `DELETE /api/blog-comments/[id]` - Delete blog comment

### **AI Chat**
- `POST /api/ai/chat` - Chat with AI

## 🚀 **Deployment**

### **Environment Variables**
```env
GROQ_API_KEY=your_groq_api_key
```

### **Build Commands**
```bash
npm install
npm run build
npm start
```

### **Development**
```bash
npm run dev
```

## 📝 **Scripts**

### **Blog Management**
- `node scripts/import-blog-posts.js` - Import markdown files
- `node scripts/export-blog-posts.js` - Export to markdown
- `node scripts/clean-blog-posts.js` - Clean blog data
- `node scripts/convert-markdown-to-text.js` - Convert markdown to text

### **Testing**
- `node scripts/test-like-system.js` - Test like system
- `node scripts/test-blog-comments.js` - Test comment system

## 🎯 **Key Features**

### **1. Like System**
- One like per user per post
- Toggle like/unlike
- localStorage persistence
- Visual feedback

### **2. Comment Systems**
- Nested replies (max 3 levels)
- Real-time updates
- Rate limiting
- Spam protection

### **3. Blog System**
- Markdown support
- Real-time preview
- Tag system
- Search functionality

### **4. AI Integration**
- Groq API for responses
- Fallback system
- Philosophy-focused

## 📱 **Responsive Design**

- **Desktop**: Full layout with sidebars
- **Tablet**: Adjusted spacing and sizing
- **Mobile**: Stacked layout, touch-friendly

## 🔒 **Security**

- **Rate Limiting**: IP-based comment limits
- **Input Validation**: Sanitized user inputs
- **Error Handling**: Graceful error responses

## 📈 **Performance**

- **Client-side**: Optimized React components
- **Server-side**: Efficient API routes
- **Caching**: localStorage for user data
- **Images**: Optimized and lazy-loaded

## 🎨 **UI/UX Highlights**

- **Modern Design**: Gradient backgrounds, smooth animations
- **Intuitive Navigation**: Clear menu structure
- **Interactive Elements**: Hover effects, transitions
- **Accessibility**: Proper contrast, keyboard navigation

## 📚 **Content**

- **18 Blog Posts**: Comprehensive philosophy content
- **20 Quiz Questions**: Interactive learning
- **AI Responses**: Contextual philosophy discussions
- **Multilingual**: Vietnamese with English elements

---

**🎉 Project hoàn thiện với đầy đủ tính năng hiện đại và nội dung phong phú!**
