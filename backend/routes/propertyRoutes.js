const express = require("express");
const router = express.Router();

const Property = require("../models/Property");
const adminAuth = require("../middleware/adminAuth");
const upload = require("../middleware/uploads");
const cloudinary = require("../config/cloudinary");

router.post(
  "/create",
  adminAuth,
  upload.array("images", 5), // ✅ THIS LINE IS CRITICAL
  async (req, res) => {
    try {
      const { title, price, type, location } = req.body;

      if (!title || !price) {
        return res.status(400).json({ message: "Title and price are required" });
      }

      let imageUrls = [];

      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const result = await cloudinary.uploader.upload(
            `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
            { folder: "properties" }
          );

          imageUrls.push(result.secure_url);
        }
      }

      const property = new Property({
        title,
        price,
        type,
        location,
        images: imageUrls,
      });

      await property.save();
      res.json(property);
    } catch (err) {
      console.error("CREATE PROPERTY ERROR:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

module.exports = router;
