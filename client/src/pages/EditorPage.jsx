import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import ReactQuill from 'react-quill'
import { toast } from 'react-toastify'
import { FiSave, FiSend, FiArrowLeft, FiClock } from 'react-icons/fi'
import BlogContext from '../context/BlogContext'
import useAutoSave from '../hooks/useAutoSave'
import Button from '../components/ui/Button'
import TagInput from '../components/blog/TagInput'

const EditorPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { fetchBlogById, saveBlogDraft, publishBlogPost, isLoading } = useContext(BlogContext)
  
  const [blog, setBlog] = useState({
    title: '',
    content: '',
    tags: [],
    status: 'draft'
  })
  
  const [lastSaved, setLastSaved] = useState(null)

  // Fetch blog data if editing an existing blog
  useEffect(() => {
    const loadBlog = async () => {
      if (id) {
        const blogData = await fetchBlogById(id)
        if (blogData) {
          setBlog(blogData)
        }
      }
    }
    
    loadBlog()
  }, [id, fetchBlogById])

  // Handle input changes
  const handleChange = (field, value) => {
    setBlog(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Handle saving draft
  const handleSaveDraft = async () => {
    if (!blog.title && !blog.content) {
      toast.warning('Please add some content before saving')
      return
    }
    
    const savedBlog = await saveBlogDraft(blog)
    if (savedBlog) {
      setLastSaved(new Date())
      toast.success('Draft saved successfully')
      
      // If it's a new blog, redirect to edit mode with ID
      if (!id && savedBlog._id) {
        navigate(`/editor/${savedBlog._id}`, { replace: true })
      }
    }
  }

  // Handle publishing
  const handlePublish = async () => {
    if (!blog.title) {
      toast.warning('Please add a title before publishing')
      return
    }
    
    if (!blog.content || blog.content === '<p><br></p>') {
      toast.warning('Please add some content before publishing')
      return
    }
    
    const publishedBlog = await publishBlogPost({
      ...blog,
      status: 'published'
    })
    
    if (publishedBlog) {
      navigate('/')
    }
  }

  // Auto-save functionality
  useAutoSave(blog, saveBlogDraft)

  // Quill editor modules
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      ['clean']
    ],
  }

  return (
    <motion.div 
      className="container mx-auto px-4 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-4 sm:mb-0 self-start"
        >
          <FiArrowLeft className="mr-2" />
          Back to Dashboard
        </Button>
        
        {lastSaved && (
          <div className="flex items-center text-gray-500">
            <FiClock className="mr-2" />
            <span className="text-sm">
              Last saved: {lastSaved.toLocaleTimeString()}
            </span>
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <input
          type="text"
          placeholder="Enter blog title..."
          value={blog.title}
          onChange={(e) => handleChange('title', e.target.value)}
          className="w-full text-3xl font-bold border-none outline-none mb-6 placeholder-gray-300"
        />
        
        <ReactQuill
          theme="snow"
          value={blog.content}
          onChange={(content) => handleChange('content', content)}
          placeholder="Start writing your blog post..."
          modules={modules}
          className="mb-6 h-96"
        />
        
        <div className="mt-16 mb-6">
          <TagInput
            tags={blog.tags}
            onChange={(tags) => handleChange('tags', tags)}
          />
        </div>
      </div>
      
      <motion.div 
        className="flex justify-end space-x-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Button
          variant="secondary"
          onClick={handleSaveDraft}
          disabled={isLoading}
        >
          <FiSave className="mr-2" />
          Save as Draft
        </Button>
        
        <Button
          variant="primary"
          onClick={handlePublish}
          disabled={isLoading}
        >
          <FiSend className="mr-2" />
          Publish
        </Button>
      </motion.div>
    </motion.div>
  )
}

export default EditorPage