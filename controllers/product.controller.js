const utilsHelper = require("../helpers/utils.helper");
const Product = require("../models/Product");

//productentication controllers
const productController = {};

//Get all products with filter and query
productController.getAllProducts = async (req, res, next) => {
  try {
    let { page, limit, sortBy, ...filter } = { ...req.query };
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const totalProducts = await Product.count({ ...filter, isDeleted: false });

    const totalPages = Math.ceil(totalProducts / limit);
    const offset = limit * (page - 1);

    //SOMETHING MISSING HERE !! Mongoose ?
    const products = await Product.find().skip(offset).limit(limit);
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { products, totalPages },
      null,
      "Get all product Success"
    );
  } catch (error) {
    next(error);
  }
};

//Add new product
productController.addProduct = async (req, res, next) => {
  try {
    //SOMETHING MISSING HERE !! Req.?
    const { name, description, price, images } = req.body;
    console.log(images);
    const products = await Product.create({
      name,
      description,
      price,
      images,
    });
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { products },
      null,
      "product created"
    );
  } catch (error) {
    next(error);
  }
};
//admin update product
productController.updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const { name, description, price, images } = req.body;

    const product = await Product.findOneAndUpdate(
      {
        _id: productId, //SOMETHING MISSING HERE !!
      },
      {
        name,
        description,
        price,
        images, //SOMETHING MISSING HERE !!
      },
      {
        new: true, //SOMETHING MISSING HERE !!
      }
    );
    if (!product) {
      return next(new Error("Product not found or User not authorized"));
    }

    utilsHelper.sendResponse(
      res,
      200,
      true,
      { product },
      null,
      "Product updated"
    );
  } catch (error) {
    next(error);
  }
};
productController.getSingleProduct = async (req, res, next) => {
  try {
    //SOMETHING MISSING HERE !!
    const productId = req.params.id;
    const product = await Product.findById(productId);
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { product },
      null,
      "Get detail of single product success"
    );
  } catch (error) {
    next(error);
  }
};
//delete productController
productController.deleteProduct = async (req, res, next) => {
  try {
    //SOMETHING MISSING HERE !!
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return next(new Error("Product not found or User not authorized"));
    }
    await Product.findByIdAndUpdate(
      productId,
      { isDeleted: true },
      { new: true }
    );
    utilsHelper.sendResponse(
      res,
      200,
      true,
      null,
      null,
      "Product is successfully deleted"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = productController;
