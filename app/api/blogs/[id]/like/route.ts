import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const BLOGS_FILE = path.join(process.cwd(), "data", "blogs.json");

// POST - Like/Unlike blog
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!fs.existsSync(BLOGS_FILE)) {
      return NextResponse.json(
        { error: "Blog không tồn tại" },
        { status: 404 }
      );
    }

    const blogs = JSON.parse(fs.readFileSync(BLOGS_FILE, "utf8"));
    const blogIndex = blogs.findIndex((b: any) => b.id === params.id);

    if (blogIndex === -1) {
      return NextResponse.json(
        { error: "Blog không tồn tại" },
        { status: 404 }
      );
    }

    // Lấy thông tin từ request body
    const body = await request.json().catch(() => ({}));
    const { action, likeCount } = body;

    let newLikeCount: number;
    let message: string;

    if (action === 'unlike') {
      // Unlike: giảm like count
      newLikeCount = Math.max(0, blogs[blogIndex].likes - 1);
      message = "Đã bỏ thích bài viết";
    } else {
      // Like: tăng like count
      newLikeCount = blogs[blogIndex].likes + 1;
      message = "Đã thích bài viết";
    }

    // Cập nhật like count
    blogs[blogIndex].likes = newLikeCount;
    blogs[blogIndex].updatedAt = new Date().toISOString();
    
    fs.writeFileSync(BLOGS_FILE, JSON.stringify(blogs, null, 2));

    return NextResponse.json({
      likes: newLikeCount,
      message: message,
      action: action || 'like'
    });
  } catch (error) {
    return NextResponse.json({ error: "Không thể like blog" }, { status: 500 });
  }
}
