require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/categories");
const expenseRoutes = require("./routes/expenses");
const corsMiddleware = require("./middleware/cors");

const app = express();

// Enable CORS
app.use(corsMiddleware);

// JSON body parsing middleware
app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/expenses", expenseRoutes);

// --- Database Connection Handling (Vercel serverless friendly) ---
let isConnected = false; // track connection state

async function connectDB() {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

// Ensure DB is connected before handling requests
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// --- Export Express app for Vercel (no app.listen) ---
module.exports = app;
