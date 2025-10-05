"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menu,
  ChevronDown,
  Home,
  BookOpen,
  Users,
  HelpCircle,
  PenTool, // New import for Blog
} from "lucide-react";
import { FiCheck } from "react-icons/fi";
import { motion } from "framer-motion";
import logo from "../public/95d7e5b4a4722bf2f9e4c961ba74fd3f960fe8cb.png";
import Image from "next/image";

interface HeaderProps {
  activeViewpoint: number;
  onViewpointChange: (viewpoint: number) => void;
}

export function Header({ activeViewpoint, onViewpointChange }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="border-b border-orange-200/20 bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl sticky top-0 z-50 shadow-2xl"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-yellow-500/10 to-orange-500/5 animate-pulse"></div>

      <div className="relative container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo + Title */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative">
              <Image
                src={logo}
                alt="Logo"
                className="h-14 w-14 rounded-full border-2 border-gradient-to-r from-orange-400 to-yellow-400 object-contain shadow-lg group-hover:shadow-orange-400/25 transition-all duration-300"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400/20 to-yellow-400/20 blur-sm group-hover:blur-md transition-all duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent tracking-wide group-hover:from-orange-300 group-hover:via-yellow-300 group-hover:to-orange-300 transition-all duration-300">
                TRIẾT HỌC TRỪU TƯỢNG
              </span>
              <span className="text-xs text-orange-300/70 font-medium tracking-wider">
                PHILOSOPHICAL INSIGHTS
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {/* Trang chủ */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent hover:from-orange-300 hover:to-yellow-300 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-orange-500/10"
            >
              <Home className="w-4 h-4" />
              TRANG CHỦ
            </Link>
          </motion.div>

          {/* Trắc nghiệm */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/quiz"
              className="flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent hover:from-orange-300 hover:to-yellow-300 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-orange-500/10"
            >
              <HelpCircle className="w-4 h-4" />
              TRẮC NGHIỆM
            </Link>
          </motion.div>

          {/* Blog */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/blog"
              className="flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent hover:from-orange-300 hover:to-yellow-300 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-orange-500/10"
            >
              <PenTool className="w-4 h-4" />
              BLOG
            </Link>
          </motion.div>

          {/* Dropdown Quan điểm */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent hover:from-orange-300 hover:to-yellow-300 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-orange-500/10"
                >
                  <BookOpen className="w-4 h-4" />
                  QUAN ĐIỂM {activeViewpoint}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 border-orange-500/20 backdrop-blur-xl shadow-2xl"
            >
              <DropdownMenuItem
                onClick={() => {
                  onViewpointChange(1);
                  setTimeout(() => {
                    const element = document.getElementById("viewpoint");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }, 100);
                }}
                className="flex items-center gap-3 cursor-pointer hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-yellow-500/10 text-orange-300 hover:text-orange-200 transition-all duration-300 p-3"
              >
                <div className="p-1 rounded-full bg-gradient-to-r from-orange-400/20 to-yellow-400/20">
                  <Users className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Quan điểm 1</div>
                  <div className="text-xs text-orange-400/70">
                    Con người bị kết án phải tự do
                  </div>
                </div>
                {activeViewpoint === 1 && (
                  <div className="p-1 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400">
                    <FiCheck className="w-3 h-3 text-white" />
                  </div>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  onViewpointChange(2);
                  setTimeout(() => {
                    const element = document.getElementById("viewpoint");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }, 100);
                }}
                className="flex items-center gap-3 cursor-pointer hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-yellow-500/10 text-orange-300 hover:text-orange-200 transition-all duration-300 p-3"
              >
                <div className="p-1 rounded-full bg-gradient-to-r from-orange-400/20 to-yellow-400/20">
                  <Users className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Quan điểm 2</div>
                  <div className="text-xs text-orange-400/70">
                    Con người hiện sinh là con người tha nhân
                  </div>
                </div>
                {activeViewpoint === 2 && (
                  <div className="p-1 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400">
                    <FiCheck className="w-3 h-3 text-white" />
                  </div>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Mobile menu button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 transition-all duration-300"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </motion.header>
  );
}
