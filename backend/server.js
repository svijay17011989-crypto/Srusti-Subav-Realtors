const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

/* =========================
   MIDDLEWARE
========================= */
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-vercel-app.vercel.app",
      "https://yourdomain.com",
      "https://www.yourdomain.com",
    ],
    credentials: true,
  })
);

/* =========================
   STATIC FILES (IMAGES)
========================= */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* =========================
   ROUTES
========================= */
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/properties", require("./routes/propertyRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/hero", require("./routes/heroRoutes"));
app.use("/api/testimonials", require("./routes/testimonialRoutes"));

/* =========================
   TEST ROUTE (OPTIONAL)
========================= */
app.get("/", (req, res) => {
  res.send("API is running...");
});

/* =========================
   DATABASE
========================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

/* =========================
   SERVER
========================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
