const express = require("express");
const router = express.Router();

const Property = require("../models/Property");
const adminAuth = require("../middleware/adminAuth");

// CREATE property (ADMIN)
router.post("/create", adminAuth, async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: "Error creating property" });
  }
});

// GET all properties (PUBLIC)
router.get("/", async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: "Error fetching properties" });
  }
});

// GET property by ID
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Not found" });
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: "Error fetching property" });
  }
});

// UPDATE property (ADMIN)
router.put("/:id", adminAuth, async (req, res) => {
  try {
    const updated = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating property" });
  }
});

// DELETE property (ADMIN)
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: "Property deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting property" });
  }
});

module.exports = router;
