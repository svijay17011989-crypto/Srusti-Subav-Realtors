const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Property = require("../models/Property");
const Testimonial = require("../models/Testimonial");
const HeroSlide = require("../models/HeroSlide");
const Admin = require("../models/Admin");

const adminAuth = require("../middleware/adminAuth");

/* ======================================================
   ✅ ADMIN LOGIN (EXISTING)
====================================================== */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (err) {
    console.error("ADMIN LOGIN ERROR:", err);
    res.status(500).json({ message: "Login failed" });
  }
});

/* ======================================================
   ADMIN PROPERTIES (EXISTING)
====================================================== */

// GET ALL PROPERTIES (ADMIN)
router.get("/properties", adminAuth, async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (err) {
    console.error("ADMIN PROPERTIES ERROR:", err);
    res.status(500).json({ message: "Failed to fetch properties" });
  }
});

/* ======================================================
   ✅ ADD: GET SINGLE PROPERTY (ADMIN)  ← FIXES EDIT
====================================================== */
router.get("/properties/:id", adminAuth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(property);
  } catch (err) {
    console.error("ADMIN GET PROPERTY ERROR:", err);
    res.status(500).json({ message: "Failed to fetch property" });
  }
});

/* ======================================================
   ✅ ADD: UPDATE PROPERTY (ADMIN)
====================================================== */
router.put("/properties/:id", adminAuth, async (req, res) => {
  try {
    const updated = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error("ADMIN UPDATE PROPERTY ERROR:", err);
    res.status(500).json({ message: "Failed to update property" });
  }
});

/* ======================================================
   ✅ ADD: DELETE PROPERTY (ADMIN)
====================================================== */
router.delete("/properties/:id", adminAuth, async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: "Property deleted" });
  } catch (err) {
    console.error("ADMIN DELETE PROPERTY ERROR:", err);
    res.status(500).json({ message: "Failed to delete property" });
  }
});

/* ======================================================
   ADMIN DASHBOARD AGGREGATION (EXISTING)
====================================================== */
router.get("/dashboard-stats", adminAuth, async (req, res) => {
  try {
    const properties = await Property.find();
    const testimonials = await Testimonial.find();
    const heroSlides = await HeroSlide.find();

    res.json({
      total: properties.length,
      available: properties.filter(p => p.status === "available").length,
      sold: properties.filter(p => p.status === "sold").length,
      draft: properties.filter(
        p => p.status === "draft" || p.active === false
      ).length,
      featured: properties.filter(p => p.featured === true).length,
      testimonials: testimonials.length,
      heroSlides: heroSlides.length
    });
  } catch (err) {
    console.error("DASHBOARD STATS ERROR:", err);
    res.status(500).json({ message: "Failed to load dashboard stats" });
  }
});

module.exports = router;
