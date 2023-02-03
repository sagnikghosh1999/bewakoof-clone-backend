const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Product Name"],
    trim: true,
  },
  title: {
    type: String,
    trim: true,
  },

  brand: {
    type: String,
    required: [true, "Please Enter Brand name"],
  },

  colour: {
    type: String,
    required: [true, "Please Enter colour"],
  },

  productType: {
    type: String,
    required: [true, "Please Enter product type"],
  },

  strikedOffprice: {
    type: Number,
    required: [true, "Please Enter Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },

  price: {
    type: Number,
    maxLength: [8, "Price cannot exceed 8 characters"],
  },

  description: {
    type: String,
    required: [true, "Please Enter product details"],
  },

  images: [
    {
      type: String,
      required: true,
    },
  ],

  category: {
    type: String,
    required: [true, "Please Enter category"],
  },

  subCategory: {
    type: String,
  },

  sizes: [{ type: String, required: [true, "Please Enter available sizes"] }],

  stocks: [
    {
      size: {
        type: String,
        required: [true, "Please Enter size"],
      },
      stock: {
        type: Number,
        required: [true, "Please Enter the stock"],
        maxLength: [5, "Stock cannot exceed 4 characters"],
        default: 1,
      },
    },
  ],

  ratings: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
