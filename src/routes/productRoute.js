const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  getProductDetails,
  deleteProduct,
  createProductReview,
  getProductReviews,
  getAllBrands,
  getAllCategories,
  getAllSubCategories,
  getAllAdminProducts,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);

router
  .route("/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router.route("/reviews").get(getProductReviews);

module.exports = router;
