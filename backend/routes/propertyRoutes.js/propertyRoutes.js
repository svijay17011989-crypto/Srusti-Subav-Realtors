const express = require("express");
const router = express.Router();
const Property = require("../models/Property");
const adminAuth = require("../middleware/adminAuth");

/*
====================================
CREATE PROPERTY (ADMIN)
POST /api/properties
====================================
*/
router.post("/", adminAuth, async (req, res) => {
  try {
    const newProperty = new Property(req.body);
    await newProperty.save();

    res.status(201).json({
      message: "Property created successfully",
      property: newProperty,
    });
  } catch (err) {
    console.error("Error creating property:", err);
    res.status(500).json({ message: "Error creating property" });
  }
});

/*
====================================
GET ALL PROPERTIES (PUBLIC)
GET /api/properties
====================================
*/
router.get("/", async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (err) {
    console.error("Error fetching properties:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/*
====================================
GET SINGLE PROPERTY (PUBLIC)
GET /api/properties/:id
====================================
*/
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json(property);
  } catch (err) {
    console.error("Error fetching property:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/*
====================================
UPDATE PROPERTY (ADMIN)
PUT /api/properties/:id
====================================
*/
router.put("/:id", adminAuth, async (req, res) => {
  try {
    const updated = await Property.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json({
      message: "Property updated successfully",
      property: updated,
    });
  } catch (err) {
    console.error("Error updating property:", err);
    res.status(500).json({ message: "Error updating property" });
  }
});

/*
====================================
DELETE PROPERTY (ADMIN)
DELETE /api/properties/:id
====================================
*/
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const deleted = await Property.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json({
      message: "Property deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting property:", err);
    res.status(500).json({ message: "Error deleting property" });
  }
});

module.exports = router;
