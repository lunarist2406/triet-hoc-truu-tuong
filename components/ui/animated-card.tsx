"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedCard({
  children,
  className = "",
  delay = 0,
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      whileHover={{
        y: -10,
        transition: { duration: 0.2 },
      }}
      className={`${className}`}
    >
      <motion.div
        className="h-full"
        whileHover={{
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          transition: { duration: 0.2 },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
