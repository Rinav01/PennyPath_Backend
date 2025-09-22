const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  amount: Number,
  date: Date,
  category: {
    categoryId: String,
    name: String,
    icon: String,
    color: String,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Expense', expenseSchema);
