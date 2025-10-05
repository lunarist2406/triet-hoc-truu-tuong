const fs = require("fs");
const path = require("path");

// Đường dẫn đến file blogs.json
const BLOGS_FILE = path.join(process.cwd(), "data", "blogs.json");

// Function để export blog posts ra markdown files
function exportBlogPosts() {
  try {
    // Đọc file blogs.json
    if (!fs.existsSync(BLOGS_FILE)) {
      console.log("❌ File blogs.json không tồn tại!");
      return 0;
    }

    const data = fs.readFileSync(BLOGS_FILE, "utf8");
    const blogs = JSON.parse(data);

    // Tạo thư mục export nếu chưa tồn tại
    const exportDir = path.join(process.cwd(), "exported-blogs");
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true });
    }

    let exportedCount = 0;

    blogs.forEach((blog, index) => {
      // Tạo tên file từ title
      const fileName =
        blog.title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .trim() + ".md";

      // Tạo nội dung markdown
      const markdownContent = `---
title: "${blog.title}"
author: "${blog.author}"
date: ${new Date(blog.createdAt).toISOString().split("T")[0]}
tags: [${blog.tags.map((tag) => `"${tag}"`).join(", ")}]
views: ${blog.views}
likes: ${blog.likes}
${blog.readingPages ? `reading_pages: "${blog.readingPages}"` : ""}
---

# ${blog.title}

**Tác giả:** ${blog.author}  
**Ngày tạo:** ${new Date(blog.createdAt).toLocaleDateString("vi-VN")}  
**Lượt xem:** ${blog.views} | **Lượt thích:** ${blog.likes}

${blog.tags.length > 0 ? `**Tags:** ${blog.tags.join(", ")}` : ""}

---

${blog.content}

---

*Bài viết được export từ hệ thống blog triết học MLN111*
`;

      // Ghi file
      const filePath = path.join(exportDir, fileName);
      fs.writeFileSync(filePath, markdownContent, "utf8");

      exportedCount++;
      console.log(`✅ Đã export: ${fileName}`);
    });

    console.log(
      `\n🎉 Đã export thành công ${exportedCount} bài viết ra thư mục: ${exportDir}`
    );

    return exportedCount;
  } catch (error) {
    console.error("❌ Lỗi khi export blog posts:", error);
    return 0;
  }
}

// Function để tạo README cho thư mục export
function createExportReadme() {
  try {
    const exportDir = path.join(process.cwd(), "exported-blogs");
    const readmePath = path.join(exportDir, "README.md");

    const readmeContent = `# Blog Triết Học MLN111 - Exported Files

Thư mục này chứa các bài viết triết học được export từ hệ thống blog.

## Cấu trúc

- Mỗi file `.md` là một bài viết
- Metadata được lưu trong frontmatter YAML
- Nội dung được format theo Markdown

## Sử dụng

Bạn có thể:
- Đọc trực tiếp các file markdown
- Import vào các hệ thống blog khác
- Sử dụng làm tài liệu học tập

## Thông tin

- **Tổng số bài viết:** ${
      fs.existsSync(BLOGS_FILE)
        ? JSON.parse(fs.readFileSync(BLOGS_FILE, "utf8")).length
        : 0
    }
- **Ngày export:** ${new Date().toLocaleDateString("vi-VN")}
- **Nguồn:** Hệ thống blog triết học MLN111

---

*Được tạo tự động bởi script export-blog-posts.js*
`;

    fs.writeFileSync(readmePath, readmeContent, "utf8");
    console.log("✅ Đã tạo README.md cho thư mục export");
  } catch (error) {
    console.error("❌ Lỗi khi tạo README:", error);
  }
}

// Chạy export
if (require.main === module) {
  const count = exportBlogPosts();
  if (count > 0) {
    createExportReadme();
  }
}

module.exports = { exportBlogPosts, createExportReadme };
