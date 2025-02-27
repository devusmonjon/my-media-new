"use client"

import { useState } from "react"
import ReviewForm from "./review-form"
import ReviewCard from "./review-card"
import type { Review } from "@/types/review"
import { useToast } from "@/hooks/use-toast"

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([])
  const { toast } = useToast()

  const handleReviewSubmit = (reviewData: { author: string; email: string; content: string; rating: number }) => {
    const newReview: Review = {
      id: Date.now().toString(),
      ...reviewData,
      date: new Date(),
      likes: 0,
      replies: [],
    }
    setReviews((prev) => [newReview, ...prev])
    toast({
      title: "Review Submitted",
      description: "Thank you for your review!",
    })
  }

  const handleReply = (
    reviewId: string,
    replyData: { author: string; email: string; content: string; rating: number },
  ) => {
    setReviews((prev) =>
      prev.map((review) => {
        if (review.id === reviewId) {
          return {
            ...review,
            replies: [
              ...review.replies,
              {
                id: Date.now().toString(),
                author: replyData.author,
                content: replyData.content,
                date: new Date(),
                likes: 0,
              },
            ],
          }
        }
        return review
      }),
    )
    toast({
      title: "Reply Submitted",
      description: "Your reply has been added!",
    })
  }

  const handleLikeReview = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((review) => {
        if (review.id === reviewId) {
          const isLiked = !review.isLiked
          return {
            ...review,
            likes: isLiked ? review.likes + 1 : review.likes - 1,
            isLiked,
          }
        }
        return review
      }),
    )
  }

  const handleLikeReply = (reviewId: string, replyId: string) => {
    setReviews((prev) =>
      prev.map((review) => {
        if (review.id === reviewId) {
          return {
            ...review,
            replies: review.replies.map((reply) => {
              if (reply.id === replyId) {
                const isLiked = !reply.isLiked
                return {
                  ...reply,
                  likes: isLiked ? reply.likes + 1 : reply.likes - 1,
                  isLiked,
                }
              }
              return reply
            }),
          }
        }
        return review
      }),
    )
  }

  return (
    <div className="space-y-8">
      <div className="rounded-lg bg-[#1a1a2f] p-6">
        <ReviewForm onSubmit={handleReviewSubmit} />
      </div>

      {reviews.length > 0 ? (
        <div className="space-y-8">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onLike={handleLikeReview}
              onReply={handleReply}
              onLikeReply={handleLikeReply}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400">No reviews yet. Be the first to review!</div>
      )}
    </div>
  )
}

