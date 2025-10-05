const fs = require("fs");
const path = require("path");

// Đường dẫn đến file blogs.json
const BLOGS_FILE = path.join(process.cwd(), "data", "blogs.json");

// Function để xóa tất cả blog posts và chỉ giữ lại 2 bài mẫu
function cleanBlogPosts() {
  try {
    // Tạo 2 bài viết mẫu
    const sampleBlogs = [
      {
        id: "1",
        title: "Chào mừng đến với Blog Triết Học",
        content:
          "Đây là blog đầu tiên của chúng tôi về triết học. Tại đây, chúng ta sẽ cùng khám phá những tư tưởng sâu sắc của các triết gia vĩ đại, từ cổ đại đến hiện đại.\n\nTriết học không chỉ là những lý thuyết khô khan, mà còn là cách nhìn nhận cuộc sống, giúp chúng ta hiểu rõ hơn về bản thân và thế giới xung quanh.\n\nHãy cùng nhau bắt đầu hành trình khám phá triết học!",
        author: "Admin",
        tags: ["triết học", "giới thiệu", "khám phá"],
        createdAt: "2024-01-15T10:00:00.000Z",
        updatedAt: "2024-01-15T10:00:00.000Z",
        views: 0,
        likes: 0,
      },
      {
        id: "2",
        title: "Sartre và Tự Do Hiện Sinh",
        content:
          "Jean-Paul Sartre, một trong những triết gia hiện sinh nổi tiếng nhất, đã đưa ra quan điểm rằng 'con người bị kết án phải tự do'.\n\nĐiều này có nghĩa gì? Theo Sartre, chúng ta không thể trốn tránh trách nhiệm của mình. Mỗi lựa chọn chúng ta đưa ra đều định hình con người chúng ta.\n\nTự do không phải là một món quà, mà là một gánh nặng. Chúng ta phải chịu trách nhiệm hoàn toàn cho cuộc sống của mình.\n\nĐây là một quan điểm mạnh mẽ và đầy thách thức, buộc chúng ta phải suy nghĩ sâu sắc về ý nghĩa của sự tồn tại.",
        author: "Triết gia trẻ",
        tags: ["Sartre", "tự do", "hiện sinh", "trách nhiệm"],
        createdAt: "2024-01-16T14:30:00.000Z",
        updatedAt: "2024-01-16T14:30:00.000Z",
        views: 0,
        likes: 0,
      },
    ];

    // Ghi vào file
    fs.writeFileSync(BLOGS_FILE, JSON.stringify(sampleBlogs, null, 2));

    console.log(
      `✅ Đã xóa tất cả bài viết và chỉ giữ lại ${sampleBlogs.length} bài mẫu!`
    );

    return sampleBlogs.length;
  } catch (error) {
    console.error("❌ Lỗi khi xóa blog posts:", error);
    return 0;
  }
}

// Function để xóa hoàn toàn tất cả blog posts
function clearAllBlogPosts() {
  try {
    // Ghi file rỗng
    fs.writeFileSync(BLOGS_FILE, JSON.stringify([], null, 2));

    console.log(`✅ Đã xóa hoàn toàn tất cả bài viết!`);

    return 0;
  } catch (error) {
    console.error("❌ Lỗi khi xóa blog posts:", error);
    return 0;
  }
}

// Chạy function dựa trên argument
if (require.main === module) {
  const action = process.argv[2];

  if (action === "clean") {
    cleanBlogPosts();
  } else if (action === "clear") {
    clearAllBlogPosts();
  } else {
    console.log("Usage:");
    console.log(
      "  node scripts/clean-blog-posts.js clean  - Xóa tất cả và giữ lại 2 bài mẫu"
    );
    console.log(
      "  node scripts/clean-blog-posts.js clear  - Xóa hoàn toàn tất cả"
    );
  }
}

module.exports = { cleanBlogPosts, clearAllBlogPosts };
