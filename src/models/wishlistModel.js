const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.ObjectId,
    ref: "User",
    required: true,
  },
  wishItems: [
    {
      product: {
        type: mongoose.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Wishlist", wishlistSchema);
