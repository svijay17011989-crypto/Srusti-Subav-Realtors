const router = require("express").Router();
const Testimonial = require("../models/Testimonial");
const adminAuth = require("../middleware/adminAuth");

/* PUBLIC – ACTIVE TESTIMONIALS */
router.get("/", async (req, res) => {
  const testimonials = await Testimonial.find({ active: true }).sort({
    order: 1,
  });
  res.json(testimonials);
});

/* ADMIN CRUD */
router.post("/", adminAuth, async (req, res) => {
  const item = await Testimonial.create(req.body);
  res.json(item);
});

router.put("/:id", adminAuth, async (req, res) => {
  const item = await Testimonial.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(item);
});

router.delete("/:id", adminAuth, async (req, res) => {
  await Testimonial.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
