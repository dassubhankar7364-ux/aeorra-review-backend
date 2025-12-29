const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  submitReview,
  getApprovedReviews,
  getPendingReviews,
  approveReview,
  deleteReview,
} = require("../controllers/reviewController");

// Customer (submit review with images)
router.post("/submit", upload.array("images", 5), submitReview);

// Admin (⚠️ FIRST)
router.get("/admin/pending", getPendingReviews);
router.put("/admin/approve/:id", approveReview);
router.delete("/admin/delete/:id", deleteReview);

// Customer (⚠️ LAST)
router.get("/:productId", getApprovedReviews);

module.exports = router;
