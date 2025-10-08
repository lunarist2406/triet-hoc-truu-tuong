import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

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

// Helper function to recursively remove comment and its replies
function removeCommentRecursively(comments: any[], commentId: string): any[] {
  return comments.filter((comment) => {
    if (comment.id === commentId) {
      return false; // Remove this comment
    }
    // Recursively remove from replies
    comment.replies = removeCommentRecursively(
      comment.replies || [],
      commentId
    );
    return true;
  });
}

// DELETE - Delete a comment
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const commentId = params.id;

    if (!commentId) {
      return NextResponse.json(
        { error: "Comment ID is required" },
        { status: 400 }
      );
    }

    const comments = await readBlogComments();
    const updatedComments = removeCommentRecursively(comments, commentId);

    // Check if comment was actually removed
    if (updatedComments.length === comments.length) {
      return NextResponse.json(
        { error: "Không tìm thấy bình luận" },
        { status: 404 }
      );
    }

    await writeBlogComments(updatedComments);

    return NextResponse.json(
      { message: "Đã xóa bình luận thành công" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting blog comment:", error);
    return NextResponse.json(
      { error: "Không thể xóa bình luận" },
      { status: 500 }
    );
  }
}
