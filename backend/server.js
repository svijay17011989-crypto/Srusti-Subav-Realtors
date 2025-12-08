const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const path = require("path");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, "..", "frontend")));

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Upload Setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB error:", err));

// Property Schema
const Property = mongoose.model(
  "Property",
  new mongoose.Schema({
    title: String,
    description: String,
    price: String,
    measurements: String,
    landFacing: String,
    images: [String],
    status: { type: String, enum: ["available", "sold"], default: "available" },
    createdAt: { type: Date, default: Date.now },
  })
);

// Admin Login Route
app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  if (password !== process.env.ADMIN_PASSWORD)
    return res.status(401).json({ message: "Invalid password" });

  const token = jwt.sign({ admin: true }, process.env.JWT_SECRET, {
    expiresIn: "12h",
  });

  res.json({ token });
});

// Admin Token Verification Middleware
function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "Missing token" });

  try {
    const token = header.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// Upload Images to Cloudinary
app.post(
  "/api/admin/upload",
  auth,
  upload.array("images", 5),
  async (req, res) => {
    try {
      const urls = await Promise.all(
        req.files.map(
          (file) =>
            new Promise((resolve, reject) => {
              cloudinary.uploader
                .upload_stream(
                  { folder: "srusti-properties" },
                  (err, result) => {
                    if (err) reject(err);
                    else resolve(result.secure_url);
                  }
                )
                .end(file.buffer);
            })
        )
      );

      res.json({ urls });
    } catch (err) {
      console.error("Upload error:", err);
      res.status(500).json({ message: "Upload failed" });
    }
  }
);

// Create Property
app.post("/api/admin/properties", auth, async (req, res) => {
  try {
    const p = new Property(req.body);
    await p.save();
    res.json({ message: "Property created", property: p });
  } catch (error) {
    res.status(500).json({ message: "Error creating property" });
  }
});

// Load Property Routes
const propertyRoutes = require("./routes/propertyRoutes");
app.use("/api/properties", propertyRoutes);

// Fallback → Always serve index.html for unknown routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
  console.log("ENV TEST:", process.env.PORT, process.env.MONGO_URI);
});