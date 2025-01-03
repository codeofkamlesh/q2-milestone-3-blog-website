import { NextResponse } from 'next/server'
import { BlogPost } from '../../../../lib/types'
import { addBlogPost } from '../../../../lib/BlogPosts'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const title = formData.get('title') as string
    const author = formData.get('author') as string
    const email = formData.get('email') as string
    const content = formData.get('content') as string
    const image = formData.get('image') as File | null

    if (!title || !author || !email || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    let imagePath = '/placeholder.svg?height=400&width=800&text=Colorful+AI+Blog+Post'

    if (image) {
      // Check for file size limit before proceeding
      if (image.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: 'Image size should be less than 5MB' }, { status: 400 })
      }

      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)  // Ensuring compatibility with Node.js Buffer

      const filename = `${Date.now()}-${image.name.replace(/[^a-zA-Z0-9.-]/g, '')}`
      const uploadDir = path.join(process.cwd(), 'public', 'uploads')

      try {
        // Ensure the upload directory exists
        await mkdir(uploadDir, { recursive: true })
        // Convert Buffer to Uint8Array
        const uint8Array = new Uint8Array(buffer)  // Convert Buffer to Uint8Array
        await writeFile(path.join(uploadDir, filename), uint8Array)  // Pass Uint8Array to writeFile
        imagePath = `/uploads/${filename}`
      } catch (error) {
        console.error('Error saving image:', error)
        return NextResponse.json({ error: 'Failed to save image', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
      }
    }

    const newPost: BlogPost = {
      id: Date.now().toString(),
      title,
      author,
      date: new Date().toISOString().split('T')[0],
      excerpt: content.substring(0, 150) + '...',
      content,
      image: imagePath,
      comments: []
    }

    // Add the new blog post (ensure addBlogPost handles saving it correctly)
    await addBlogPost(newPost)

    return NextResponse.json({ message: 'Blog post submitted successfully', post: newPost }, { status: 201 })
  } catch (error) {
    console.error('Error submitting blog post:', error)
    return NextResponse.json({ error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}
