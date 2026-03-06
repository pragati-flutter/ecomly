const { validationResult } = require("express-validator");

exports.register = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
  }
};
exports.login = async function (req, res) {};
exports.forgotPassword = async function (req, res) {};

exports.verifyPasswordResetOtp = async function (req, res) {};

exports.resetPassword = async function (req, res) {};
