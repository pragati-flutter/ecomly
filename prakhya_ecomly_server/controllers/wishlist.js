const { User } = require("../models/user");
const { Product } = require("../models/product");

exports.getUserWishlist = async function (req, res) {
  try {
    const user = await User.findById(req.params.id);
    const wishlist = [];

    for (const wishlistProduct of user.wishlist) {
      const product = Product.findById(wishlistProduct.productId);

      if (!product) {
        wishlist.push({
          ...wishlistProduct,
          productExists: false,
          productOutOfStock: false,
        });
      } else if (product.countInStock < 1) {
        wishlist.push({
          ...wishlistProduct,
          productExists: true,
          productOutOfStock: true,
        });
      } else {
        whishlist.push({
          productId: product._id,
          productImage: product.image,
          productPrice: product.price,
          productName: product.name,
          productExist: true,
          productOutOfStock: false,
        });
      }
      return res.json({wishlist});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ type: error.type, message: error.message });
  }
};
exports.addToWishlist = async function (req, res) {
  try {
  } catch (error) {
    console.error(error);
    return res.status(500).json({ type: error.type, message: error.message });
  }
};
exports.removeFromWishlist = async function (req, res) {
  try {
  } catch (error) {
    console.error(error);
    return res.status(500).json({ type: error.type, message: error.message });
  }
};
