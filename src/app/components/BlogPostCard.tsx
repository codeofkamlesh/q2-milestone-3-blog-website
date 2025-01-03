'use client'

import Link from 'next/link'
import Image from 'next/image'
import { BlogPost } from '../../../lib/types'
import { Calendar, MessageCircle, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function BlogPostCard({ post }: { post: BlogPost }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      setIsDeleting(true)
      try {
        const response = await fetch(`/api/delete-blog/${post.id}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          router.refresh()
        } else {
          console.error('Failed to delete blog post')
        }
      } catch (error) {
        console.error('Error deleting blog post:', error)
      }
      setIsDeleting(false)
    }
  }

  return (
    <article className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <Image
        src={post.image || "/placeholder.svg?height=200&width=400"}
        alt={post.title}
        width={400}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">
          <Link href={`/blog/${post.id}`} className="text-heading hover:text-primary transition-colors">
            {post.title}
          </Link>
        </h2>
        <div className="flex items-center justify-between text-gray-600 mb-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center">
            <MessageCircle className="w-4 h-4 mr-2" />
            <span>{post.comments.length} comments</span>
          </div>
        </div>
        <p className="text-text mb-4">{post.excerpt}</p>
        <div className="flex justify-between items-center">
          <Link href={`/blog/${post.id}`} className="inline-block bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-primary transition-colors">
            Read more
          </Link>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </article>
  )
}

