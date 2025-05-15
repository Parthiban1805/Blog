import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiEdit, FiCalendar, FiClock } from 'react-icons/fi'
import formatDate from '../../utils/formatDate'
import Button from '../ui/Button'

const BlogCard = ({ blog }) => {
  const { _id, title, content, status, tags, createdAt, updatedAt } = blog
  
  // Create a plain text excerpt from the HTML content
  const createExcerpt = (html) => {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = html
    const text = tempDiv.textContent || tempDiv.innerText || ''
    return text.slice(0, 120) + (text.length > 120 ? '...' : '')
  }
  
  const excerpt = createExcerpt(content)
  
  return (
    <motion.div 
      className="blog-card bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-3">
          <div>
            {status === 'published' ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-50 text-success-700">
                Published
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning-50 text-warning-700">
                Draft
              </span>
            )}
          </div>
          
          <div className="flex items-center text-xs text-gray-500">
            <FiClock className="mr-1" />
            <time dateTime={updatedAt}>{formatDate(updatedAt || createdAt)}</time>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {title || 'Untitled Post'}
        </h3>
        
        <p className="text-gray-600 mb-4 text-sm line-clamp-3">
          {excerpt || 'No content yet'}
        </p>
        
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span key={index} className="inline-block text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex justify-end">
          <Link to={`/editor/${_id}`}>
            <Button variant="ghost" size="sm">
              <FiEdit className="mr-1" />
              Edit
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default BlogCard