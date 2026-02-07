const express = require("express");
const router = express.Router();

const Property = require("../models/Property");

/* ======================================================
   PUBLIC ROUTES
====================================================== */

// FEATURED (MUST BE FIRST)
router.get("/featured", async (req, res) => {
  try {
    const properties = await Property.find({
      status: "published",
      featured: true
    })
      .sort({ createdAt: -1 })
      .limit(6);

    res.json(properties);
  } catch (err) {
    console.error("FEATURED ERROR:", err);
    res.status(500).json({ message: "Failed to fetch featured properties" });
  }
});


// FEATURED LIST (alias – kept as-is, safe)
router.get("/featured/list", async (req, res) => {
  try {
    const properties = await Property.find({
      status: "published",
      $or: [
        { isFeatured: true },
        { featured: true }
      ]
    })
      .sort({ createdAt: -1 })
      .limit(6);

    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch featured properties" });
  }
});

// ALL PUBLISHED
router.get("/", async (req, res) => {
  try {
    const properties = await Property.find({ status: "published" })
      .sort({ createdAt: -1 });

    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch properties" });
  }
});

// SINGLE (MUST BE LAST)
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findOne({
      _id: req.params.id,
      status: "published",
    });

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json(property);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch property" });
  }
});

module.exports = router;
