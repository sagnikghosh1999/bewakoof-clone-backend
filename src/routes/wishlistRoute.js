const express = require("express");
const {
  createWishlist,
  getWishlist,
  deleteWish,
} = require("../controllers/wishlistController");
const { isAuthenticatedUser } = require("../middlewares/auth");
const router = express.Router();

router
  .route("/wishlist")
  .post(isAuthenticatedUser, createWishlist)
  .get(isAuthenticatedUser, getWishlist);

router.route("/wishlist/delete").put(isAuthenticatedUser, deleteWish);
module.exports = router;
