'use client'

import { useState } from 'react'
import { Comment } from '../../../lib/types'
import { User, Edit2, Check } from 'lucide-react'

export default function CommentSection({ postId, initialComments }: { postId: string, initialComments: Comment[] }) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState('')
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null)
  const [editedContent, setEditedContent] = useState('')
  console.log("Post Id" , postId)
  const addComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        content: newComment,
        author: 'Anonymous',
        date: new Date().toISOString(),
      }
      setComments([...comments, comment])
      setNewComment('')
      // Here you would typically send a request to your backend to save the comment
    }
  }

  const startEditing = (comment: Comment) => {
    setEditingCommentId(comment.id)
    setEditedContent(comment.content)
  }

  const saveEdit = (commentId: string) => {
    setComments(comments.map(comment => 
      comment.id === commentId ? { ...comment, content: editedContent } : comment
    ))
    setEditingCommentId(null)
    // Here you would typically send a request to your backend to update the comment
  }

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-6">Comments</h3>
      <div className="space-y-6 mb-8">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            {editingCommentId === comment.id ? (
              <div className="space-y-4">
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  rows={3}
                />
                <button
                  onClick={() => saveEdit(comment.id)}
                  className="text-indigo-600 hover:text-indigo-800 transition-colors flex items-center"
                >
                  <Check className="w-4 h-4 mr-1" />
                  Save
                </button>
              </div>
            ) : (
              <>
                <p className="text-gray-800 dark:text-gray-200 mb-4">{comment.content}</p>
                <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    <span>{comment.author}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date(comment.date).toLocaleDateString()}</span>
                  </div>
                  <button
                    onClick={() => startEditing(comment)}
                    className="text-indigo-600 hover:text-indigo-800 transition-colors flex items-center"
                  >
                    <Edit2 className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          rows={4}
          placeholder="Add a comment..."
        ></textarea>
        <button
          onClick={addComment}
          className="mt-4 bg-black text-white px-6 py-2 rounded-lg transition-colors"
        >
          Add Comment
        </button>
      </div>
    </div>
  )
}

  