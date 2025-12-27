const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    price: {
      type: String,
      required: true,
    },

    measurements: {
      type: String,
      trim: true,
    },

    landFacing: {
      type: String,
      trim: true,
    },

    // ✅ MULTIPLE IMAGES SUPPORT
    images: {
      type: [String], // stores image URLs like /uploads/filename.jpg
      default: [],
    },

    status: {
      type: String,
      enum: ["available", "sold"],
      default: "available",
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  }
);

module.exports = mongoose.model("Property", propertySchema);
