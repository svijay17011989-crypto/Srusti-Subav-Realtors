require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes (case-correct, Linux-safe)
const authRoutes = require("./backend/routes/authRoutes");
const propertyRoutes = require("./backend/routes/propertyRoutes");

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname, "frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// Start server (REQUIRED for Render)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
