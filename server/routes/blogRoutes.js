import express from 'express'
import {
  getAllBlogs,
  getBlogById,
  saveDraft,
  publishBlog
} from '../controllers/blogController.js'

const router = express.Router()

// Get all blogs
router.get('/', getAllBlogs)

// Get blog by ID
router.get('/:id', getBlogById)

// Save or update draft
router.post('/save-draft', saveDraft)

// Publish blog
router.post('/publish', publishBlog)

export default router