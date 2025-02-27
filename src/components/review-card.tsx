"use client"

import { useState } from "react"
import { Star, ThumbsUp, Reply } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion"
import ReviewForm from "./review-form"
import type { Review } from "@/types/review"

interface ReviewCardProps {
  review: Review
  onLike: (reviewId: string) => void
  onReply: (reviewId: string, reply: { author: string; email: string; content: string; rating: number }) => void
  onLikeReply: (reviewId: string, replyId: string) => void
}

export default function ReviewCard({ review, onLike, onReply, onLikeReply }: ReviewCardProps) {
  const [isReplyFormVisible, setIsReplyFormVisible] = useState(false)

  const handleReplySubmit = (replyData: { author: string; email: string; content: string; rating: number }) => {
    onReply(review.id, replyData)
    setIsReplyFormVisible(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Avatar className="h-10 w-10">
          <AvatarFallback>{review.author[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">{review.author}</div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        review.rating >= star ? "fill-yellow-500 text-yellow-500" : "text-gray-400"
                      }`}
                    />
                  ))}
                </div>
                <span>•</span>
                <span>{new Date(review.date).toLocaleDateString()}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className={`gap-2 ${review.isLiked ? "text-purple-400" : ""}`}
              onClick={() => onLike(review.id)}
            >
              <ThumbsUp className={`h-4 w-4 ${review.isLiked ? "fill-purple-400" : ""}`} />
              {review.likes}
            </Button>
          </div>
          <p className="text-gray-300">{review.content}</p>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            onClick={() => setIsReplyFormVisible(!isReplyFormVisible)}
          >
            <Reply className="h-4 w-4" />
            Reply
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isReplyFormVisible && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="ml-14 overflow-hidden"
          >
            <div className="rounded-lg bg-[#1a1a2f] p-4">
              <ReviewForm onSubmit={handleReplySubmit} isReply />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Replies */}
      <div className="ml-14 space-y-4">
        {review.replies.map((reply) => (
          <div key={reply.id} className="flex gap-4">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{reply.author[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{reply.author}</div>
                  <div className="text-sm text-gray-400">{new Date(reply.date).toLocaleDateString()}</div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`gap-2 ${reply.isLiked ? "text-purple-400" : ""}`}
                  onClick={() => onLikeReply(review.id, reply.id)}
                >
                  <ThumbsUp className={`h-4 w-4 ${reply.isLiked ? "fill-purple-400" : ""}`} />
                  {reply.likes}
                </Button>
              </div>
              <p className="text-gray-300">{reply.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

