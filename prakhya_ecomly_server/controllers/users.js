const { Types } = require("mongoose");
const { User } = require("../models/user");

exports.getUsers = async (_, res) => {
  try {
    const users = await User.find().select("name email id isAdmin");

    if (!users) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ users });
  } catch (error) {
    return res.status(500).json({
      type: error.name,
      message: error.message,
    });
  }  
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "-passwordHash -resetPasswordOtp -resetPasswordOtpExpires -cart",
    );

    if (!user) {
      return res.json({ message: "user not found" });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({
      type: error.name,
      message: error.message,
    });
  }
};  

exports.updateUser = async (req, res) => {
    console.log("come here");
  try {
    const { name, email, phone } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, phone },
      { new: true },
    );
    if (!user) {
      return res.status(404).json({ message: "user not found" });

    }
    user.passwordHash = undefined;
    user.cart=undefined;
    return res.json( user );
  } catch (error) {
    return res.status(500).json({ type: error.name, message: error.message });
  }
};
