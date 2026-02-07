const express = require("express");
const { adminLogin } = require("../controllers/authController");

const router = express.Router();

/**
 * ADMIN LOGIN (DATABASE BASED)
 */
router.post("/admin/login", adminLogin);

module.exports = router;
