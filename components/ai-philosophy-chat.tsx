"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Loader2,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { toast } from "react-hot-toast";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export function AIPhilosophyChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Xin chào! Tôi là AI trợ lý triết học. Tôi có thể giúp bạn hiểu về các quan điểm triết học, giải thích khái niệm, hoặc trả lời câu hỏi về triết học. Bạn muốn hỏi gì?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Call real AI API
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input.trim() }),
      });

      if (!response.ok) {
        throw new Error("API call failed");
      }

      const data = await response.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Có lỗi xảy ra khi gửi tin nhắn");

      // Fallback to simulated response
      const fallbackResponse = await simulateAIResponse(input.trim());
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: fallbackResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }
  };

  const simulateAIResponse = async (userInput: string): Promise<string> => {
    // Simulate AI thinking time
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const lowerInput = userInput.toLowerCase();

    if (lowerInput.includes("tự do") || lowerInput.includes("sartre")) {
      return "Theo Jean-Paul Sartre, 'con người bị kết án phải tự do' có nghĩa là con người luôn phải đối mặt với sự tự do và trách nhiệm. Chúng ta không thể trốn tránh việc lựa chọn, và mỗi lựa chọn đều định hình bản thân chúng ta. Đây là một khái niệm cốt lõi trong triết học hiện sinh.";
    }

    if (lowerInput.includes("tha nhân") || lowerInput.includes("tha hóa")) {
      return "Tha nhân là người khác, và theo Sartre, con người hiện sinh là con người tha nhân vì chúng ta nhận thức bản thân thông qua mối quan hệ với người khác. Tuy nhiên, điều này có thể dẫn đến tha hóa - khi con người đánh mất bản chất vốn có và trở thành công cụ.";
    }

    if (
      lowerInput.includes("hiện sinh") ||
      lowerInput.includes("existentialism")
    ) {
      return "Chủ nghĩa hiện sinh là một trường phái triết học nhấn mạnh sự tồn tại của con người, tự do, và trách nhiệm cá nhân. Các triết gia hiện sinh như Sartre, Camus cho rằng con người tạo ra ý nghĩa cuộc sống thông qua hành động và lựa chọn của mình.";
    }

    if (lowerInput.includes("triết học") && lowerInput.includes("là gì")) {
      return "Triết học là môn học nghiên cứu về những câu hỏi cơ bản nhất của con người: Tồn tại là gì? Chân lý là gì? Đạo đức là gì? Triết học giúp chúng ta suy nghĩ sâu sắc về cuộc sống, xã hội, và vũ trụ.";
    }

    // Default response
    return "Đây là một câu hỏi thú vị về triết học! Tôi có thể giúp bạn hiểu sâu hơn về chủ đề này. Bạn có thể hỏi cụ thể hơn về các khái niệm triết học, hoặc tôi có thể giải thích về các quan điểm của Sartre mà trang web này đang trình bày.";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                onClick={() => setIsOpen(true)}
                className="h-14 w-14 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <MessageCircle className="h-6 w-6 text-white" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 w-96 h-[500px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] sm:w-96 sm:h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-5 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-full">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">AI Triết Học</h3>
                    <p className="text-xs opacity-90">Trợ lý triết học</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="p-2 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full">
                      <Bot className="h-4 w-4 text-orange-600" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] p-4 rounded-2xl ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p className="text-base leading-relaxed">
                      {message.content}
                    </p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  {message.role === "user" && (
                    <div className="p-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 justify-start"
                >
                  <div className="p-2 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full">
                    <Bot className="h-4 w-4 text-orange-600" />
                  </div>
                  <div className="bg-gray-100 p-3 rounded-2xl">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-orange-500" />
                      <span className="text-sm text-gray-600">
                        AI đang suy nghĩ...
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 border-t border-gray-200">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Hỏi về triết học..."
                  className="flex-1 text-base py-3"
                  disabled={isLoading}
                />
                <Button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  size="icon"
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 h-12 w-12"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                💡 Hỏi về tự do, tha nhân, hiện sinh...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
