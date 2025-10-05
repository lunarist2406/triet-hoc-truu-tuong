"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { MessageCircle, Reply, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { AnimatedButton } from "@/components/ui/animated-button";
import { AnimatedCard } from "@/components/ui/animated-card";
import { CommentSkeleton } from "@/components/ui/skeleton";

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  viewpointId: number;
  parentId?: string | null;
  replies: Comment[];
}

interface CommentItemProps {
  comment: Comment;
  onReply: (commentId: string, author: string, content: string) => void;
  onDelete: (commentId: string) => void;
  depth?: number;
}

function CommentItem({
  comment,
  onReply,
  onDelete,
  depth = 0,
}: CommentItemProps) {
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

  return (
    <motion.div
      className={`${depth > 0 ? "ml-8 mt-4" : "mt-6"}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatedCard className="bg-secondary/50 rounded-lg p-4 border border-border">
        <div className="flex items-start justify-between mb-2">
          <div>
            <span className="font-semibold text-foreground">
              {comment.author}
            </span>
            <span className="text-xs text-muted-foreground ml-2">
              {new Date(comment.timestamp).toLocaleDateString("vi-VN")}{" "}
              {new Date(comment.timestamp).toLocaleTimeString("vi-VN")}
            </span>
          </div>
        </div>
        <p className="text-foreground leading-relaxed mb-3">
          {comment.content}
        </p>
        <div className="flex gap-2">
          <AnimatedButton
            variant="ghost"
            size="sm"
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="text-primary hover:text-primary/80"
          >
            <Reply className="h-4 w-4 mr-1" />
            Trả lời
          </AnimatedButton>
          <AnimatedButton
            variant="ghost"
            size="sm"
            onClick={() => setShowDeleteConfirm(true)}
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Xóa
          </AnimatedButton>
        </div>

        <AnimatePresence>
          {showReplyForm && (
            <motion.form
              onSubmit={handleSubmitReply}
              className="mt-4 space-y-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Input
                placeholder="Tên của bạn"
                value={replyAuthor}
                onChange={(e) => setReplyAuthor(e.target.value)}
                className="bg-background"
                required
              />
              <Textarea
                placeholder="Viết câu trả lời..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="bg-background min-h-[80px]"
                required
              />
              <div className="flex gap-2">
                <AnimatedButton
                  type="submit"
                  size="sm"
                  className="bg-primary hover:bg-primary/90"
                >
                  Gửi trả lời
                </AnimatedButton>
                <AnimatedButton
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => setShowReplyForm(false)}
                >
                  Hủy
                </AnimatedButton>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </AnimatedCard>

      <AnimatePresence>
        {comment.replies.length > 0 && (
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {comment.replies.map((reply, index) => (
              <motion.div
                key={reply.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CommentItem
                  comment={reply}
                  onReply={onReply}
                  onDelete={onDelete}
                  depth={depth + 1}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={() => onDelete(comment.id)}
        title="Xóa bình luận"
        message="Bạn có chắc chắn muốn xóa bình luận này? Hành động này không thể hoàn tác."
        type="danger"
        confirmText="Xóa"
        cancelText="Hủy"
      />
    </motion.div>
  );
}

export function CommentSystem({ viewpointId }: { viewpointId: number }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  // Load comments khi component mount
  useEffect(() => {
    loadComments();
  }, [viewpointId]);

  const loadComments = async () => {
    try {
      const response = await fetch(`/api/comments?viewpointId=${viewpointId}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (error) {
      console.error("Error loading comments:", error);
    }
  };

  const addComment = async (author: string, content: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author,
          content,
          viewpointId,
        }),
      });

      if (response.ok) {
        await loadComments(); // Reload comments
        toast.success("Bình luận đã được gửi thành công!");
      } else {
        const errorData = await response.json();
        if (response.status === 429) {
          toast.error(errorData.error);
        } else {
          console.error("Failed to add comment:", errorData.error);
          toast.error("Có lỗi xảy ra khi gửi bình luận");
        }
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Có lỗi xảy ra khi gửi bình luận");
    } finally {
      setLoading(false);
    }
  };

  const addReply = async (
    commentId: string,
    author: string,
    content: string
  ) => {
    setLoading(true);
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author,
          content,
          viewpointId,
          parentId: commentId,
        }),
      });

      if (response.ok) {
        await loadComments(); // Reload comments
        toast.success("Trả lời đã được gửi thành công!");
      } else {
        const errorData = await response.json();
        if (response.status === 429) {
          toast.error(errorData.error);
        } else {
          console.error("Failed to add reply:", errorData.error);
          toast.error("Có lỗi xảy ra khi gửi trả lời");
        }
      }
    } catch (error) {
      console.error("Error adding reply:", error);
      toast.error("Có lỗi xảy ra khi gửi trả lời");
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (commentId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/comments?id=${commentId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await loadComments(); // Reload comments
        toast.success("Đã xóa bình luận thành công");
      } else {
        const errorData = await response.json();
        if (response.status === 404) {
          toast.error("Không tìm thấy bình luận hoặc bạn không có quyền xóa");
        } else {
          console.error("Failed to delete comment:", errorData.error);
          toast.error("Có lỗi xảy ra khi xóa bình luận");
        }
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Có lỗi xảy ra khi xóa bình luận");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (author.trim() && content.trim() && !loading) {
      addComment(author, content);
      setAuthor("");
      setContent("");
    }
  };

  return (
    <section id="comments" className="py-12 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center gap-2 mb-6">
          <MessageCircle className="h-6 w-6 text-primary" />
          <h3 className="text-2xl font-bold text-foreground">Bình luận</h3>
          <span className="text-sm text-muted-foreground">
            ({comments.length})
          </span>
        </div>

        {/* Comment Form */}
        <form
          onSubmit={handleSubmit}
          className="mb-8 space-y-4 bg-secondary/30 p-6 rounded-lg border border-border"
        >
          <Input
            placeholder="Tên của bạn"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="bg-background"
            required
          />
          <Textarea
            placeholder="Viết bình luận của bạn..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-background min-h-[120px]"
            required
          />
          <AnimatedButton
            type="submit"
            className="bg-primary hover:bg-primary/90"
            disabled={loading}
          >
            {loading ? "Đang gửi..." : "Gửi bình luận"}
          </AnimatedButton>
        </form>

        {/* Comments List */}
        <div className="space-y-4">
          {loading && comments.length === 0 ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <CommentSkeleton key={i} />
              ))}
            </div>
          ) : comments.length === 0 ? (
            <motion.p
              className="text-center text-muted-foreground py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
            </motion.p>
          ) : (
            <AnimatePresence>
              {comments.map((comment, index) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CommentItem
                    comment={comment}
                    onReply={addReply}
                    onDelete={deleteComment}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
}
