const mongoose = require("mongoose");

const bag = new mongoose.Schema({
  user: {
    type: mongoose.ObjectId,
    ref: "User",
    required: true,
  },
  bagItems: [
    {
      product: {
        type: mongoose.ObjectId,
        ref: "Product",

        required: true,
      },
      size: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Bag", bag);
