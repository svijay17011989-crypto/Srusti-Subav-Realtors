const router = require("express").Router();
const HeroSlide = require("../models/HeroSlide");
const adminAuth = require("../middleware/adminAuth");

/* PUBLIC – ACTIVE SLIDES */
router.get("/", async (req, res) => {
  const slides = await HeroSlide.find({ active: true }).sort({ order: 1 });
  res.json(slides);
});

/* ADMIN – ALL SLIDES */
router.get("/", async (req, res) => {
  const slides = await HeroSlide
    .find({ active: true })   // ✅ FIXED
    .sort({ order: 1 });

  res.json(slides);
});

/* CREATE */
router.post("/", adminAuth, async (req, res) => {
  const slide = await HeroSlide.create(req.body);
  res.json(slide);
});

/* UPDATE */
router.put("/:id", adminAuth, async (req, res) => {
  const slide = await HeroSlide.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(slide);
});

/* DELETE */
router.delete("/:id", adminAuth, async (req, res) => {
  await HeroSlide.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
