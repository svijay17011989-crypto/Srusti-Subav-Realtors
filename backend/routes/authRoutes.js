const express = require("express");
const router = express.Router();

// example login route
router.post("/login", async (req, res) => {
  res.json({ message: "Auth route working" });
});

module.exports = router;
