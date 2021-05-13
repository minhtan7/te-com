const Category = require("../models/Category");
const utilsHelper = require("../helpers/utils.helper");

const categoryController = {};

categoryController.getAllCat = async (req, res, next) => {
  try {
    const categories = await Category.find();
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { categories },
      null,
      "Get all category succeffuly"
    );
  } catch (error) {
    next(error);
  }
};

categoryController.createCat = async (req, res, next) => {
  try {
    const { name, parentCategory = null } = req.body;
    let category = await Category.findOne({ name });
    if (category) throw new Error("Category is already exists");
    category = await Category.create({ name, parentCategory });
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { category },
      null,
      "Category successfully created"
    );
  } catch (error) {
    next(error);
  }
};

categoryController.UpdateCat = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

categoryController.deleteCat = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = categoryController;
