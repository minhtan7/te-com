const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reviewSchema = Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true, required: true },
    rate: { type: Number, min: 0, max: 5, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamp: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
