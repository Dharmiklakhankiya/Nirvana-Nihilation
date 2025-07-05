import express from 'express'
import Resume from '../models/Resume.js'
import { requireAuth, extractUserId } from '../models/middleware/auth.js'

const router = express.Router()

router.get('/', requireAuth, extractUserId, async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.userId }).sort({ updatedAt: -1 })
    res.json({ data: resumes })
  } catch (error) {
    res.status(500).json({ error: error.message || "Failed to fetch resumes" })
  }
})

router.get('/:id', requireAuth, extractUserId, async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'Invalid resume ID format' })
    }
    const resume = await Resume.findOne({ _id: req.params.id })
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' })
    }
    if (process.env.NODE_ENV === 'production' && resume.userId !== req.userId) {
      return res.status(403).json({ error: 'You do not have permission to view this resume' })
    }
    res.json({ data: resume })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/', requireAuth, extractUserId, async (req, res) => {
  try {
    const resumeData = {
      userId: req.userId,
      ...req.body
    }
    const resume = new Resume(resumeData)
    const savedResume = await resume.save()
    res.status(201).json({ data: savedResume })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.put('/:id', requireAuth, extractUserId, async (req, res) => {
  try {
    const updateData = req.body.data || req.body
    updateData.updatedAt = Date.now()
    const resume = await Resume.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      updateData,
      { new: true, runValidators: true }
    )
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' })
    }
    res.json({ data: resume })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.delete('/:id', requireAuth, extractUserId, async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    })
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' })
    }
    res.status(200).json({ message: 'Resume deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
