"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-card border border-border rounded-lg p-8">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">THAM LUẬN</h2>

          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Họ Tên
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Nhập họ tên của bạn"
                className="bg-background border-border text-foreground"
              />
            </div>

            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-foreground mb-2">
                Email hoặc SĐT
              </label>
              <Input
                id="contact"
                type="text"
                placeholder="Nhập email hoặc số điện thoại"
                className="bg-background border-border text-foreground"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Nội dung
              </label>
              <Textarea
                id="message"
                placeholder="Chia sẻ suy nghĩ của bạn về triết học..."
                rows={5}
                className="bg-background border-border text-foreground resize-none"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-6"
            >
              THAM LUẬN
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
