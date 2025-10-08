import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "comments.json");
const rateLimitFilePath = path.join(process.cwd(), "data", "rate-limit.json");

// In-memory storage cho Vercel deployment
let commentsCache: any[] = [];
let rateLimitCache: any = {};
let cacheInitialized = false;

// Cấu hình rate limiting
const RATE_LIMIT_CONFIG = {
  maxCommentsPerIP: 10, // Tối đa 10 bình luận per IP
  cooldownMinutes: 2, // Cooldown 2 phút giữa các bình luận
  maxCommentsPerHour: 5, // Tối đa 5 bình luận per giờ
};

// Đảm bảo thư mục data tồn tại
async function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), "data");
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Đọc bình luận từ file hoặc cache
async function readComments() {
  // Nếu đã có cache, trả về cache
  if (cacheInitialized) {
    return commentsCache;
  }

  try {
    await ensureDataDirectory();
    const data = await fs.readFile(dataFilePath, "utf8");
    const comments = JSON.parse(data);
    commentsCache = comments;
    cacheInitialized = true;
    return comments;
  } catch (error) {
    // Nếu file không tồn tại, trả về mảng rỗng
    commentsCache = [];
    cacheInitialized = true;
    return [];
  }
}

// Ghi bình luận vào file và cache
async function writeComments(comments: any[]) {
  // Cập nhật cache
  commentsCache = comments;
  cacheInitialized = true;
  
  // Thử ghi vào file (sẽ fail trên Vercel nhưng không sao)
  try {
    await ensureDataDirectory();
    await fs.writeFile(dataFilePath, JSON.stringify(comments, null, 2));
  } catch (error) {
    // Trên Vercel, file system chỉ đọc, bỏ qua lỗi này
    console.log("File write failed (expected on Vercel):", error);
  }
}

// Lấy IP address từ request
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const remoteAddr = request.headers.get("x-vercel-forwarded-for");

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  if (remoteAddr) {
    return remoteAddr;
  }

  return "unknown";
}

// Đọc rate limit data từ file hoặc cache
async function readRateLimit() {
  // Nếu đã có cache, trả về cache
  if (cacheInitialized && Object.keys(rateLimitCache).length > 0) {
    return rateLimitCache;
  }

  try {
    await ensureDataDirectory();
    const data = await fs.readFile(rateLimitFilePath, "utf8");
    const rateLimit = JSON.parse(data);
    rateLimitCache = rateLimit;
    return rateLimit;
  } catch (error) {
    rateLimitCache = {};
    return {};
  }
}

// Ghi rate limit data vào file và cache
async function writeRateLimit(data: any) {
  // Cập nhật cache
  rateLimitCache = data;
  
  // Thử ghi vào file (sẽ fail trên Vercel nhưng không sao)
  try {
    await ensureDataDirectory();
    await fs.writeFile(rateLimitFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    // Trên Vercel, file system chỉ đọc, bỏ qua lỗi này
    console.log("Rate limit file write failed (expected on Vercel):", error);
  }
}

// Kiểm tra rate limit
async function checkRateLimit(
  ip: string
): Promise<{ allowed: boolean; message?: string }> {
  const rateLimitData = await readRateLimit();
  const now = Date.now();
  const oneHourAgo = now - 60 * 60 * 1000;
  const cooldownTime = now - RATE_LIMIT_CONFIG.cooldownMinutes * 60 * 1000;

  // Khởi tạo data cho IP mới
  if (!rateLimitData[ip]) {
    rateLimitData[ip] = {
      comments: [],
      lastComment: 0,
    };
  }

  const ipData = rateLimitData[ip];

  // Xóa các bình luận cũ hơn 1 giờ
  ipData.comments = ipData.comments.filter(
    (timestamp: number) => timestamp > oneHourAgo
  );

  // Kiểm tra cooldown
  if (
    now - ipData.lastComment <
    RATE_LIMIT_CONFIG.cooldownMinutes * 60 * 1000
  ) {
    const remainingTime = Math.ceil(
      (RATE_LIMIT_CONFIG.cooldownMinutes * 60 * 1000 -
        (now - ipData.lastComment)) /
        1000
    );
    return {
      allowed: false,
      message: `Vui lòng đợi ${remainingTime} giây trước khi bình luận tiếp.`,
    };
  }

  // Kiểm tra số bình luận per giờ
  if (ipData.comments.length >= RATE_LIMIT_CONFIG.maxCommentsPerHour) {
    return {
      allowed: false,
      message: `Bạn đã đạt giới hạn ${RATE_LIMIT_CONFIG.maxCommentsPerHour} bình luận/giờ. Vui lòng thử lại sau.`,
    };
  }

  // Kiểm tra tổng số bình luận
  const comments = await readComments();
  const userComments = comments.filter(
    (comment: any) =>
      (comment.author &&
        comment.author.toLowerCase().includes(ip.toLowerCase())) ||
      comment.ip === ip
  );

  if (userComments.length >= RATE_LIMIT_CONFIG.maxCommentsPerIP) {
    return {
      allowed: false,
      message: `Bạn đã đạt giới hạn ${RATE_LIMIT_CONFIG.maxCommentsPerIP} bình luận.`,
    };
  }

  return { allowed: true };
}

// Cập nhật rate limit sau khi bình luận
async function updateRateLimit(ip: string) {
  const rateLimitData = await readRateLimit();
  const now = Date.now();

  if (!rateLimitData[ip]) {
    rateLimitData[ip] = {
      comments: [],
      lastComment: 0,
    };
  }

  rateLimitData[ip].comments.push(now);
  rateLimitData[ip].lastComment = now;

  await writeRateLimit(rateLimitData);
}

// GET - Lấy tất cả bình luận
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const viewpointId = searchParams.get("viewpointId");

    const comments = await readComments();

    // Lọc bình luận theo viewpointId nếu có
    const filteredComments = viewpointId
      ? comments.filter(
          (comment: any) => comment.viewpointId === parseInt(viewpointId)
        )
      : comments;

    return NextResponse.json(filteredComments);
  } catch (error) {
    console.error("Error reading comments:", error);
    return NextResponse.json(
      { error: "Failed to read comments" },
      { status: 500 }
    );
  }
}

