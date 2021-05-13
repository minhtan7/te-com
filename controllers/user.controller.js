const utilsHelper = require("../helpers/utils.helper");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Order = require("../models/Order");
const { findOneAndUpdate } = require("../models/User");
const userController = {};

userController.register = async (req, res, next) => {
  //SOMETHING MISSING HERE !!
  try {
    let { name, email, password, role } = req.body;
    let user = await User.findOne({ email });
    if (user) return next(new Error("401 - Email already exists"));

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    user = await User.create({ name, email, password, role });

    utilsHelper.sendResponse(
      res,
      200,
      true,
      { user },
      null,
      "Create new account!"
    );
  } catch (err) {
    next(err);
  }
};

//get current user .
userController.getCurrentUser = async (req, res, next) => {
  try {
    //SOMETHING MISSING HERE !!
    const userId = req.userId;
    let user = await User.findById(userId);

    utilsHelper.sendResponse(
      res,
      200,
      true,
      { user },
      null,
      `Successfully get ${user.name} user`
    );
  } catch (err) {
    next(err);
  }
};

//Get order of current user
userController.getCurrentUserOrder = async (req, res, next) => {
  try {
    //pagination
    let { page, limit, sortBy, ...filter } = { ...req.query };
    //SOMETHING MISSING HERE !!
    page = parseInt(page) || 1;
    limit = parseIng(limit) || 10;

    const totalOrders = await Order.count({ ...filter, isDeleted: false });

    const totalPages = Math.ceil(totalOrders / limit);
    const offset = limit * (page - 1);
    //current user
    //SOMETHING MISSING HERE !!
    const currentUserId = req.userId;
    const currentUser = await User.findById(currentUserId);

    //target user
    const userId = req.params.id;

    // current user request other's Order
    if (userId !== currentUserId && currentUser.role !== "admin") {
      return next(
        new Error("401- only admin able to check other user Order detail")
      );
    }
    // current user request its Order or Admin request user's order
    const order = await Order.find({ userId })
      .sort({ ...sortBy, createdAt: -1 })
      .skip(offset)
      .limit(limit);
    // in case no order
    if (!order) return next(new Error(`401- ${user} has no order`));

    utilsHelper.sendResponse(
      res,
      200,
      true,
      { order, totalPages },
      null,
      "get order from userId success"
    );
  } catch (error) {
    next(error);
  }
};

userController.paymentUserOrder = async (req, res, next) => {
  try {
    //get request detail
    const orderId = req.params.id; //SOMETHING MISSING HERE !!
    const currentUserId = req.userId; //SOMETHING MISSING HERE !!

    //find the order to pay , get balance
    let order = await Order.findById(orderId); //SOMETHING MISSING HERE !!
    let currentUser = await User.findById(currentUserId); //SOMETHING MISSING HERE !!
    const total = order.total;
    const funds = currentUser.balance;
    //check funds
    if (total > funds) return next(new Error("403-Insufficient balance"));

    //update new balance
    user = await User.findOneAndUpdate(
      {
        _id: currentUserId,
      },
      { balance: funds - total },
      { new: true }
    );
    //update new order
    order = findOneAndUpdate(
      {
        _id: orderId,
      },
      { status: "paid" },
      { new: true }
    );
  } catch (error) {
    next(error);
  }
};

module.exports = userController;
