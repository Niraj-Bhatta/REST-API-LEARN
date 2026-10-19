const { signup, signin, verifyCode, verifyUser, forgotPasswordCode ,recoverPassword,changePassword,updateProfile} = require("./auth");
const { notFound } = require("./notFound");
const  {addCategory,updateCategory,deleteCategory,getCategories ,getCategory} = require('./category')
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
  addCategory,updateCategory,deleteCategory ,getCategories,getCategory
}

module.exports = { authController, notFound ,categoryController};
