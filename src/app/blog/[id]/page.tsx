// File: src/app/blog/[id]/page.tsx
import { getBlogPost, getBlogPosts } from '../../../../lib/BlogPosts'
// import { BlogPost as BlogPostType } from '../../../../lib/types'
import Image from 'next/image'
import CommentSection from '../../components/CommentSection'
import { Calendar, User } from 'lucide-react'

// Fixing the PageProps typing by making 'params' a Promise of SegmentParams
export interface PageProps {
  params: Promise<{ id: string }>;
  // searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateStaticParams() {
  const posts = await getBlogPosts()  // Fetching all blog posts
  return posts.map((post) => ({
    id: post.id,  // Dynamically generating static params based on blog posts
  }))
}

export default async function BlogPostPage({ params,  }: PageProps) {
  const post = await getBlogPost((await params).id)  // Fetching the specific blog post based on the id

  if (!post) {
    return <div className="text-center text-2xl mt-12 text-text">Post not found</div>
  }

  return (
    <article className="max-w-4xl mx-auto">
      <Image 
        src={post.image || "/placeholder.svg?height=400&width=800"} 
        alt={post.title} 
        width={800} 
        height={400} 
        className="w-full h-64 object-cover rounded-lg shadow-lg mb-8" 
      />
      <h1 className="text-4xl font-bold mb-4 text-heading">{post.title}</h1>
      <div className="flex items-center text-gray-600 mb-8">
        <User className="w-5 h-5 mr-2" />
        <span className="mr-4">By {post.author}</span>
        <Calendar className="w-5 h-5 mr-2" />
        <span>{post.date}</span>
      </div>
      <div className="prose max-w-none mb-12" dangerouslySetInnerHTML={{ __html: post.content }}></div>
      <CommentSection postId={post.id} initialComments={post.comments} />
    </article>
  )
}
