#!/bin/bash

echo "🚀 Setup Groq API cho Deploy"
echo "================================"

# Tạo file .env.local nếu chưa có
if [ ! -f .env.local ]; then
    echo "📝 Tạo file .env.local..."
    echo "GROQ_API_KEY=gsk_your_groq_api_key_here" > .env.local
    echo "✅ Đã tạo file .env.local"
else
    echo "✅ File .env.local đã tồn tại"
fi

echo ""
echo "📋 Hướng dẫn tiếp theo:"
echo "1. Đăng ký Groq: https://console.groq.com/"
echo "2. Tạo API key"
echo "3. Cập nhật GROQ_API_KEY trong .env.local"
echo "4. Chạy: npm run dev"
echo ""
echo "📖 Xem chi tiết: GROQ_SETUP.md"
echo ""
echo "🎯 Groq Features:"
echo "- 14,400 requests/ngày miễn phí"
echo "- Llama 3 model siêu nhanh"
echo "- Không cần credit card"
echo ""
echo "✨ Ready to deploy!"
