import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const BLOGS_FILE = path.join(process.cwd(), "data", "blogs.json");

// GET - Lấy blog theo ID
export async function GET(
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
    const blog = blogs.find((b: any) => b.id === params.id);

    if (!blog) {
      return NextResponse.json(
        { error: "Blog không tồn tại" },
        { status: 404 }
      );
    }

    // Tăng view count
    blog.views += 1;
    fs.writeFileSync(BLOGS_FILE, JSON.stringify(blogs, null, 2));

    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: "Không thể đọc blog" }, { status: 500 });
  }
}

// PUT - Cập nhật blog
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, content, tags = [] } = body;

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

    // Cập nhật blog
    blogs[blogIndex] = {
      ...blogs[blogIndex],
      title: title || blogs[blogIndex].title,
      content: content || blogs[blogIndex].content,
      tags: tags || blogs[blogIndex].tags,
      updatedAt: new Date().toISOString(),
    };

    fs.writeFileSync(BLOGS_FILE, JSON.stringify(blogs, null, 2));

    return NextResponse.json(blogs[blogIndex]);
  } catch (error) {
    return NextResponse.json(
      { error: "Không thể cập nhật blog" },
      { status: 500 }
    );
  }
}

// DELETE - Xóa blog
export async function DELETE(
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

    const deletedBlog = blogs.splice(blogIndex, 1)[0];
    fs.writeFileSync(BLOGS_FILE, JSON.stringify(blogs, null, 2));

    return NextResponse.json(deletedBlog);
  } catch (error) {
    return NextResponse.json({ error: "Không thể xóa blog" }, { status: 500 });
  }
}
