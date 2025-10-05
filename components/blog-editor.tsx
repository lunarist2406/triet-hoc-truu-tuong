"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Save, X, Tag, User, FileText, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

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

interface BlogEditorProps {
  blog?: Blog | null;
  onSave?: (blog: Blog) => void;
  onCancel?: () => void;
  isOpen: boolean;
}

export function BlogEditor({
  blog,
  onSave,
  onCancel,
  isOpen,
}: BlogEditorProps) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    tags: [] as string[],
  });
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title,
        content: blog.content,
        author: blog.author,
        tags: blog.tags,
      });
      setIsEditing(true);
    } else {
      setFormData({
        title: "",
        content: "",
        author: "",
        tags: [],
      });
      setIsEditing(false);
    }
  }, [blog]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSave = async () => {
    if (
      !formData.title.trim() ||
      !formData.content.trim() ||
      !formData.author.trim()
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    setLoading(true);
    try {
      const url = isEditing ? `/api/blogs/${blog?.id}` : "/api/blogs";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          author: formData.author,
          tags: formData.tags,
        }),
      });

      if (response.ok) {
        const savedBlog = await response.json();
        toast.success(
          isEditing ? "Đã cập nhật bài viết" : "Đã tạo bài viết mới"
        );
        if (onSave) onSave(savedBlog);
        handleCancel();
      } else {
        const error = await response.json();
        toast.error(error.error || "Có lỗi xảy ra");
      }
    } catch (error) {
      toast.error("Lỗi khi lưu bài viết");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      content: "",
      author: "",
      tags: [],
    });
    setTagInput("");
    if (onCancel) onCancel();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <Card className="border-0 shadow-none">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-orange-500" />
                {isEditing ? "Chỉnh sửa bài viết" : "Viết bài mới"}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
                disabled={loading}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Tiêu đề *</label>
              <Input
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Nhập tiêu đề bài viết..."
                disabled={loading}
              />
            </div>

            {/* Author */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <User className="w-4 h-4" />
                Tác giả *
              </label>
              <Input
                value={formData.author}
                onChange={(e) => handleInputChange("author", e.target.value)}
                placeholder="Tên tác giả..."
                disabled={loading}
              />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Nội dung *</label>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <Textarea
                    value={formData.content}
                    onChange={(e) =>
                      handleInputChange("content", e.target.value)
                    }
                    placeholder="Viết nội dung bài viết của bạn..."
                    rows={12}
                    disabled={loading}
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {formData.content.length} ký tự
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 mb-2 block">
                    Preview
                  </label>
                  <div className="border border-gray-200 rounded-lg p-4 h-64 overflow-y-auto bg-gray-50">
                    {formData.content ? (
                      <div className="prose prose-sm max-w-none">
                        {markdownToText(formData.content)
                          .split("\n")
                          .map((paragraph, index) => {
                            if (paragraph.trim() === "") return null;
                            return (
                              <p
                                key={index}
                                className="mb-2 leading-relaxed text-gray-700 text-sm"
                              >
                                {paragraph}
                              </p>
                            );
                          })}
                      </div>
                    ) : (
                      <p className="text-gray-400 text-sm italic">
                        Nhập nội dung để xem preview...
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Tags
              </label>
              <div className="flex gap-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Nhập tag và nhấn Enter..."
                  disabled={loading}
                />
                <Button
                  type="button"
                  onClick={handleAddTag}
                  disabled={!tagInput.trim() || loading}
                  variant="outline"
                >
                  Thêm
                </Button>
              </div>

              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-orange-100 text-orange-800 hover:bg-orange-200 cursor-pointer"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={loading}
              >
                Hủy
              </Button>
              <Button
                onClick={handleSave}
                disabled={loading}
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Đang lưu...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {isEditing ? "Cập nhật" : "Tạo bài viết"}
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
