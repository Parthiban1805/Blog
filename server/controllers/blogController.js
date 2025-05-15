import Blog from '../models/Blog.js'

// Get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ updatedAt: -1 })
    res.status(200).json(blogs)
  } catch (error) {
    console.error('Error fetching blogs:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Get blog by ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' })
    }
    
    res.status(200).json(blog)
  } catch (error) {
    console.error(`Error fetching blog with ID ${req.params.id}:`, error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Save or update draft
export const saveDraft = async (req, res) => {
  try {
    const { _id, title, content, tags } = req.body
    
    let blog
    
    if (_id) {
      // Update existing blog
      blog = await Blog.findByIdAndUpdate(
        _id,
        {
          title,
          content,
          tags,
          status: 'draft',
          updatedAt: new Date()
        },
        { new: true }
      )
      
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' })
      }
    } else {
      // Create new blog
      blog = new Blog({
        title,
        content,
        tags,
        status: 'draft'
      })
      
      await blog.save()
    }
    
    res.status(200).json(blog)
  } catch (error) {
    console.error('Error saving draft:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Publish blog
export const publishBlog = async (req, res) => {
  try {
    const { _id, title, content, tags } = req.body
    
    let blog
    
    if (_id) {
      // Update existing blog
      blog = await Blog.findByIdAndUpdate(
        _id,
        {
          title,
          content,
          tags,
          status: 'published',
          updatedAt: new Date()
        },
        { new: true }
      )
      
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' })
      }
    } else {
      // Create new blog and publish
      blog = new Blog({
        title,
        content,
        tags,
        status: 'published'
      })
      
      await blog.save()
    }
    
    res.status(200).json(blog)
  } catch (error) {
    console.error('Error publishing blog:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}