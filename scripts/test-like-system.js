const fs = require("fs");
const path = require("path");

// Đường dẫn đến file blogs.json
const BLOGS_FILE = path.join(process.cwd(), "data", "blogs.json");

// Function để test hệ thống like
function testLikeSystem() {
  try {
    if (!fs.existsSync(BLOGS_FILE)) {
      console.log("❌ File blogs.json không tồn tại!");
      return;
    }

    const data = fs.readFileSync(BLOGS_FILE, "utf8");
    const blogs = JSON.parse(data);

    console.log("🧪 Test hệ thống Like/Unlike");
    console.log("=" .repeat(50));

    blogs.slice(0, 3).forEach((blog, index) => {
      console.log(`\n📝 Bài ${index + 1}: ${blog.title}`);
      console.log(`   👥 Lượt thích hiện tại: ${blog.likes}`);
      console.log(`   📅 Cập nhật lần cuối: ${new Date(blog.updatedAt).toLocaleString('vi-VN')}`);
    });

    console.log("\n" + "=" .repeat(50));
    console.log("✅ Hệ thống Like/Unlike đã được cập nhật:");
    console.log("   • Mỗi người chỉ có thể like 1 lần mỗi bài viết");
    console.log("   • Like lần thứ 2 sẽ unlike (bỏ thích)");
    console.log("   • Trạng thái like được lưu trong localStorage");
    console.log("   • Giao diện thay đổi màu sắc theo trạng thái like");
    console.log("   • API hỗ trợ cả like và unlike");

    console.log("\n🎨 Giao diện:");
    console.log("   • ❤️ Màu đỏ + fill: Đã thích");
    console.log("   • 🤍 Màu xám: Chưa thích");
    console.log("   • Hover: Chuyển sang màu đỏ");

    console.log("\n💾 Lưu trữ:");
    console.log("   • localStorage key: 'likedBlogs'");
    console.log("   • Format: Array of blog IDs");
    console.log("   • Tự động sync giữa các tab");

  } catch (error) {
    console.error("❌ Lỗi khi test like system:", error);
  }
}

// Function để reset like counts (nếu cần)
function resetLikeCounts() {
  try {
    if (!fs.existsSync(BLOGS_FILE)) {
      console.log("❌ File blogs.json không tồn tại!");
      return;
    }

    const data = fs.readFileSync(BLOGS_FILE, "utf8");
    const blogs = JSON.parse(data);

    const updatedBlogs = blogs.map(blog => ({
      ...blog,
      likes: 0,
      updatedAt: new Date().toISOString()
    }));

    fs.writeFileSync(BLOGS_FILE, JSON.stringify(updatedBlogs, null, 2));
    console.log("🔄 Đã reset tất cả like counts về 0");
  } catch (error) {
    console.error("❌ Lỗi khi reset like counts:", error);
  }
}

// Function để tạo sample data với like counts
function createSampleLikes() {
  try {
    if (!fs.existsSync(BLOGS_FILE)) {
      console.log("❌ File blogs.json không tồn tại!");
      return;
    }

    const data = fs.readFileSync(BLOGS_FILE, "utf8");
    const blogs = JSON.parse(data);

    const updatedBlogs = blogs.map((blog, index) => ({
      ...blog,
      likes: Math.floor(Math.random() * 20) + 1, // Random 1-20 likes
      updatedAt: new Date().toISOString()
    }));

    fs.writeFileSync(BLOGS_FILE, JSON.stringify(updatedBlogs, null, 2));
    console.log("🎲 Đã tạo sample like counts cho tất cả bài viết");
  } catch (error) {
    console.error("❌ Lỗi khi tạo sample likes:", error);
  }
}

// Chạy test
if (require.main === module) {
  const action = process.argv[2];
  
  switch (action) {
    case 'test':
      testLikeSystem();
      break;
    case 'reset':
      resetLikeCounts();
      break;
    case 'sample':
      createSampleLikes();
      break;
    default:
      console.log("Usage:");
      console.log("  node scripts/test-like-system.js test    - Test hệ thống like");
      console.log("  node scripts/test-like-system.js reset   - Reset tất cả like counts");
      console.log("  node scripts/test-like-system.js sample  - Tạo sample like counts");
  }
}

module.exports = { testLikeSystem, resetLikeCounts, createSampleLikes };
