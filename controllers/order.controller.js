const Order = require("../models/Order");
const { prependListener } = require("../app");

const orderController = {};

//Create the order
orderController.createOrder = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { products } = req.body;
    const total = products.reduce((total, product) => {
      return total + product.quantity * product.price;
    }, 0);
    // create Order that represent
    //SOMETHING MISSING HERE !!
    //
    const order = await Order.create({ userId, orderItems: products, total }); // later should use aggregation

    utilsHelper.sendResponse(res, 200, true, { order }, null, "Order created");
  } catch (error) {
    next(error);
  }
};

//Get detail of an order by its ID
orderController.getDetailOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    //SOMETHING MISSING HERE !!
    const order = await Order.findById(orderId);
    if (!order) return next(new Error("401- Order not found"));
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { order },
      null,
      "get detail order success"
    );
  } catch (error) {
    next(error);
  }
};
//Update Order
orderController.updateOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const { products, total } = req.body;

    //SOMETHING MISSING HERE !!
    const order = await Order.findByIdAndUpdate(
      orderId,
      { products, total },
      { new: true }
    );
    if (!order) {
      return next(new Error("order not found or User not authorized"));
    }
    utilsHelper.sendResponse(res, 200, true, { order }, null, "order send");
  } catch (error) {
    next(error);
  }
};
//

//delete order
orderController.deleteOrder = async (req, res, next) => {
  try {
    //SOMETHING MISSING HERE !!
    const orderId = req.params.id;
    const order = await Order.findOneAndUpdate(
      {
        _id: orderId,
      },
      { isDeleted: true },
      { new: true }
    );
    if (!order) {
      return next(new Error("order not found or User not authorized"));
    }
    utilsHelper.sendResponse(res, 200, true, null, null, "Order deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = orderController;
