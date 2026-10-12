const { signup, signin, verifyCode, verifyUser } = require("./auth");
const { notFound } = require("./notFound");

const authController = {
  signup,
  signin,
  verifyCode,
  verifyUser
};

module.exports = { authController, notFound };
