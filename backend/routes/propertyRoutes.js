const express = require("express");
const router = express.Router();
const streamifier = require("streamifier");

const Property = require("../models/Property");
const adminAuth = require("../middleware/adminAuth");
const upload = require("../middleware/uploads");
const cloudinary = require("../config/cloudinary");

console.log("✅ propertyRoutes loaded");

// Helper: upload buffer to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "srusti-properties" },
      (error, result) => {
        if (result) resolve(result.secure_url);
        else reject(error);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// ===============================
// CREATE property (ADMIN ONLY)
// ===============================
router.post(
  "/create",
  adminAuth,
  upload.array("images", 5),
  async (req, res) => {
    try {
      const imageUrls = [];

      // Upload images to Cloudinary
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const imageUrl = await uploadToCloudinary(file.buffer);
          imageUrls.push(imageUrl);
        }
      }

      const property = new Property({
        title: req.body.title,
        price: req.body.price,
        location: req.body.location,
        type: req.body.type,
        description: req.body.description,
        images: imageUrls,
      });

      await property.save();
      res.json(property);
    } catch (err) {
      console.error("❌ Create property error:", err);
      res.status(500).json({ message: err.message });
    }
  }
);

// ===============================
// MARK PROPERTY AS SOLD
// ===============================
router.put("/:id/sold", adminAuth, async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property) return res.status(404).json({ message: "Not found" });

  property.status = "sold";
  await property.save();
  res.json(property);
});

// ===============================
// DELETE PROPERTY
// ===============================
router.delete("/:id", adminAuth, async (req, res) => {
  await Property.findByIdAndDelete(req.params.id);
  res.json({ message: "Property deleted" });
});

// ===============================
// GET ALL PROPERTIES (PUBLIC)
// ===============================
router.get("/", async (req, res) => {
  const properties = await Property.find().sort({ createdAt: -1 });
  res.json(properties);
});

module.exports = router;
