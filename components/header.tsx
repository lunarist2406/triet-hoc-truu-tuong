"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, ChevronDown, Home } from "lucide-react";
import { FiCheck, FiGlobe, FiUser } from "react-icons/fi";
import logo from "../public/95d7e5b4a4722bf2f9e4c961ba74fd3f960fe8cb.png";
import Image from "next/image";

interface HeaderProps {
  activeViewpoint: number;
  onViewpointChange: (viewpoint: number) => void;
}

export function Header({ activeViewpoint, onViewpointChange }: HeaderProps) {
  return (
    <header className="border-b border-gray-800 bg-black/95 backdrop-blur-md sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo + Title */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={logo}
            alt="Logo"
            className="h-12 w-12 rounded-full border-2 border-yellow-400 object-contain"
          />
          <span className="text-lg font-bold text-yellow-400 tracking-wide">
            TRIẾT HỌC TRỪU TƯỢNG
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {/* Trang chủ */}
          <Link
            href="/"
            className="flex items-center gap-1 text-sm font-medium text-yellow-400 hover:text-yellow-700 transition-colors"
          >
            TRANG CHỦ
          </Link>

          {/* Dropdown Quan điểm */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-1 text-sm font-medium text-yellow-400 hover:text-yellow-700"
              >
                QUAN ĐIỂM {activeViewpoint}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-black border-gray-800"
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
                className="flex items-center gap-2 cursor-pointer hover:bg-yellow-900/10 text-yellow-400 hover:text-yellow-700"
              >
                <FiUser className="w-4 h-4" />
                {activeViewpoint === 1 && <FiCheck className="w-4 h-4" />}
                <span>Quan điểm 1: Con người bị kết án phải tự do</span>
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
                className="flex items-center gap-2 cursor-pointer hover:bg-yellow-900/10 text-yellow-400 hover:text-yellow-700"
              >
                <FiUser className="w-4 h-4" />
                {activeViewpoint === 2 && <FiCheck className="w-4 h-4" />}
                <span>
                  Quan điểm 2: Con người hiện sinh là con người tha nhân
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Dropdown Ngôn ngữ */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-1 text-sm font-medium text-yellow-400 hover:text-yellow-700"
              >
                NGÔN NGỮ
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-black border-gray-800"
            >
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-yellow-900/10 text-yellow-400 hover:text-yellow-700">
                <FiGlobe className="w-4 h-4" /> Tiếng Việt
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-yellow-900/10 text-yellow-400 hover:text-yellow-700">
                <FiGlobe className="w-4 h-4" /> English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-yellow-400 hover:text-yellow-700"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
