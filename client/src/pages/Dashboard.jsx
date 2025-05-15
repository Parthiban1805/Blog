import { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiEdit, FiEye, FiFilter } from 'react-icons/fi'
import BlogContext from '../context/BlogContext'
import BlogCard from '../components/blog/BlogCard'
import EmptyState from '../components/ui/EmptyState'
import Button from '../components/ui/Button'

const Dashboard = () => {
  const { blogs, isLoading, error, fetchBlogs } = useContext(BlogContext)
  const [filter, setFilter] = useState('all')
  
  useEffect(() => {
    fetchBlogs()
  }, [fetchBlogs])
  
  const filteredBlogs = blogs.filter(blog => {
    if (filter === 'all') return true
    if (filter === 'published') return blog.status === 'published'
    if (filter === 'drafts') return blog.status === 'draft'
    return true
  })
  
  const publishedBlogs = blogs.filter(blog => blog.status === 'published')
  const draftBlogs = blogs.filter(blog => blog.status === 'draft')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-error-50 border border-error-500 text-error-700 px-4 py-3 rounded-lg">
          <p>{error}</p>
          <button 
            onClick={fetchBlogs}
            className="mt-2 text-white bg-error-500 hover:bg-error-700 px-4 py-2 rounded-md"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <motion.div 
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">My Blog Posts</h1>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <div className="flex items-center p-2 border rounded-lg shadow-sm bg-white">
              <FiFilter className="mr-2 text-gray-500" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="appearance-none bg-transparent border-none focus:outline-none text-sm font-medium text-gray-700 pr-8"
              >
                <option value="all">All Posts ({blogs.length})</option>
                <option value="published">Published ({publishedBlogs.length})</option>
                <option value="drafts">Drafts ({draftBlogs.length})</option>
              </select>
            </div>
          </div>
          
          <Link to="/editor">
            <Button variant="primary" className="w-full sm:w-auto">
              <FiEdit className="mr-2" />
              Create New Post
            </Button>
          </Link>
        </div>
      </div>
      
      {filteredBlogs.length === 0 ? (
        <EmptyState 
          icon={<FiEye size={48} />}
          title="No blog posts found"
          description={`You don't have any ${filter !== 'all' ? filter : ''} blog posts yet.`}
          action={
            <Link to="/editor">
              <Button variant="primary">Create Your First Post</Button>
            </Link>
          }
        />
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredBlogs.map(blog => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}

export default Dashboard