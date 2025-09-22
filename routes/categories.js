const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const auth = require('../middleware/auth');

// Create a new category
router.post('/create', auth, async (req, res) => {
  try {
    const { name, icon, color } = req.body;
    if (!name) return res.status(400).json({ message: 'Category name is required' });

    const existing = await Category.findOne({ name, userId: req.user.userId });
    if (existing) return res.status(400).json({ message: 'Category already exists' });

    const category = await Category.create({ name, icon, color, userId: req.user.userId });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all categories for a user
router.get('/list', auth, async (req, res) => {
  try {
    const categories = await Category.find({ userId: req.user.userId });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
