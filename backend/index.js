import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import resumeRoutes from './routes/resumes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', process.env.FRONTEND_URL].filter(Boolean),
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-user-id'],
  credentials: true
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

app.use('/api/resumes', resumeRoutes)

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Resume Builder API is running' })
})

app.use((err, req, res, next) => {
  console.error('Global error handler caught:', err)
  res.status(500).json({
    error: 'Server error',
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  })
})

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB:', process.env.MONGODB_URI)
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch(err => {
    console.error('MongoDB connection error:', err)
    process.exit(1)
  })
