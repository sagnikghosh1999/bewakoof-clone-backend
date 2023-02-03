const express = require("express");
const {
  newOrder,
  myOrders,
  getSingleOrder,
  cancelOrder,
} = require("../controllers/orderController");
const { isAuthenticatedUser } = require("../middlewares/auth");
const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder);

router
  .route("/order/:id")
  .get(isAuthenticatedUser, getSingleOrder)
  .put(isAuthenticatedUser, cancelOrder);

router.route("/orders/me").get(isAuthenticatedUser, myOrders);

module.exports = router;
