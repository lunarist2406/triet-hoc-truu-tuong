"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { BlogList } from "@/components/blog-list";
import { BlogEditor } from "@/components/blog-editor";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen } from "lucide-react";

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

export default function BlogPage() {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCreateNew = () => {
    setEditingBlog(null);
    setIsEditorOpen(true);
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setIsEditorOpen(true);
  };

  const handleSave = (blog: Blog) => {
    // Trigger refresh để load lại danh sách blog
    setRefreshTrigger((prev) => prev + 1);
    setIsEditorOpen(false);
    setEditingBlog(null);
  };

  const handleCancel = () => {
    setIsEditorOpen(false);
    setEditingBlog(null);
  };

  const handleDelete = (blogId: string) => {
    // Trigger refresh để load lại danh sách blog
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundImage: [
              "url('/classical-philosophers-discussing-freedom.jpg')",
              "url('/classical-philosophers-plato-and-aristotle-paintin.jpg')",
              "url('/ancient-open-book-on-dark-background.jpg')",
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "blur(8px) brightness(0.3)",
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/30 via-slate-900/40 to-yellow-900/30" />
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => {
            // Fixed positions to avoid hydration mismatch
            const positions = [
              { left: 10, top: 20 },
              { left: 25, top: 15 },
              { left: 40, top: 30 },
              { left: 60, top: 10 },
              { left: 75, top: 25 },
              { left: 85, top: 40 },
              { left: 15, top: 60 },
              { left: 30, top: 75 },
              { left: 50, top: 80 },
              { left: 70, top: 65 },
              { left: 90, top: 70 },
              { left: 5, top: 45 },
              { left: 35, top: 50 },
              { left: 55, top: 35 },
              { left: 80, top: 55 },
              { left: 20, top: 85 },
              { left: 45, top: 5 },
              { left: 65, top: 90 },
              { left: 95, top: 15 },
              { left: 12, top: 35 },
            ];
            const pos = positions[i] || { left: 50, top: 50 };

            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-orange-400/20 rounded-full"
                animate={{
                  x: [0, 100, 0],
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 8 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
                style={{
                  left: `${pos.left}%`,
                  top: `${pos.top}%`,
                }}
              />
            );
          })}
        </div>
      </div>

      <Header activeViewpoint={1} onViewpointChange={() => {}} />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-4 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-4">
              Blog Triết Học
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Nơi chia sẻ những suy nghĩ sâu sắc về triết học, khám phá tư tưởng
              của các triết gia vĩ đại
            </p>
          </motion.div>

          {/* Blog List */}
          <BlogList
            onEdit={handleEdit}
            onDelete={handleDelete}
            onCreateNew={handleCreateNew}
            showActions={true}
            refreshTrigger={refreshTrigger}
          />
        </motion.div>
      </div>

      {/* Blog Editor Modal */}
      <BlogEditor
        blog={editingBlog}
        onSave={handleSave}
        onCancel={handleCancel}
        isOpen={isEditorOpen}
      />
    </div>
  );
}
