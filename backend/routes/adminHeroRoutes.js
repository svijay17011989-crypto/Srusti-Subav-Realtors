const express = require("express");
const router = express.Router();
const Hero = require("../models/Hero");

// GET all heroes (admin)
router.get("/", async (req, res) => {
  try {
    const heroes = await Hero.find().sort({ order: 1 });
    res.json(heroes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE hero
router.put("/:id", async (req, res) => {
  try {
    const hero = await Hero.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(hero);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE hero
router.delete("/:id", async (req, res) => {
  try {
    await Hero.findByIdAndDelete(req.params.id);
    res.json({ message: "Hero deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
