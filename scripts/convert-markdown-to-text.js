const fs = require("fs");
const path = require("path");

// Đường dẫn đến file blogs.json
const BLOGS_FILE = path.join(process.cwd(), "data", "blogs.json");

// Function để chuyển đổi markdown thành văn bản bình thường
function markdownToText(markdown) {
  return markdown
    .replace(/^#{1,6}\s+/gm, "") // Loại bỏ headers
    .replace(/\*\*(.*?)\*\*/g, "$1") // Loại bỏ bold
    .replace(/\*(.*?)\*/g, "$1") // Loại bỏ italic
    .replace(/`(.*?)`/g, "$1") // Loại bỏ code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Loại bỏ links
    .replace(/^\s*[-*+]\s+/gm, "• ") // Chuyển list items thành bullet points
    .replace(/^\s*\d+\)\s+/gm, "") // Loại bỏ numbered lists
    .replace(/\|/g, "") // Loại bỏ table separators
    .replace(/^---+$/gm, "") // Loại bỏ horizontal rules
    .replace(/\n{3,}/g, "\n\n") // Giảm multiple newlines
    .trim();
}

// Function để convert tất cả blog posts từ markdown sang text
function convertMarkdownToText() {
  try {
    // Đọc file blogs.json
    if (!fs.existsSync(BLOGS_FILE)) {
      console.log("❌ File blogs.json không tồn tại!");
      return 0;
    }

    const data = fs.readFileSync(BLOGS_FILE, "utf8");
    const blogs = JSON.parse(data);

    let convertedCount = 0;

    // Convert từng blog post
    const updatedBlogs = blogs.map((blog) => {
      const originalContent = blog.content;
      const convertedContent = markdownToText(originalContent);

      if (originalContent !== convertedContent) {
        convertedCount++;
        console.log(`✅ Đã convert: ${blog.title}`);
      }

      return {
        ...blog,
        content: convertedContent,
        updatedAt: new Date().toISOString(),
      };
    });

    // Ghi lại file
    fs.writeFileSync(BLOGS_FILE, JSON.stringify(updatedBlogs, null, 2));

    console.log(
      `\n🎉 Đã convert thành công ${convertedCount} bài viết từ markdown sang văn bản bình thường!`
    );
    console.log(`📚 Tổng số bài viết: ${updatedBlogs.length}`);

    return convertedCount;
  } catch (error) {
    console.error("❌ Lỗi khi convert blog posts:", error);
    return 0;
  }
}

// Function để backup file gốc trước khi convert
function backupOriginalFile() {
  try {
    if (fs.existsSync(BLOGS_FILE)) {
      const backupFile = BLOGS_FILE.replace(
        ".json",
        `_backup_${Date.now()}.json`
      );
      fs.copyFileSync(BLOGS_FILE, backupFile);
      console.log(`📁 Đã backup file gốc: ${backupFile}`);
      return backupFile;
    }
  } catch (error) {
    console.error("❌ Lỗi khi backup file:", error);
  }
  return null;
}

// Chạy convert
if (require.main === module) {
  const action = process.argv[2];

  if (action === "convert") {
    console.log("🔄 Bắt đầu convert markdown sang văn bản bình thường...");
    backupOriginalFile();
    convertMarkdownToText();
  } else if (action === "preview") {
    // Preview một vài bài viết để xem kết quả
    try {
      const data = fs.readFileSync(BLOGS_FILE, "utf8");
      const blogs = JSON.parse(data);

      console.log("📖 Preview một vài bài viết:");
      blogs.slice(0, 3).forEach((blog, index) => {
        console.log(`\n--- Bài ${index + 1}: ${blog.title} ---`);
        console.log("Nội dung gốc (markdown):");
        console.log(blog.content.substring(0, 200) + "...");
        console.log("\nNội dung sau convert (text):");
        console.log(markdownToText(blog.content).substring(0, 200) + "...");
      });
    } catch (error) {
      console.error("❌ Lỗi khi preview:", error);
    }
  } else {
    console.log("Usage:");
    console.log(
      "  node scripts/convert-markdown-to-text.js convert  - Convert tất cả bài viết"
    );
    console.log(
      "  node scripts/convert-markdown-to-text.js preview  - Xem preview kết quả"
    );
  }
}

module.exports = { convertMarkdownToText, markdownToText, backupOriginalFile };
