const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: true,
    },
    parentCategory: { type: mongoose.Types.ObjectId, ref: "Category" },
    isDeleted: { type: Boolean, defaults: false },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
