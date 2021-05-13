const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const authMiddleware = require("../middlewares/authentication");

/**
 * @description User can see list of all products
 */
router.get("/", productController.getAllProducts);
/**
 * @description Admin can add product
 */
router.post(
  "/add",
  authMiddleware.loginRequired,
  authMiddleware.adminRequired,
  productController.addProduct
);
/**
 * @description Admin can update product

 */
router.put(
  "/:id/update",
  authMiddleware.loginRequired,
  authMiddleware.adminRequired,
  productController.updateProduct
);
/**
 * @description get single product
 */
router.get("/:id", productController.getSingleProduct);
/**
 * @description delete single product
 */
router.put("/:id", productController.deleteProduct);

module.exports = router;
