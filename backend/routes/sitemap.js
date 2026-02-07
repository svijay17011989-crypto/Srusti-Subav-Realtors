const express = require("express");
const router = express.Router();
const Property = require("../models/Property"); // ✅ CHECK PATH

router.get("/sitemap.xml", async (req, res) => {
  try {
    res.header("Content-Type", "application/xml");

    const baseUrl = "https://srustisubavrealtors.com";

    // Fetch properties
    const properties = await Property.find({}, "_id");

    const staticUrls = `
      <url>
        <loc>${baseUrl}/</loc>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>${baseUrl}/properties</loc>
        <priority>0.9</priority>
      </url>
      <url>
        <loc>${baseUrl}/contact</loc>
        <priority>0.8</priority>
      </url>
    `;

    const propertyUrls = properties
      .map(
        (p) => `
        <url>
          <loc>${baseUrl}/properties/${p._id}</loc>
          <priority>0.7</priority>
        </url>
      `
      )
      .join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticUrls}
      ${propertyUrls}
    </urlset>`;

    res.send(sitemap);
  } catch (error) {
    console.error("❌ Sitemap error:", error.message);
    res.status(500).send("Error generating sitemap");
  }
});

module.exports = router;
