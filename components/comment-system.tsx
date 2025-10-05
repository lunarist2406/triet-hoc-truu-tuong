"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { MessageCircle, Reply } from "lucide-react"

interface Comment {
  id: string
  author: string
  content: string
  timestamp: Date
  replies: Comment[]
}

interface CommentItemProps {
  comment: Comment
  onReply: (commentId: string, author: string, content: string) => void
  depth?: number
}

function CommentItem({ comment, onReply, depth = 0 }: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [replyAuthor, setReplyAuthor] = useState("")
  const [replyContent, setReplyContent] = useState("")

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault()
    if (replyAuthor.trim() && replyContent.trim()) {
      onReply(comment.id, replyAuthor, replyContent)
      setReplyAuthor("")
      setReplyContent("")
      setShowReplyForm(false)
    }
  }

  return (
    <div className={`${depth > 0 ? "ml-8 mt-4" : "mt-6"}`}>
      <div className="bg-secondary/50 rounded-lg p-4 border border-border">
        <div className="flex items-start justify-between mb-2">
          <div>
            <span className="font-semibold text-foreground">{comment.author}</span>
            <span className="text-xs text-muted-foreground ml-2">
              {comment.timestamp.toLocaleDateString("vi-VN")} {comment.timestamp.toLocaleTimeString("vi-VN")}
            </span>
          </div>
        </div>
        <p className="text-foreground leading-relaxed mb-3">{comment.content}</p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowReplyForm(!showReplyForm)}
          className="text-primary hover:text-primary/80"
        >
          <Reply className="h-4 w-4 mr-1" />
          Trả lời
        </Button>

        {showReplyForm && (
          <form onSubmit={handleSubmitReply} className="mt-4 space-y-3">
            <Input
              placeholder="Tên của bạn"
              value={replyAuthor}
              onChange={(e) => setReplyAuthor(e.target.value)}
              className="bg-background"
              required
            />
            <Textarea
              placeholder="Viết câu trả lời..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="bg-background min-h-[80px]"
              required
            />
            <div className="flex gap-2">
              <Button type="submit" size="sm" className="bg-primary hover:bg-primary/90">
                Gửi trả lời
              </Button>
              <Button type="button" size="sm" variant="outline" onClick={() => setShowReplyForm(false)}>
                Hủy
              </Button>
            </div>
          </form>
        )}
      </div>

      {comment.replies.length > 0 && (
        <div className="space-y-2">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} onReply={onReply} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export function CommentSystem({ viewpointId }: { viewpointId: number }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [author, setAuthor] = useState("")
  const [content, setContent] = useState("")

  const addComment = (author: string, content: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      author,
      content,
      timestamp: new Date(),
      replies: [],
    }
    setComments([newComment, ...comments])
  }

  const addReply = (commentId: string, author: string, content: string) => {
    const addReplyToComment = (comments: Comment[]): Comment[] => {
      return comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              {
                id: Date.now().toString(),
                author,
                content,
                timestamp: new Date(),
                replies: [],
              },
            ],
          }
        }
        if (comment.replies.length > 0) {
          return {
            ...comment,
            replies: addReplyToComment(comment.replies),
          }
        }
        return comment
      })
    }

    setComments(addReplyToComment(comments))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (author.trim() && content.trim()) {
      addComment(author, content)
      setAuthor("")
      setContent("")
    }
  }

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center gap-2 mb-6">
          <MessageCircle className="h-6 w-6 text-primary" />
          <h3 className="text-2xl font-bold text-foreground">Bình luận</h3>
          <span className="text-sm text-muted-foreground">({comments.length})</span>
        </div>

        {/* Comment Form */}
        <form onSubmit={handleSubmit} className="mb-8 space-y-4 bg-secondary/30 p-6 rounded-lg border border-border">
          <Input
            placeholder="Tên của bạn"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="bg-background"
            required
          />
          <Textarea
            placeholder="Viết bình luận của bạn..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-background min-h-[120px]"
            required
          />
          <Button type="submit" className="bg-primary hover:bg-primary/90">
            Gửi bình luận
          </Button>
        </form>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
            </p>
          ) : (
            comments.map((comment) => <CommentItem key={comment.id} comment={comment} onReply={addReply} />)
          )}
        </div>
      </div>
    </section>
  )
}
