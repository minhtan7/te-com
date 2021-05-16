const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ imageUrl: { type: String, required: true } }],
    reviews: [{ type: mongoose.Types.ObjectId, ref: "Reivew" }],
    avgRating: Number,
    category: [{ type: mongoose.Types.ObjectId, ref: "Category" }],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamp: true }
);
productSchema.plugin(require("./plugins/isDeletedFalse"));

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
