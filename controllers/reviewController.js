const Review = require("../models/Review");

// 👉 Submit Review (Customer)
exports.submitReview = async (req, res) => {
  try {
    const { productId, customerName, rating, title, comment } = req.body;

    if (!productId || !customerName || !rating || !title || !comment) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      imageUrls = req.files.map((file) => file.path);
    }

    const review = new Review({
      productId,
      customerName,
      rating,
      title,
      comment,
      images: imageUrls,
      approved: false,
    });

    await review.save();

    res.status(201).json({
      message: "Review submitted successfully",
      review,
    });
  } catch (error) {
    console.error("SUBMIT ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 👉 Get Approved Reviews (Frontend / Customer)
exports.getApprovedReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({
      productId,
      approved: true,
    }).sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    console.error("GET APPROVED ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 👉 Get Pending Reviews (Admin)
exports.getPendingReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ approved: false }).sort({
      createdAt: -1,
    });

    res.status(200).json(reviews);
  } catch (error) {
    console.error("PENDING ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 👉 Approve Review (Admin)
exports.approveReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findByIdAndUpdate(
      id,
      { approved: true },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review approved" });
  } catch (error) {
    console.error("APPROVE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 👉 Delete Review (Admin)
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    await Review.findByIdAndDelete(id);

    res.status(200).json({ message: "Review deleted" });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
