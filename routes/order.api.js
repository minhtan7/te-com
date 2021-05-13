const express = require("express");
const authMiddleware = require("../middlewares/authentication");
const orderController = require("../controllers/order.controller");
const router = express.Router();

/**
 * @route POST api/order/login
 * @description User can create order
 * @access Login require
 */
router.post("/", authMiddleware.loginRequired, orderController.createOrder);
/**
 * @route POST api/order/login
 * @description User can update order
 * @access Login require
 */
router.put(
  "/:id/update",
  //SOMETHING MISSING HERE !!
  authMiddleware.loginRequired,
  orderController.updateOrder
);

/**
 * @route POST api/order/login
 * @description User can see order detail
 * @access Login required
 */
router.get(
  "/:id",
  authMiddleware.loginRequired,
  orderController.getDetailOrder
  //SOMETHING MISSING HERE !!
);

/**
 * @route POST api/order/login
 * @description Admin can delete order
 * @access Admin required
 */
router.put(
  "/:id",
  authMiddleware.loginRequired,
  //SOMETHING MISSING HERE !!
  orderController.deleteOrder //typo here
);

module.exports = router;
