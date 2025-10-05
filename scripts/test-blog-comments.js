const fs = require("fs");
const path = require("path");

// Đường dẫn đến file blog-comments.json
const BLOG_COMMENTS_FILE = path.join(process.cwd(), "data", "blog-comments.json");

// Function để test hệ thống comment
function testBlogCommentSystem() {
  try {
    if (!fs.existsSync(BLOG_COMMENTS_FILE)) {
      console.log("❌ File blog-comments.json không tồn tại!");
      return;
    }

    const data = fs.readFileSync(BLOG_COMMENTS_FILE, "utf8");
    const comments = JSON.parse(data);

    console.log("💬 Test hệ thống Blog Comments");
    console.log("=" .repeat(50));

    if (comments.length === 0) {
      console.log("📝 Chưa có bình luận nào");
    } else {
      comments.forEach((comment, index) => {
        console.log(`\n💬 Bình luận ${index + 1}:`);
        console.log(`   👤 Tác giả: ${comment.author}`);
        console.log(`   📝 Nội dung: ${comment.content.substring(0, 50)}...`);
        console.log(`   📅 Thời gian: ${new Date(comment.timestamp).toLocaleString('vi-VN')}`);
        console.log(`   📚 Blog ID: ${comment.blogId}`);
        console.log(`   💬 Trả lời: ${comment.replies ? comment.replies.length : 0}`);
      });
    }

    console.log("\n" + "=" .repeat(50));
    console.log("✅ Hệ thống Blog Comments đã được cập nhật:");
    console.log("   • Layout Facebook-style: Nội dung bên trái, bình luận bên phải");
    console.log("   • Modal rộng hơn (max-w-7xl) để chứa split view");
    console.log("   • Comment system compact và responsive");
    console.log("   • Hỗ trợ nested replies (tối đa 3 cấp)");
    console.log("   • Real-time updates và animations");

    console.log("\n🎨 Giao diện mới:");
    console.log("   • Split view: 60% nội dung, 40% bình luận");
    console.log("   • Comment form ở đầu sidebar");
    console.log("   • Comments list scrollable");
    console.log("   • Compact design cho mobile");

    console.log("\n🔧 API Endpoints:");
    console.log("   • GET /api/blog-comments?blogId=xxx - Lấy comments");
    console.log("   • POST /api/blog-comments - Tạo comment mới");
    console.log("   • DELETE /api/blog-comments/[id] - Xóa comment");

  } catch (error) {
    console.error("❌ Lỗi khi test blog comment system:", error);
  }
}

// Function để tạo sample comments
function createSampleComments() {
  try {
    if (!fs.existsSync(BLOG_COMMENTS_FILE)) {
      console.log("❌ File blog-comments.json không tồn tại!");
      return;
    }

    // Lấy blog ID đầu tiên từ blogs.json
    const blogsFile = path.join(process.cwd(), "data", "blogs.json");
    if (!fs.existsSync(blogsFile)) {
      console.log("❌ File blogs.json không tồn tại!");
      return;
    }

    const blogsData = fs.readFileSync(blogsFile, "utf8");
    const blogs = JSON.parse(blogsData);
    
    if (blogs.length === 0) {
      console.log("❌ Không có blog nào để tạo comments!");
      return;
    }

    const blogId = blogs[0].id;
    const sampleComments = [
      {
        id: "comment-1",
        blogId: blogId,
        author: "Nguyễn Văn A",
        content: "Bài viết rất hay và bổ ích! Cảm ơn tác giả đã chia sẻ.",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 giờ trước
        parentId: null,
        replies: [
          {
            id: "reply-1",
            blogId: blogId,
            author: "Trần Thị B",
            content: "Tôi cũng thấy vậy! Rất hữu ích cho việc học tập.",
            timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 giờ trước
            parentId: "comment-1",
            replies: []
          }
        ]
      },
      {
        id: "comment-2",
        blogId: blogId,
        author: "Lê Văn C",
        content: "Có thể giải thích thêm về phần này không? Tôi chưa hiểu rõ lắm.",
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 phút trước
        parentId: null,
        replies: []
      },
      {
        id: "comment-3",
        blogId: blogId,
        author: "Phạm Thị D",
        content: "Tuyệt vời! Tôi đã học được nhiều điều từ bài viết này.",
        timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10 phút trước
        parentId: null,
        replies: []
      }
    ];

    fs.writeFileSync(BLOG_COMMENTS_FILE, JSON.stringify(sampleComments, null, 2));
    console.log("🎲 Đã tạo 3 sample comments cho blog đầu tiên");
    console.log(`📚 Blog ID: ${blogId}`);
    console.log(`📝 Tổng comments: ${sampleComments.length}`);
    console.log(`💬 Tổng replies: ${sampleComments.reduce((total, comment) => total + comment.replies.length, 0)}`);

  } catch (error) {
    console.error("❌ Lỗi khi tạo sample comments:", error);
  }
}

// Function để xóa tất cả comments
function clearAllComments() {
  try {
    fs.writeFileSync(BLOG_COMMENTS_FILE, "[]", "utf8");
    console.log("🗑️ Đã xóa tất cả comments");
  } catch (error) {
    console.error("❌ Lỗi khi xóa comments:", error);
  }
}

// Chạy test
if (require.main === module) {
  const action = process.argv[2];
  
  switch (action) {
    case 'test':
      testBlogCommentSystem();
      break;
    case 'sample':
      createSampleComments();
      break;
    case 'clear':
      clearAllComments();
      break;
    default:
      console.log("Usage:");
      console.log("  node scripts/test-blog-comments.js test    - Test hệ thống comment");
      console.log("  node scripts/test-blog-comments.js sample  - Tạo sample comments");
      console.log("  node scripts/test-blog-comments.js clear   - Xóa tất cả comments");
  }
}

module.exports = { testBlogCommentSystem, createSampleComments, clearAllComments };
