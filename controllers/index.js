const { signup, signin, verifyCode } = require("./auth");
const { notFound } = require("./notFound");

const authController = {
  signup,
  signin,
  verifyCode,
};

module.exports = { authController, notFound };
