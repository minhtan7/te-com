const Product = require("../models/Product");
const Order = require("../models/Order");
const Review = require("../models/Review");
const utilsHelper = require("../helpers/utils.helper");

reviewControllers = {};

reviewControllers.createReview = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { productId, content, rate } = req.body;
    //1. check if the product still exist
    const product = await Product.findById(productId);
    if (!product) throw new Error("Product is no longer exist!");
    //2. check if the user have ever successfully bought that product
    const order = await Order.find({
      userId,
      orderItems: { $elemMatch: { productId } },
    });
    if (!order)
      throw new Error(
        "You have to experience the product before leave a reivew. Thank you."
      );
    //3. check if the user have ever done any reviews on that product
    let review = await Review.find({ userId });
    if (review) throw new Error("You've already reviewed on this product!");
    //4. create a review
    review = await Review.create({
      productId,
      userId,
      content,
      rate,
    });
    //5. push review Id to user docment
    await Product.findByIdAndUpdate(productId, {
      $push: { reviews: review._id },
    });
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { review },
      null,
      "Review successfully created!"
    );
  } catch (error) {
    next(error);
  }
};

reviewControllers.getReview = async (req, res, next) => {
  try {
    const id = req.params.id;
    const review = await Review.findById(id);
    if (!review) throw new Error("Review is no longer exists!");
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { review },
      null,
      "Get review successfully."
    );
  } catch (error) {
    next(error);
  }
};

reviewControllers.updateReview = async (req, res, next) => {
  try {
    const userId = req.userId;
    const id = req.params.id;
    const { productId, content, rate } = req.body;
    //check if the review is still exists
    let review = await Review.findById(id);
    if (!review) throw new Error("The review is no longer exists!");

    //check if that review is written by current user
    if (review.userId !== userId)
      throw new Error("User not authorized to edit this review!");

    review = await Review.findByIdAndUpdate(
      id,
      {
        productId,
        userId,
        content,
        rate,
      },
      { new: true }
    );
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { review },
      null,
      "Review updated!"
    );
  } catch (error) {
    next(error);
  }
};

reviewControllers.deleteReview = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Review.remove({ _id: id });
    utilsHelper.sendResponse(res, 200, true, null, null, "Review deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = reviewControllers;
