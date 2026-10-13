const { signup, signin, verifyCode, verifyUser, forgotPasswordCode ,recoverPassword,changePassword} = require("./auth");
const { notFound } = require("./notFound");

const authController = {
  signup,
  signin,
  verifyCode,
  verifyUser,
  forgotPasswordCode,
  recoverPassword,
  changePassword
};

module.exports = { authController, notFound };
