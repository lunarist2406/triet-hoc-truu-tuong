import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const BLOGS_FILE = path.join(process.cwd(), "data", "blogs.json");

// Đảm bảo file tồn tại
function ensureBlogsFile() {
  const dir = path.dirname(BLOGS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(BLOGS_FILE)) {
    fs.writeFileSync(BLOGS_FILE, JSON.stringify([]));
  }
}

// GET - Lấy tất cả blogs
export async function GET() {
  try {
    ensureBlogsFile();
    const blogs = JSON.parse(fs.readFileSync(BLOGS_FILE, "utf8"));
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: "Không thể đọc blogs" }, { status: 500 });
  }
}

// POST - Tạo blog mới
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, author, tags = [] } = body;

    if (!title || !content || !author) {
      return NextResponse.json(
        { error: "Thiếu thông tin bắt buộc" },
        { status: 400 }
      );
    }

    ensureBlogsFile();
    const blogs = JSON.parse(fs.readFileSync(BLOGS_FILE, "utf8"));

    const newBlog = {
      id: Date.now().toString(),
      title,
      content,
      author,
      tags,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      likes: 0,
    };

    blogs.push(newBlog);
    fs.writeFileSync(BLOGS_FILE, JSON.stringify(blogs, null, 2));

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Không thể tạo blog" }, { status: 500 });
  }
}
