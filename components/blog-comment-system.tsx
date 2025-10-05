"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { MessageCircle, Reply, Trash2, Send, User, Clock } from "lucide-react";
import toast from "react-hot-toast";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

interface BlogComment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  blogId: string;
  parentId?: string | null;
  replies: BlogComment[];
}

interface BlogCommentItemProps {
  comment: BlogComment;
  onReply: (commentId: string, author: string, content: string) => void;
  onDelete: (commentId: string) => void;
  depth?: number;
}

function BlogCommentItem({
  comment,
  onReply,
  onDelete,
  depth = 0,
}: BlogCommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyAuthor, setReplyAuthor] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyAuthor.trim() && replyContent.trim()) {
      onReply(comment.id, replyAuthor, replyContent);
      setReplyAuthor("");
      setReplyContent("");
      setShowReplyForm(false);
    }
  };

  const handleDelete = () => {
    onDelete(comment.id);
    setShowDeleteConfirm(false);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Vừa xong";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} phút trước`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} ngày trước`;
    
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const maxDepth = 3;
  const isMaxDepth = depth >= maxDepth;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`${depth > 0 ? "ml-8 border-l-2 border-orange-200 pl-4" : ""}`}
    >
      <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
        {/* Comment Header */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center">
            <User className="w-3 h-3 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-800 text-sm">{comment.author}</span>
              <div className="flex items-center gap-1 text-gray-500 text-xs">
                <Clock className="w-2 h-2" />
                {formatTime(comment.timestamp)}
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDeleteConfirm(true)}
            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 h-6 w-6"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>

        {/* Comment Content */}
        <div className="text-gray-700 leading-relaxed mb-2 text-sm">
          {comment.content}
        </div>

        {/* Comment Actions */}
        <div className="flex items-center gap-2">
          {!isMaxDepth && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 flex items-center gap-1 h-6 px-2"
            >
              <Reply className="w-3 h-3" />
              <span className="text-xs">Trả lời</span>
            </Button>
          )}
        </div>

        {/* Reply Form */}
        <AnimatePresence>
          {showReplyForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-3 pt-3 border-t border-gray-100"
            >
              <form onSubmit={handleSubmitReply} className="space-y-2">
                <Input
                  value={replyAuthor}
                  onChange={(e) => setReplyAuthor(e.target.value)}
                  placeholder="Tên của bạn..."
                  className="border-orange-200 focus:border-orange-400 text-sm h-8"
                  required
                />
                <Textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder={`Trả lời ${comment.author}...`}
                  rows={2}
                  className="border-orange-200 focus:border-orange-400 resize-none text-sm"
                  required
                />
                <div className="flex gap-2">
                  <Button
                    type="submit"
                    size="sm"
                    className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white h-7 px-3"
                  >
                    <Send className="w-3 h-3 mr-1" />
                    <span className="text-xs">Gửi</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowReplyForm(false)}
                    className="h-7 px-3"
                  >
                    <span className="text-xs">Hủy</span>
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3 space-y-2">
            {comment.replies.map((reply) => (
              <BlogCommentItem
                key={reply.id}
                comment={reply}
                onReply={onReply}
                onDelete={onDelete}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Xóa bình luận"
        message="Bạn có chắc chắn muốn xóa bình luận này? Hành động này không thể hoàn tác."
        confirmText="Xóa"
        cancelText="Hủy"
        variant="destructive"
      />
    </motion.div>
  );
}

interface BlogCommentSystemProps {
  blogId: string;
  blogTitle: string;
}

export function BlogCommentSystem({ blogId, blogTitle }: BlogCommentSystemProps) {
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/blog-comments?blogId=${blogId}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      } else {
        console.error("Failed to fetch comments");
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast.error("Không thể tải bình luận");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/blog-comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blogId,
          author: author.trim(),
          content: content.trim(),
        }),
      });

      if (response.ok) {
        const newComment = await response.json();
        setComments((prev) => [newComment, ...prev]);
        setAuthor("");
        setContent("");
        toast.success("Đã thêm bình luận!");
      } else {
        const error = await response.json();
        toast.error(error.error || "Không thể thêm bình luận");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error("Lỗi khi thêm bình luận");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReply = async (parentId: string, replyAuthor: string, replyContent: string) => {
    try {
      const response = await fetch("/api/blog-comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blogId,
          author: replyAuthor.trim(),
          content: replyContent.trim(),
          parentId,
        }),
      });

      if (response.ok) {
        const newReply = await response.json();
        setComments((prev) =>
          prev.map((comment) =>
            comment.id === parentId
              ? { ...comment, replies: [...comment.replies, newReply] }
              : comment
          )
        );
        toast.success("Đã thêm trả lời!");
      } else {
        const error = await response.json();
        toast.error(error.error || "Không thể thêm trả lời");
      }
    } catch (error) {
      console.error("Error submitting reply:", error);
      toast.error("Lỗi khi thêm trả lời");
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      const response = await fetch(`/api/blog-comments/${commentId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setComments((prev) => {
          const removeComment = (comments: BlogComment[]): BlogComment[] => {
            return comments.filter((comment) => {
              if (comment.id === commentId) return false;
              comment.replies = removeComment(comment.replies);
              return true;
            });
          };
          return removeComment(prev);
        });
        toast.success("Đã xóa bình luận");
      } else {
        const error = await response.json();
        toast.error(error.error || "Không thể xóa bình luận");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Lỗi khi xóa bình luận");
    }
  };

  const totalComments = comments.reduce((total, comment) => {
    return total + 1 + comment.replies.length;
  }, 0);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 animate-pulse">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-1/6"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Bình luận</h3>
            <p className="text-gray-600 text-xs">
              {totalComments} bình luận
            </p>
          </div>
        </div>
      </div>

      {/* Comment Form */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Tên của bạn..."
            className="border-orange-200 focus:border-orange-400 text-sm"
            required
          />
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Viết bình luận..."
            rows={3}
            className="border-orange-200 focus:border-orange-400 resize-none text-sm"
            required
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={submitting}
              size="sm"
              className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
            >
              {submitting ? (
                <>
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Đang gửi...
                </>
              ) : (
                <>
                  <Send className="w-3 h-3 mr-1" />
                  Gửi
                </>
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Comments List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {comments.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 text-sm">Chưa có bình luận nào</p>
          </div>
        ) : (
          <AnimatePresence>
            {comments.map((comment) => (
              <BlogCommentItem
                key={comment.id}
                comment={comment}
                onReply={handleReply}
                onDelete={handleDelete}
              />
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
