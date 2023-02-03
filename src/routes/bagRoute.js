const express = require("express");
const {
  addToBag,
  getBag,
  updateQuantityBag,
  deleteBag,
  updateSizeBag,
} = require("../controllers/bagController");
const { isAuthenticatedUser } = require("../middlewares/auth");
const router = express.Router();

router.route("/addtobag").post(isAuthenticatedUser, addToBag);
router
  .route("/bag")
  .get(isAuthenticatedUser, getBag)
  .put(isAuthenticatedUser, updateQuantityBag);

router.route("/bagsizeupdate").put(isAuthenticatedUser, updateSizeBag);

router.route("/deletebagitem").put(isAuthenticatedUser, deleteBag);

module.exports = router;
