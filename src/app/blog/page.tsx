import { use } from 'react'
import BlogPostCard from '../components/BlogPostCard'
import { getBlogPosts } from '../../../lib/BlogPosts'

export default function BlogListingPage() {
  const blogPosts = use(getBlogPosts())

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-heading"> AI Blog</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

