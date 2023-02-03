const ErrorHandler = require("../utils/errorHandler");
const Wishlist = require("../models/wishlistModel");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

exports.createWishlist = catchAsyncErrors(async (req, res, next) => {
  const { wishItems } = req.body;
  const user = req.user._id;
  let wishlist;
  const Finduser = await Wishlist.find({ user: user });
  if (Finduser.length !== 0) {
    const product = await Wishlist.find({ user: user });
    function f(data) {
      return data.product.toString() === wishItems.product.toString();
    }
    if (product[0].wishItems.filter(f).length > 0) {
      return next(new ErrorHandler("Product all ready added in Wishlist", 400));
    } else {
      await Wishlist.updateOne(
        { user: user },
        {
          $push: {
            wishItems: [wishItems],
          },
        }
      );
      wishlist = await Wishlist.find({ user: user });
    }
  } else {
    wishlist = await Wishlist.create({ user, wishItems });
  }

  res.status(201).json({
    success: true,
    wishlist,
  });
});

//get wish list
exports.getWishlist = catchAsyncErrors(async (req, res, next) => {
  const user = req.user._id;
  const wishlist = await Wishlist.findOne({ user: user }).populate(
    "wishItems.product"
  );

  res.status(200).json({
    success: true,
    wishlist,
  });
});

//deletewish Item
exports.deleteWish = catchAsyncErrors(async (req, res, next) => {
  const { product } = req.body;
  const user = req.user._id;

  await Wishlist.updateOne(
    { user: user },
    {
      $pull: {
        wishItems: { product: product },
      },
    }
  );

  res.status(200).json({
    success: true,
  });
});
