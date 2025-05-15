import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import blogRoutes from './routes/blogRoutes.js'
import authRoutes from './routes/authRoutes.js'
import { auth } from './middleware/auth.js'

// Load environment variables
dotenv.config()

// Initialize express app
const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/blogs', auth, blogRoutes) // Protect all blog routes

// Routes
app.use('/api/blogs', blogRoutes)

// Root route
app.get('/', (req, res) => {
  res.send('Blog Editor API is running')
})

// Connect to MongoDB
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI )
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message)
    process.exit(1)
  }
}

// Start server
const startServer = async () => {
  await connectToDatabase()
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

startServer()