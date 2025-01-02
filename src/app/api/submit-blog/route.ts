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
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const filename = `${Date.now()}-${image.name.replace(/[^a-zA-Z0-9.-]/g, '')}`
      const uploadDir = path.join(process.cwd(), 'public', 'uploads')
      
      try {
        await mkdir(uploadDir, { recursive: true })
        await writeFile(path.join(uploadDir, filename), buffer)
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

    await addBlogPost(newPost)

    return NextResponse.json({ message: 'Blog post submitted successfully', post: newPost }, { status: 201 })
  } catch (error) {
    console.error('Error submitting blog post:', error)
    return NextResponse.json({ error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}

