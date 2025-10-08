import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const BLOG_COMMENTS_FILE = path.join(
  process.cwd(),
  "data",
  "blog-comments.json"
);

// In-memory storage cho Vercel deployment
let blogCommentsCache: any[] = [];
let blogCommentsCacheInitialized = false;

// Đảm bảo thư mục data tồn tại
async function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), "data");
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Helper function to read blog comments từ file hoặc cache
async function readBlogComments() {
  // Nếu đã có cache, trả về cache
  if (blogCommentsCacheInitialized) {
    return blogCommentsCache;
  }

  try {
    await ensureDataDirectory();
    const data = await fs.readFile(BLOG_COMMENTS_FILE, "utf8");
    const comments = JSON.parse(data);
    blogCommentsCache = comments;
    blogCommentsCacheInitialized = true;
    return comments;
  } catch (error) {
    // Nếu file không tồn tại, trả về mảng rỗng
    blogCommentsCache = [];
    blogCommentsCacheInitialized = true;
    return [];
  }
}

// Helper function to write blog comments vào file và cache
async function writeBlogComments(comments: any[]) {
  // Cập nhật cache
  blogCommentsCache = comments;
  blogCommentsCacheInitialized = true;
  
  // Thử ghi vào file (sẽ fail trên Vercel nhưng không sao)
  try {
    await ensureDataDirectory();
    await fs.writeFile(
      BLOG_COMMENTS_FILE,
      JSON.stringify(comments, null, 2),
      "utf8"
    );
  } catch (error) {
    // Trên Vercel, file system chỉ đọc, bỏ qua lỗi này
    console.log("Blog comments file write failed (expected on Vercel):", error);
  }
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

    const allComments = await readBlogComments();
    const blogComments = allComments.filter(
      (comment: any) => comment.blogId === blogId
    );

    // Sort by timestamp (newest first)
    blogComments.sort(
      (a: any, b: any) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

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

    const comments = await readBlogComments();
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

    await writeBlogComments(comments);

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error("Error creating blog comment:", error);
    return NextResponse.json(
      { error: "Không thể tạo bình luận" },
      { status: 500 }
    );
  }
}
