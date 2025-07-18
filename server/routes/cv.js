import express from 'express';
import CV from '../models/CV.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all CVs for user
router.get('/', auth, async (req, res) => {
  try {
    const cvs = await CV.find({ userId: req.userId }).sort({ updatedAt: -1 });
    res.json(cvs);
  } catch (error) {
    console.error('Get CVs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single CV
router.get('/:id', auth, async (req, res) => {
  try {
    const cv = await CV.findOne({ _id: req.params.id, userId: req.userId });
    if (!cv) {
      return res.status(404).json({ message: 'CV not found' });
    }
    res.json(cv);
  } catch (error) {
    console.error('Get CV error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create CV
router.post('/', auth, async (req, res) => {
  try {
    const cv = new CV({
      ...req.body,
      userId: req.userId
    });
    await cv.save();
    res.status(201).json(cv);
  } catch (error) {
    console.error('Create CV error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update CV
router.put('/:id', auth, async (req, res) => {
  try {
    const cv = await CV.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!cv) {
      return res.status(404).json({ message: 'CV not found' });
    }
    res.json(cv);
  } catch (error) {
    console.error('Update CV error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete CV
router.delete('/:id', auth, async (req, res) => {
  try {
    const cv = await CV.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!cv) {
      return res.status(404).json({ message: 'CV not found' });
    }
    res.json({ message: 'CV deleted successfully' });
  } catch (error) {
    console.error('Delete CV error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
