const express = require("express");
const router = express.Router();

const Property = require("../models/Property");
const adminAuth = require("../middleware/adminAuth");
const upload = require("../middleware/uploads");

const cloudinary = require("../config/cloudinary");

console.log("✅ propertyRoutes loaded");

// ===============================
// CREATE property (ADMIN ONLY)
// ===============================
router.post(
  "/create",
  adminAuth,
  upload.array("images", 5), // 🔴 THIS WAS MISSING EARLIER
  async (req, res) => {
    try {
      const imageUrls = [];

      // Upload images to Cloudinary
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: "srusti-properties",
          });
          imageUrls.push(result.secure_url);
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
