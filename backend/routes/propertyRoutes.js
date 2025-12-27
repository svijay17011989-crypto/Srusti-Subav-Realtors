const express = require("express");
const router = express.Router();

console.log("✅ propertyRoutes loaded");

const Property = require("../models/Property");
const adminAuth = require("../middleware/adminAuth");

// ===============================
// CREATE property (ADMIN ONLY)
// ===============================
router.post("/create", adminAuth, async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===============================
// MARK PROPERTY AS SOLD (ADMIN ONLY)
// ===============================
router.put("/:id/sold", adminAuth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    property.status = "sold";
    await property.save();

    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===============================
// DELETE PROPERTY (ADMIN ONLY) ✅
// ===============================
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    await property.deleteOne();

    res.json({ message: "Property deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===============================
// GET all properties (PUBLIC)
// ===============================
router.get("/", async (req, res) => {
  const properties = await Property.find().sort({ createdAt: -1 });
  res.json(properties);
});

module.exports = router;
