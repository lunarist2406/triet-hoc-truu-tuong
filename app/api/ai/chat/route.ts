import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs"; // tránh Edge runtime
export const dynamic = "force-dynamic"; // POST không cache nhưng cho chắc

export async function POST(request: NextRequest) {
  try {
    // 1) Đọc & validate body
    let body: any;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Body phải là JSON" }, { status: 400 });
    }

    // Hỗ trợ cả hai kiểu: {message} hoặc {messages:[...]}
    const message: string | undefined =
      typeof body?.message === "string"
        ? body.message
        : Array.isArray(body?.messages)
        ? body.messages?.[body.messages.length - 1]?.content
        : undefined;

    if (!message || !message.trim()) {
      return NextResponse.json({ error: "Thiếu 'message'" }, { status: 400 });
    }

    // 2) Lấy key từ ENV (không dùng fallback hard-code)
    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
      return NextResponse.json(
        { error: "Thiếu GROQ_API_KEY trên server" },
        { status: 500 }
      );
    }

    // 3) Gọi Groq (OpenAI-compatible)
    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${groqApiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content:
              "Bạn là chuyên gia triết học. Trả lời chính xác, dễ hiểu, bằng tiếng Việt.",
          },
          { role: "user", content: message },
        ],
        temperature: 0.7,
        max_tokens: 500,
        stream: false,
      }),
    });

    if (!r.ok) {
      const t = await r.text();
      return NextResponse.json(
        { error: `Groq API: ${r.status} - ${t}` },
        { status: r.status }
      );
    }

    const data = await r.json();
    const text = data?.choices?.[0]?.message?.content ?? "";
    return NextResponse.json({ message: text });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Lỗi máy chủ" },
      { status: 500 }
    );
  }
}
