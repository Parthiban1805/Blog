import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiPlus } from 'react-icons/fi'

const TagInput = ({ tags = [], onChange }) => {
  const [input, setInput] = useState('')
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag()
    }
  }
  
  const addTag = () => {
    const trimmedInput = input.trim()
    
    if (trimmedInput && !tags.includes(trimmedInput)) {
      const newTags = [...tags, trimmedInput]
      onChange(newTags)
      setInput('')
    }
  }
  
  const removeTag = (tagToRemove) => {
    const newTags = tags.filter(tag => tag !== tagToRemove)
    onChange(newTags)
  }
  
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Tags
      </label>
      
      <div className="flex flex-wrap gap-2 mb-2">
        <AnimatePresence>
          {tags.map(tag => (
            <motion.div
              key={tag}
              className="flex items-center bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-1.5 text-primary-500 hover:text-primary-700 focus:outline-none"
              >
                <FiX size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <div className="flex items-center mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add tags (comma or enter to add)"
          className="flex-grow border border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 rounded-md py-2 px-3 text-sm"
        />
        <button
          type="button"
          onClick={addTag}
          className="ml-2 inline-flex items-center p-2 border border-transparent rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <FiPlus size={18} />
        </button>
      </div>
      
      <p className="mt-1 text-xs text-gray-500">
        Separate tags with commas or press Enter
      </p>
    </div>
  )
}

export default TagInput