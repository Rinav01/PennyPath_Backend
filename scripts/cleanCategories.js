require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../models/category');

async function clean() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');

    // Remove categories missing the name field or with empty name
    const result = await Category.deleteMany({ $or: [{ name: { $exists: false } }, { name: '' }] });

    console.log(`Deleted ${result.deletedCount} invalid categories`);

    await mongoose.disconnect();
    console.log('Disconnected from DB');
  } catch (err) {
    console.error('Error cleaning categories:', err);
  }
}

clean();
