const User = require("../models/user");
const Order = require("../models/order");
const Token = require("../models/token");
const OrderItem = require("../models/order_item");
const CartProduct = require("..models/cart_product");


exports.getUserCount = async function (req, res) {
  try {
    const userCount = await User.countDocuments();
    if (!userCount) {
      return res.status(500).json({ message: "could not count user" });
    }
    return res.json({ userCount });
  } catch (error) {
    return res.status(500).json({ type: error.name, message: error.message });
  }
};

exports.deleteUser = async function (req, res) {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: error.message });
    }
    const orders = await Order.find({ user: userId });
    const orderItemsIds = orders.flatMap((order) => order.orderItems);

    await Order.deleteMany({ user: userId });
    await OrderItem.deleteMany({ _id: { $in: orderItemsIds } });
    await CartProduct.deleteMany({ _id: { $in: user.cart } });
    await User.findByIdAndUpdate(userId, { $pull: { cart: { $exists: true } } });
    await Token.deleteOne({ userId: userId });
    await User.deleteOne({ _id: userId });

    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ type: error.name, message: error.message });
  }
};
