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

// --- Database Connection Handling (Vercel serverless friendly) ---
let isConnected = false; // track connection state

async function connectDB() {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI); // ✅ no deprecated options
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

// --- Global API logging middleware ---
app.use("/api", (req, res, next) => {
  console.log(`✅ API request: ${req.method} ${req.originalUrl}`);
  next();
});

// --- API routes ---
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/expenses", expenseRoutes);

// --- Root + favicon handlers ---
app.get("/", (req, res) => {
  res.send(
    "🚀 Penny Path API is running. Try /api/auth, /api/categories, or /api/expenses"
  );
});

app.get(["/favicon.ico", "/favicon.png"], (req, res) => {
  res.status(204).end(); // No Content, avoids 404 log spam
});

// --- Export Express app for Vercel (no app.listen) ---
module.exports = app;
