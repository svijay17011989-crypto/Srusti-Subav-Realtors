require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// ===== MongoDB Connection =====
console.log("MONGO_URI =", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) =>
    console.error("❌ MongoDB connection error:", err.message)
  );

// ===== ROUTES =====
const propertyRoutes = require("./routes/propertyRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/api/properties", propertyRoutes);
app.use("/api/admin", adminRoutes);

console.log("✅ Admin routes mounted at /api/admin");

// ===== Test Route =====
app.get("/", (req, res) => {
  res.send("🚀 Server is running");
});

// ===== Server Start =====
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
