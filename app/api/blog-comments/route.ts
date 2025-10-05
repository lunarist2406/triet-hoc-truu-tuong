import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const BLOG_COMMENTS_FILE = path.join(process.cwd(), "data", "blog-comments.json");

// Helper function to read blog comments
function readBlogComments() {
  if (!fs.existsSync(BLOG_COMMENTS_FILE)) {
    fs.writeFileSync(BLOG_COMMENTS_FILE, "[]", "utf8");
    return [];
  }
  const data = fs.readFileSync(BLOG_COMMENTS_FILE, "utf8");
  return JSON.parse(data);
}

// Helper function to write blog comments
function writeBlogComments(comments: any[]) {
  fs.writeFileSync(BLOG_COMMENTS_FILE, JSON.stringify(comments, null, 2), "utf8");
}

// GET - Get comments for a specific blog
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const blogId = searchParams.get("blogId");

    if (!blogId) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 }
      );
    }

    const allComments = readBlogComments();
    const blogComments = allComments.filter((comment: any) => comment.blogId === blogId);

    // Sort by timestamp (newest first)
    blogComments.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return NextResponse.json(blogComments);
  } catch (error) {
    console.error("Error fetching blog comments:", error);
    return NextResponse.json(
      { error: "Không thể tải bình luận" },
      { status: 500 }
    );
  }
}

// POST - Create a new comment
export async function POST(request: NextRequest) {
  try {
    const { blogId, author, content, parentId } = await request.json();

    if (!blogId || !author || !content) {
      return NextResponse.json(
        { error: "Thiếu thông tin bình luận" },
        { status: 400 }
      );
    }

    const comments = readBlogComments();
    const newComment = {
      id: uuidv4(),
      blogId,
      author: author.trim(),
      content: content.trim(),
      timestamp: new Date().toISOString(),
      parentId: parentId || null,
      replies: [],
    };

    if (parentId) {
      // This is a reply - find parent comment and add to its replies
      const parentComment = comments.find((c: any) => c.id === parentId);
      if (parentComment) {
        parentComment.replies.push(newComment);
      } else {
        return NextResponse.json(
          { error: "Không tìm thấy bình luận gốc" },
          { status: 404 }
        );
      }
    } else {
      // This is a top-level comment
      comments.push(newComment);
    }

    writeBlogComments(comments);

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error("Error creating blog comment:", error);
    return NextResponse.json(
      { error: "Không thể tạo bình luận" },
      { status: 500 }
    );
  }
}
