const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apiFeatures");

//get all products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 10;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .similar()
    .filter();

  let products = await apiFeature.query;

  let brands = [];
  let colours = [];
  let prices = [];

  products.forEach((item) => {
    if (brands.indexOf(item.brand) === -1) {
      brands.push(item.brand);
    }
  });
  products.forEach((item) => {
    if (colours.indexOf(item.colour) === -1) {
      colours.push(item.colour);
    }
  });

  let filteredProductsCount = products.length;

  products.forEach((item) => {
    if (prices.indexOf(item.discountedPrice) === -1) {
      prices.push(item.discountedPrice);
    }
  });

  apiFeature.pagination(resultPerPage);

  products = await apiFeature.query.clone();
  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
    brands,
    colours,
  });
});

//getProductDetails
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  let stockCount = product.stocks.reduce((acc, curr) => {
    return acc + curr.stock;
  }, 0);
  let similarProducts = await Product.find({
    productType: product.productType,
  }).limit(15);

  let differentColours = await Product.find({
    name: product.name,
  });

  differentColours = differentColours.filter(
    (item) => item._id.toString() !== product._id.toString()
  );
  similarProducts = similarProducts.filter(
    (item) => item._id.toString() !== product._id.toString()
  );

  res.status(200).json({
    success: true,
    product,
    stockCount,
    similarProducts,
    count: similarProducts.length,
    differentColours,
  });
});

//create product--admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
    numOfReviews: product.reviews.length,
    ratings: product.ratings,
  });
});
