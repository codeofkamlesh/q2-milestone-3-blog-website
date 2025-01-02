import Link from 'next/link'
import { getBlogPosts } from '../../lib/BlogPosts'
import BlogPostCard from './components/BlogPostCard'
import { use } from 'react'

export default function Home() {
  const blogPosts = use(getBlogPosts())

  return (
    <div className="space-y-12">
      <section className="bg-black from-primary to-secondary text-white py-20 rounded-lg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to AI Insights</h1>
            <p className="text-xl md:text-2xl mb-8">Exploring the vibrant world of Artificial Intelligence</p>
            <Link 
              href="/blog" 
              className="bg-slate-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-colors duration-300"
            >
              Explore Our Blog
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-heading">Latest AI Insights</h2>
          <Link href="/blog" className="text-primary hover:text-secondary transition-colors">
            View all posts
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  )
}

