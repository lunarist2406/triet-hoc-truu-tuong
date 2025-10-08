import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const BLOG_COMMENTS_FILE = path.join(
  process.cwd(),
  "data",
  "blog-comments.json"
);

// Đảm bảo thư mục data tồn tại
async function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), "data");
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Helper function to read blog comments
async function readBlogComments() {
  try {
    await ensureDataDirectory();
    const data = await fs.readFile(BLOG_COMMENTS_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    // Nếu file không tồn tại, trả về mảng rỗng
    return [];
  }
}

// Helper function to write blog comments
async function writeBlogComments(comments: any[]) {
  await ensureDataDirectory();
  await fs.writeFile(
    BLOG_COMMENTS_FILE,
    JSON.stringify(comments, null, 2),
    "utf8"
  );
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
