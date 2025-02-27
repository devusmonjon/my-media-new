export interface Reply {
    id: string
    author: string
    content: string
    date: Date
    likes: number
    isLiked?: boolean
  }
  
  export interface Review {
    id: string
    author: string
    content: string
    rating: number
    date: Date
    likes: number
    isLiked?: boolean
    replies: Reply[]
  }
  
  