"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  User,
  Eye,
  Heart,
  Edit,
  Trash2,
  Plus,
  BookOpen,
  X,
  MessageCircle,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { BlogCommentSystem } from "@/components/blog-comment-system";

interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  views: number;
  likes: number;
}

interface BlogListProps {
  onEdit?: (blog: Blog) => void;
  onDelete?: (blogId: string) => void;
  onCreateNew?: () => void;
  showActions?: boolean;
  refreshTrigger?: number; // Thêm prop để trigger refresh
}

export function BlogList({
  onEdit,
  onDelete,
  onCreateNew,
  showActions = true,
  refreshTrigger,
}: BlogListProps) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Thêm useEffect để listen refreshTrigger
  useEffect(() => {
    if (refreshTrigger && refreshTrigger > 0) {
      fetchBlogs();
    }
  }, [refreshTrigger]);

  // Force re-render khi localStorage thay đổi để cập nhật trạng thái like
  useEffect(() => {
    const handleStorageChange = () => {
      // Force re-render bằng cách cập nhật một state dummy
      setBlogs((prev) => [...prev]);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blogs");
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      } else {
        toast.error("Không thể tải danh sách blog");
      }
    } catch (error) {
      toast.error("Lỗi khi tải blog");
    } finally {
      setLoading(false);
    }
  };

  // Function để lấy danh sách bài viết đã like từ localStorage
  const getLikedBlogs = (): string[] => {
    if (typeof window === "undefined") return [];
    try {
      const liked = localStorage.getItem("likedBlogs");
      return liked ? JSON.parse(liked) : [];
    } catch {
      return [];
    }
  };

  // Function để lưu danh sách bài viết đã like vào localStorage
  const saveLikedBlogs = (likedBlogs: string[]) => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem("likedBlogs", JSON.stringify(likedBlogs));
    } catch (error) {
      console.error("Lỗi khi lưu liked blogs:", error);
    }
  };

  // Function để kiểm tra xem bài viết đã được like chưa
  const isBlogLiked = (blogId: string): boolean => {
    const likedBlogs = getLikedBlogs();
    return likedBlogs.includes(blogId);
  };

  const handleLike = async (blogId: string) => {
    try {
      const likedBlogs = getLikedBlogs();
      const isLiked = isBlogLiked(blogId);

      let newLikedBlogs: string[];
      let newLikeCount: number;
      let message: string;

      if (isLiked) {
        // Unlike: loại bỏ blogId khỏi danh sách
        newLikedBlogs = likedBlogs.filter((id) => id !== blogId);
        newLikeCount =
          Math.max(0, blogs.find((blog) => blog.id === blogId)?.likes || 0) - 1;
        message = "Đã bỏ thích bài viết";
      } else {
        // Like: thêm blogId vào danh sách
        newLikedBlogs = [...likedBlogs, blogId];
        newLikeCount =
          (blogs.find((blog) => blog.id === blogId)?.likes || 0) + 1;
        message = "Đã thích bài viết";
      }

      // Cập nhật state ngay lập tức để UX mượt mà
      setBlogs((prev) =>
        prev.map((blog) =>
          blog.id === blogId ? { ...blog, likes: newLikeCount } : blog
        )
      );

      // Lưu trạng thái like vào localStorage
      saveLikedBlogs(newLikedBlogs);

      // Gọi API để cập nhật server (optional - có thể bỏ qua nếu chỉ cần client-side)
      try {
        const response = await fetch(`/api/blogs/${blogId}/like`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: isLiked ? "unlike" : "like",
            likeCount: newLikeCount,
          }),
        });

        if (!response.ok) {
          console.warn("API call failed, but local state updated");
        }
      } catch (apiError) {
        console.warn("API call failed, but local state updated:", apiError);
      }

      toast.success(message);
    } catch (error) {
      toast.error("Lỗi khi thích bài viết");
      console.error("Like error:", error);
    }
  };

  const handleDeleteClick = (blogId: string) => {
    setBlogToDelete(blogId);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!blogToDelete) return;

    try {
      const response = await fetch(`/api/blogs/${blogToDelete}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setBlogs((prev) => prev.filter((blog) => blog.id !== blogToDelete));
        toast.success("Đã xóa bài viết");
        if (onDelete) onDelete(blogToDelete);
      } else {
        toast.error("Không thể xóa bài viết");
      }
    } catch (error) {
      toast.error("Lỗi khi xóa bài viết");
    } finally {
      setShowDeleteDialog(false);
      setBlogToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteDialog(false);
    setBlogToDelete(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Function để chuyển đổi markdown thành văn bản bình thường
  const markdownToText = (markdown: string) => {
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
  };

  const truncateContent = (content: string, maxLength: number = 200) => {
    const plainText = markdownToText(content);
    if (plainText.length <= maxLength) return plainText;
    return plainText.substring(0, maxLength) + "...";
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-orange-500" />
          <div>
            <h2 className="text-2xl font-bold text-primary">Blog Triết Học</h2>
            <p className="text-muted-foreground">
              Khám phá những tư tưởng sâu sắc
            </p>
          </div>
        </div>

        {showActions && onCreateNew && (
          <Button
            onClick={onCreateNew}
            className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Viết Bài Mới
          </Button>
        )}
      </div>

      {/* Blog List */}
      {blogs.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Chưa có bài viết nào</h3>
            <p className="text-muted-foreground mb-4">
              Hãy là người đầu tiên chia sẻ suy nghĩ về triết học!
            </p>
            {showActions && onCreateNew && (
              <Button
                onClick={onCreateNew}
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Viết Bài Đầu Tiên
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-orange-50/30 hover:from-orange-50/50 hover:to-yellow-50/30 group">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-3 line-clamp-2 text-gray-800 group-hover:text-orange-700 transition-colors duration-300">
                        {blog.title}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span className="font-medium">{blog.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(blog.createdAt)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {blog.views}
                        </div>
                      </div>
                    </div>

                    {showActions && (
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {onEdit && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onEdit(blog)}
                            className="border-orange-200 hover:border-orange-300 hover:bg-orange-50"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteClick(blog.id)}
                          className="border-red-200 hover:border-red-300 hover:bg-red-50 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="bg-gray-50/50 rounded-lg p-4 mb-4 border border-gray-100">
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {truncateContent(blog.content)}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="secondary"
                        className="bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-800 hover:from-orange-200 hover:to-yellow-200 border border-orange-200 transition-all duration-300"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedBlog(blog)}
                      className="text-orange-600 hover:text-orange-700 border-orange-200 hover:border-orange-300 hover:bg-orange-50 transition-all duration-300"
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      Đọc Thêm
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(blog.id)}
                      className={`flex items-center gap-1 transition-all duration-300 ${
                        isBlogLiked(blog.id)
                          ? "text-red-500 hover:text-red-600 hover:bg-red-50"
                          : "text-gray-500 hover:text-red-500 hover:bg-red-50"
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 transition-all duration-300 ${
                          isBlogLiked(blog.id) ? "fill-current" : ""
                        }`}
                      />
                      {blog.likes}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Blog Detail Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white rounded-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    {selectedBlog.title}
                  </h2>
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span className="font-medium">{selectedBlog.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {formatDate(selectedBlog.createdAt)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      {selectedBlog.views} lượt xem
                    </div>
                  </div>
                </div>
                 <Button
                   variant="ghost"
                   size="sm"
                   onClick={() => setSelectedBlog(null)}
                   className="text-gray-500 hover:text-gray-700 hover:bg-white/50 rounded-full p-2"
                 >
                   <X className="w-5 h-5" />
                 </Button>
              </div>

               {/* Blog Info */}
               <div className="flex items-center gap-4 mt-4">
                 <div className="flex items-center gap-2 text-sm text-gray-600">
                   <MessageCircle className="w-4 h-4" />
                   <span>Bình luận</span>
                 </div>
                 <div className="flex items-center gap-2 text-sm text-gray-600">
                   <Heart className="w-4 h-4" />
                   <span>{selectedBlog.likes} lượt thích</span>
                 </div>
               </div>
            </div>

            {/* Split Content */}
            <div className="flex h-[60vh]">
              {/* Left Side - Blog Content */}
              <div className="flex-1 p-6 overflow-y-auto border-r border-gray-200">
                <div className="prose max-w-none">
                  {markdownToText(selectedBlog.content)
                    .split("\n")
                    .map((paragraph, index) => {
                      if (paragraph.trim() === "") return null;
                      return (
                        <p
                          key={index}
                          className="mb-4 leading-relaxed text-gray-700 text-base"
                        >
                          {paragraph}
                        </p>
                      );
                    })}
                </div>
              </div>

              {/* Right Side - Comments */}
              <div className="w-96 overflow-y-auto bg-gray-50">
                <BlogCommentSystem
                  blogId={selectedBlog.id}
                  blogTitle={selectedBlog.title}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 p-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedBlog.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-800 border border-orange-200"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Cập nhật lần cuối: {formatDate(selectedBlog.updatedAt)}
                </div>
                <Button
                  onClick={() => handleLike(selectedBlog.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isBlogLiked(selectedBlog.id)
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-gray-200 hover:bg-red-500 hover:text-white text-gray-700"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 transition-all duration-300 ${
                      isBlogLiked(selectedBlog.id) ? "fill-current" : ""
                    }`}
                  />
                  {isBlogLiked(selectedBlog.id) ? "Đã thích" : "Thích"} (
                  {selectedBlog.likes})
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Xóa bài viết"
        message="Bạn có chắc chắn muốn xóa bài viết này? Hành động này không thể hoàn tác."
        confirmText="Xóa"
        cancelText="Hủy"
        variant="destructive"
      />
    </div>
  );
}
