"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Parallax } from "@/components/ui/parallax";
import { Typewriter } from "@/components/ui/typewriter";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background */}
      <Parallax speed={0.3} className="absolute inset-0 z-0">
        <Image
          src="/ancient-open-book-on-dark-background.jpg"
          alt="Background"
          fill
          className="object-cover opacity-20"
          priority
        />
      </Parallax>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-5">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Typewriter
              text="Quan Điểm Về Triết Học Trừu Tượng"
              speed={80}
              delay={500}
            />
          </motion.h1>

          <motion.p
            className="text-xl text-muted-foreground max-w-xl mx-auto text-pretty"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <Typewriter
              text="Khoa học cho chúng ta tri thức, nhưng chỉ triết học mới có thể cho chúng ta sự thông thái."
              speed={50}
              delay={2000}
            />
          </motion.p>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 1 }}
          >
            <motion.div
              className="w-6 h-10 border-2 border-primary rounded-full flex justify-center"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1 h-3 bg-primary rounded-full mt-2"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
