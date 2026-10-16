const { signup, signin, verifyCode, verifyUser, forgotPasswordCode ,recoverPassword,changePassword,updateProfile} = require("./auth");
const { notFound } = require("./notFound");
const  {addCategory,updateCategory} = require('./category')
const authController = {
  signup,
  signin,
  verifyCode,
  verifyUser,
  forgotPasswordCode,
  recoverPassword,
  changePassword,
  updateProfile
};

const categoryController ={
  addCategory,updateCategory
}

module.exports = { authController, notFound ,categoryController};
