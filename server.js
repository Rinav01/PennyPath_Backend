require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/categories');
const expenseRoutes = require('./routes/expenses');
const corsMiddleware = require('./middleware/cors');

const app = express();

// Enable CORS for all routes
app.use(corsMiddleware);

// JSON body parsing middleware
app.use(express.json());

// Mount API routes with proper prefixes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/expenses', expenseRoutes);

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log('Server running on port', process.env.PORT || 3000);
    });
  })
  .catch(err => console.error('Connection error', err));
