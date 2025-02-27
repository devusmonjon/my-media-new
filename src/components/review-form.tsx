"use client"

import type React from "react"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

interface ReviewFormProps {
  onSubmit: (review: { author: string; email: string; content: string; rating: number }) => void
  isReply?: boolean
}

export default function ReviewForm({ onSubmit, isReply = false }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [content, setContent] = useState("")
  const [author, setAuthor] = useState("")
  const [email, setEmail] = useState("")
  const [saveInfo, setSaveInfo] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ author, email, content, rating })
    setContent("")
    if (!saveInfo) {
      setAuthor("")
      setEmail("")
    }
    if (!isReply) {
      setRating(0)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {!isReply && (
        <>
          <h2 className="text-xl font-semibold">Leave a Review</h2>
          <p className="text-sm text-gray-400">
            Your email address will not be published. Required fields are marked *
          </p>

          <div className="space-y-2">
            <div className="text-sm">Your rating *</div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" onClick={() => setRating(star)} className="transition-colors">
                  <Star className={`h-6 w-6 ${rating >= star ? "fill-yellow-500 text-yellow-500" : "text-gray-400"}`} />
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="space-y-2">
        <label className="text-sm">Your {isReply ? "reply" : "review"} *</label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="min-h-[100px] bg-[#0a0a1a]"
          placeholder={`Write your ${isReply ? "reply" : "review"} here...`}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm">Name *</label>
          <Input value={author} onChange={(e) => setAuthor(e.target.value)} required className="bg-[#0a0a1a]" />
        </div>
        <div className="space-y-2">
          <label className="text-sm">Email *</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-[#0a0a1a]"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox id="save-info" checked={saveInfo} onCheckedChange={(checked) => setSaveInfo(checked as boolean)} />
        <label htmlFor="save-info" className="text-sm text-gray-400">
          Save my name and email in this browser for the next time I comment.
        </label>
      </div>

      <Button type="submit" className="bg-purple-600">
        Submit {isReply ? "Reply" : "Review"}
      </Button>
    </form>
  )
}

