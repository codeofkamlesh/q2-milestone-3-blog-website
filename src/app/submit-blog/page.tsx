'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { User, Mail, FileText, Upload, X } from 'lucide-react'
import Image from 'next/image'

export default function SubmitBlogPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    email: '',
    content: '',
  })
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB')
        return
      }
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      setError(null)
    }
  }

  const removeImage = () => {
    setImage(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    const formDataToSend = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value)
    })
    if (image) {
      formDataToSend.append('image', image)
    }

    try {
      const response = await fetch('/api/submit-blog', {
        method: 'POST',
        body: formDataToSend,
      })

      const result = await response.json()

      if (response.ok) {
        console.log('Blog post submitted successfully:', result)
        alert('Blog post submitted successfully!')
        router.push('/blog')
      } else {
        console.error('Failed to submit blog post:', result)
        setError(`Failed to submit blog post. ${result.error || 'Please try again.'}`)
      }
    } catch (error) {
      console.error('Error submitting blog post:', error)
      setError(`An error occurred: ${error instanceof Error ? error.message : 'Please try again.'}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-heading">Submit Your Colorful AI Blog Post</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6 bg-black p-6 rounded-lg shadow-md">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-heading mb-1 text-white">
            Title
          </label>
          <div className="relative">
            <FileText className="absolute left-3  h-5 w-5 text-gray-400" />
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 bg-white text-text"
              placeholder="Enter your blog post title"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-heading mb-1 text-white">
              Author
            </label>
            <div className="relative">
              <User className="absolute left-3  h-5 w-5 text-gray-400" />
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 bg-white text-text"
                placeholder="Your name"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-heading mb-1 text-white">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 bg-white text-text"
                placeholder="your.email@example.com"
              />
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-heading mb-1 text-white">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={8}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 bg-white text-text"
            placeholder="Write your colorful AI blog post content here..."
          ></textarea>
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-heading mb-1 text-white">
            Image (Max 5MB)
          </label>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-white text-black rounded-md hover:bg-primary transition-colors duration-300 flex items-center"
            >
              <Upload className="w-5 h-5 mr-2" />
              {image ? 'Change Image' : 'Upload Image'}
            </button>
            <input
              type="file"
              id="image"
              name="image"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            {imagePreview && (
              <div className="relative">
                <Image
                  src={imagePreview}
                  alt="Image preview"
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-white text-black py-2 px-4 rounded-md hover:bg-primary transition-colors duration-300 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Colorful Blog Post'}
        </button>
      </form>
    </div>
  )
}

