const express = require("express");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/authentication");
const router = express.Router();
/**
 * @route POST api/user/
 * @description User can register account
 * @access Public
 */

router.post("/", userController.register);

/**
 * @route GET api/user/me
 * @description Return current user info
 * @access Login required
 */
router.get("/me", authMiddleware.loginRequired, userController.getCurrentUser);

/**
 * @route GET api/users/:id/order
 * @description Return list orders of current user
 * @access Login required or Admin authorized
 */
router.get(
  "/:id/order",
  //SOMETHING MISSING HERE !!
  //SOMETHING MISSING HERE !!
  authMiddleware.loginRequired,
  userController.getCurrentUserOrder
);

/**
 * @route Put api/user/:id/payment
 * @description User can make payment
 * @access Login required
 */
router.put(
  "/:id/payment",
  //SOMETHING MISSING HERE !!
  //SOMETHING MISSING HERE !!
  authMiddleware.loginRequired,
  authMiddleware.adminRequired,
  userController.paymentUserOrder
);

/**
 * @route PUT api/user/:id/top
 * @description Top-up user balance
 * @access Login required
 */
router.put(
  "/:id/topup",
  authMiddleware.loginRequired
  //SOMETHING MISSING HERE !!
);

module.exports = router;
