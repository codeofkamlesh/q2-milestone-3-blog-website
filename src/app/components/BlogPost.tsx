import Link from 'next/link'
import { BlogPost } from '../../../lib/types'

export default function BlogPosts({ post }: { post: BlogPost }) {
  return (
    <article className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">
          <Link href={`/blog/${post.id}`} className="text-blue-600 hover:underline">
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-600 mb-4">{post.date}</p>
        <p className="text-gray-800">{post.excerpt}</p>
        <Link href={`/blog/${post.id}`} className="inline-block mt-4 text-blue-600 hover:underline">
          Read more
        </Link>
      </div>
    </article>
  )
}

