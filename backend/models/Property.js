const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      default: "Residential",
    },

    price: {
      type: Number,
      required: true,
    },

    priceUnit: {
      type: String,
      default: "perCent", // existing behaviour preserved
    },

    /* 🔹 NEW — LOCATION */
    location: {
      type: String,
      default: "", // eg: Kalapatti, Coimbatore
    },

    /* 🔹 NEW — AREA */
    areaValue: {
      type: Number,
      default: null, // eg: 2.5
    },

    areaUnit: {
      type: String,
      default: "", // acres | cents | sqft
    },

    measurements: {
      type: String,
      default: "",
    },

    landFacing: {
      type: String,
      default: "",
    },

    dtcpApproved: {
      type: String,
      default: "No",
    },

    featured: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      default: "available",
    },

    images: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", PropertySchema);
