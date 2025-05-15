import { createContext, useState, useEffect, useCallback } from 'react'
import { toast } from 'react-toastify'
import { getAllBlogs, getBlogById, saveDraft, publishBlog } from '../services/blogService'

const BlogContext = createContext()

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchBlogs = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await getAllBlogs()
      setBlogs(data)
    } catch (err) {
      setError('Failed to fetch blogs. Please try again later.')
      toast.error('Failed to fetch blogs')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchBlogById = useCallback(async (id) => {
    try {
      setIsLoading(true)
      setError(null)
      return await getBlogById(id)
    } catch (err) {
      setError('Failed to fetch blog. Please try again later.')
      toast.error('Failed to fetch blog')
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  const saveBlogDraft = useCallback(async (blogData) => {
    try {
      setIsLoading(true)
      setError(null)
      const savedBlog = await saveDraft(blogData)
      
      setBlogs(prev => {
        const exists = prev.some(blog => blog._id === savedBlog._id)
        if (exists) {
          return prev.map(blog => 
            blog._id === savedBlog._id ? savedBlog : blog
          )
        } else {
          return [...prev, savedBlog]
        }
      })
      
      return savedBlog
    } catch (err) {
      setError('Failed to save draft. Please try again later.')
      toast.error('Failed to save draft')
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  const publishBlogPost = useCallback(async (blogData) => {
    try {
      setIsLoading(true)
      setError(null)
      const publishedBlog = await publishBlog(blogData)
      
      setBlogs(prev => {
        const exists = prev.some(blog => blog._id === publishedBlog._id)
        if (exists) {
          return prev.map(blog => 
            blog._id === publishedBlog._id ? publishedBlog : blog
          )
        } else {
          return [...prev, publishedBlog]
        }
      })
      
      toast.success('Blog published successfully!')
      return publishedBlog
    } catch (err) {
      setError('Failed to publish blog. Please try again later.')
      toast.error('Failed to publish blog')
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBlogs()
  }, [fetchBlogs])

  return (
    <BlogContext.Provider value={{
      blogs,
      isLoading,
      error,
      fetchBlogs,
      fetchBlogById,
      saveBlogDraft,
      publishBlogPost
    }}>
      {children}
    </BlogContext.Provider>
  )
}

export default BlogContext