const router = require("express").Router();
const Hero = require("../models/Hero");
const adminAuth = require("../middleware/adminAuth");

/* ======================================================
   GET ACTIVE HERO SLIDES (PUBLIC)
====================================================== */
router.get("/", async (req, res) => {
  try {
    const slides = await Hero.find({ active: true }).sort({ order: 1 });
    res.json(slides);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch hero slides" });
  }
});

/* ======================================================
   ADMIN CRUD
====================================================== */
router.post("/", adminAuth, async (req, res) => {
  try {
    const slide = await Hero.create(req.body);
    res.json(slide);
  } catch (err) {
    res.status(400).json({ message: "Failed to create hero slide" });
  }
});

router.put("/:id", adminAuth, async (req, res) => {
  try {
    const slide = await Hero.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(slide);
  } catch (err) {
    res.status(400).json({ message: "Failed to update hero slide" });
  }
});

router.delete("/:id", adminAuth, async (req, res) => {
  try {
    await Hero.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete hero slide" });
  }
});

module.exports = router;