// POST - Thêm bình luận mới
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { author, content, viewpointId, parentId } = body;

    if (!author || !content || !viewpointId) {
      return NextResponse.json(
        { error: "Author, content, and viewpointId are required" },
        { status: 400 }
      );
    }

    // Lấy IP và kiểm tra rate limit
    const clientIP = getClientIP(request);
    const rateLimitCheck = await checkRateLimit(clientIP);

    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        { error: rateLimitCheck.message },
        { status: 429 } // Too Many Requests
      );
    }

    const comments = await readComments();

    const newComment = {
      id: Date.now().toString(),
      author: author.trim(),
      content: content.trim(),
      viewpointId: parseInt(viewpointId),
      parentId: parentId || null,
      timestamp: new Date().toISOString(),
      ip: clientIP, // Lưu IP để tracking
      replies: [],
    };

    if (parentId) {
      // Thêm reply vào comment cha
      const addReplyToComment = (comments: any[]): any[] => {
        return comments.map((comment: any) => {
          if (comment.id === parentId) {
            return {
              ...comment,
              replies: [...comment.replies, newComment],
            };
          }
          if (comment.replies.length > 0) {
            return {
              ...comment,
              replies: addReplyToComment(comment.replies),
            };
          }
          return comment;
        });
      };

      const updatedComments = addReplyToComment(comments);
      await writeComments(updatedComments);
    } else {
      // Thêm comment mới
      comments.push(newComment);
      await writeComments(comments);
    }

    // Cập nhật rate limit sau khi bình luận thành công
    await updateRateLimit(clientIP);

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}

// DELETE - Xóa bình luận
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const commentId = searchParams.get("id");
    const clientIP = searchParams.get("ip");

    if (!commentId) {
      return NextResponse.json(
        { error: "Comment ID is required" },
        { status: 400 }
      );
    }

    const comments = await readComments();

    // Tìm và xóa bình luận
    const deleteComment = (
      comments: any[]
    ): { found: boolean; updatedComments: any[] } => {
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].id === commentId) {
          // Kiểm tra quyền xóa (chỉ cho phép xóa bình luận của cùng IP)
          if (clientIP && comments[i].ip !== clientIP) {
            return { found: false, updatedComments: comments };
          }

          // Xóa bình luận
          comments.splice(i, 1);
          return { found: true, updatedComments: comments };
        }

        // Tìm trong replies
        if (comments[i].replies && comments[i].replies.length > 0) {
          const result = deleteComment(comments[i].replies);
          if (result.found) {
            comments[i].replies = result.updatedComments;
            return { found: true, updatedComments: comments };
          }
        }
      }
      return { found: false, updatedComments: comments };
    };

    const result = deleteComment(comments);

    if (!result.found) {
      return NextResponse.json(
        {
          error: "Comment not found or you don't have permission to delete it",
        },
        { status: 404 }
      );
    }

    await writeComments(result.updatedComments);

    return NextResponse.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json(
      { error: "Failed to delete comment" },
      { status: 500 }
    );
  }
}
