import axios from 'axios'

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api'
})

// Get all blogs
export const getAllBlogs = async () => {
  try {
    const response = await api.get('/blogs')
    return response.data
  } catch (error) {
    console.error('Error fetching blogs:', error)
    throw error
  }
}

// Get blog by ID
export const getBlogById = async (id) => {
  try {
    const response = await api.get(`/blogs/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching blog with ID ${id}:`, error)
    throw error
  }
}

// Save or update draft
export const saveDraft = async (blogData) => {
  try {
    const response = await api.post('/blogs/save-draft', blogData)
    return response.data
  } catch (error) {
    console.error('Error saving draft:', error)
    throw error
  }
}

// Publish blog
export const publishBlog = async (blogData) => {
  try {
    const response = await api.post('/blogs/publish', blogData)
    return response.data
  } catch (error) {
    console.error('Error publishing blog:', error)
    throw error
  }
}