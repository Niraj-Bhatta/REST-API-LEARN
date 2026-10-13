const { signup, signin, verifyCode, verifyUser, forgotPasswordCode ,recoverPassword} = require("./auth");
const { notFound } = require("./notFound");

const authController = {
  signup,
  signin,
  verifyCode,
  verifyUser,
  forgotPasswordCode,
  recoverPassword
};

module.exports = { authController, notFound };
