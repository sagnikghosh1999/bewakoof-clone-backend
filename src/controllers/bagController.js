const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Bag = require("../models/bagModel");
const ErrorHandler = require("../utils/errorHandler");

//add to bag
exports.addToBag = catchAsyncErrors(async (req, res, next) => {
  const { bagItems } = req.body;
  const user = req.user._id;
  const Finduser = await Bag.find({ user: user });
  if (Finduser.length !== 0) {
    const product = await Bag.find({ user: user });
    function f(data) {
      return data.product == bagItems.product;
    }
    if (product[0].bagItems.filter(f).length > 0) {
      return next(new ErrorHandler("Product all ready added in Bag", 400));
    } else {
      await Bag.updateOne(
        { user: user },
        {
          $push: {
            bagItems: [bagItems],
          },
        }
      );
    }
  } else {
    await Bag.create({ user, bagItems });
  }

  res.status(201).json({
    success: true,
  });
});

//get bag list data
exports.getBag = catchAsyncErrors(async (req, res, next) => {
  const user = req.user._id;
  const bag = await Bag.findOne({ user: user }).populate("bagItems.product");

  res.status(200).json({
    success: true,
    bag,
  });
});

//update bag quantity
exports.updateQuantityBag = catchAsyncErrors(async (req, res, next) => {
  const { id, quantity } = req.body;
  const bag = await Bag.updateOne(
    { "bagItems._id": id },
    {
      $set: { "bagItems.$.quantity": quantity },
    }
  );

  res.status(200).json({
    success: true,
  });
});

//update size of bag
exports.updateSizeBag = catchAsyncErrors(async (req, res, next) => {
  const { id, size } = req.body;
  const bag = await Bag.updateOne(
    { "bagItems._id": id },
    {
      $set: { "bagItems.$.size": size },
    }
  );

  res.status(200).json({
    success: true,
  });
});

//delete bagItem
exports.deleteBag = catchAsyncErrors(async (req, res, next) => {
  const user = req.user._id;
  const { product } = req.body;

  const users = await Bag.updateOne(
    { user: user },
    {
      $pull: {
        bagItems: { product: product },
      },
    }
  );

  res.status(200).json({
    success: true,
  });
});
