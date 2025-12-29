const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },

    customerName: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    title: {
      type: String,
      required: true,
    },

    comment: {
      type: String,
      required: true,
    },

    images: {
      type: [String], // Cloudinary image URLs
      default: [],
    },

    verifiedPurchase: {
      type: Boolean,
      default: false,
    },

    approved: {
      type: Boolean,
      default: false, // admin approve করবে
    },
  },
  {
    timestamps: true, // createdAt, updatedAt auto
  }
);

module.exports = mongoose.model("Review", reviewSchema);
