const express = require('express');
const router = express.Router();
const Expense = require('../models/expense');
const Category = require('../models/category');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  const { amount, date, categoryId } = req.body;
  const category = await Category.findById(categoryId);
  if (!category) return res.status(400).json({ message: 'Invalid category' });
  const expense = await Expense.create({
    amount,
    date,
    category: {
      categoryId: category._id,
      name: category.name,
      icon: category.icon,
      color: category.color,
    },
    userId: req.user.userId,
  });
  res.status(201).json(expense);
});

router.get('/', auth, async (req, res) => {
  const expenses = await Expense.find({ userId: req.user.userId });
  res.json(expenses);
});

router.put('/:expenseId', auth, async (req, res) => {
  const { expenseId } = req.params;
  const { amount, date, category } = req.body;
  const expense = await Expense.findOneAndUpdate(
    { _id: expenseId, userId: req.user.userId },
    { amount, date, category },
    { new: true }
  );
  if (!expense) return res.status(404).json({ message: 'Expense not found' });
  res.json(expense);
});

router.delete('/:expenseId', auth, async (req, res) => {
  const { expenseId } = req.params;
  const expense = await Expense.findOneAndDelete({ _id: expenseId, userId: req.user.userId });
  if (!expense) return res.status(404).json({ message: 'Expense not found' });
  res.json({ message: 'Expense deleted successfully' });
});

module.exports = router;
