export interface BlogPost {
    id: string
    title: string
    author: string
    date: string
    excerpt: string
    content: string
    image?: string
    comments: Comment[]
  }
  
  export interface Comment {
    id: string
    content: string
    author: string
    date: string
  }
  
  