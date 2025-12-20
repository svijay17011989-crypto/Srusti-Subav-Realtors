const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: String,
    required: true,
  },
  measurements: String,
  landFacing: String,
  images: {
    type: [String],
    default: [],
  },
  status: {
    type: String,
    enum: ["available", "sold"],
    default: "available",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Property", propertySchema);
