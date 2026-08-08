const { User } = require("../models/user");
const { Product } = require("../models/product");
const { default: mongoose } = require("mongoose");

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
      return res.json({ wishlist });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ type: error.type, message: error.message });
  }
};
exports.addToWishlist = async function (req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.json({
        message: "User does not found",
      });
    }

    const product = await Product.findById(req.body.productId);

    if (!product) {
      return res
        .status(404)
        .json({ message: "could not add product.Product not found." });
    }
    const productAlreadyExist = user.wishlist.find((item) =>
      item.productId.equals(
        new mongoose.schema.Types.ObjectId(req.body.productId),
      ),
    );

    if (productAlreadyExist) {
      return (
        res.status(409),
        json({ message: "Product already exist in wishlist" })
      );
    }

    user.wishlist.push({
      productId: req.body.productId,
      productImage: product.image,
      productPrice: product.price,
      productName: product.name,
    });
    await user.save();
    response.status(200).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ type: error.type, message: error.message });
  }
};
exports.removeFromWishlist = async function (req, res) {
  try {
    const user = await User.findById(req.params.id);
    if(!user){
      return res.status(404).json({message:'user does not found'});

    }
    const index = user.wishlist.findIndex((item)=>
      item.productId.equals(new mongoose.Schema.Types.ObjectId(productId))
    );

    if(index == -1){
      return res.status(404).json({message:'Product not found in wishList'});
    }

    user.whishlist.splice(index,1);
    user.save();
    return res.status(204).end();


  } catch (error) {
    console.error(error);
    return res.status(500).json({ type: error.type, message: error.message });
  }
};
