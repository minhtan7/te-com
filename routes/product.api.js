const express = require("express");
const router = express.Router();

//
/**
 * @route GET api/product?page=1&limit=10
 * @description User can see list of all products
 * @access Public
 */

/**
 * @route POST api/product/add
 * @description Admin can add product
 * @access Admin Required
 */

/**
 * @route PUT api/product/:id/update
 * @description Admin can update product
 * @access Admin required
 */

module.exports = router;
