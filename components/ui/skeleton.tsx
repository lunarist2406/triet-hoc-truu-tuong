"use client";

import { motion } from "framer-motion";

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
}

export function Skeleton({
  className = "",
  width = "100%",
  height = "1rem",
}: SkeletonProps) {
  return (
    <motion.div
      className={`bg-muted rounded ${className}`}
      style={{ width, height }}
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export function CommentSkeleton() {
  return (
    <div className="bg-secondary/50 rounded-lg p-4 border border-border space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton width="60px" height="20px" />
        <Skeleton width="100px" height="16px" />
      </div>
      <div className="space-y-2">
        <Skeleton height="16px" />
        <Skeleton height="16px" />
        <Skeleton width="80%" height="16px" />
      </div>
    </div>
  );
}
