//use of express validator for validating inputs
const validateEmail =require("./validateEmail")
const { check } = require("express-validator");
//express-validator provides a method called check \
const signupValidator = [
  check("name").notEmpty().withMessage("Name cannot be empty"),
  check("email")
    .isEmail()
    .withMessage("Invalid email")
    .notEmpty()
    .withMessage("Email should not be empty"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("THe password must be greater than 6 charaters")
    .notEmpty()
    .withMessage("the password field cant be empty"),
];

const signinValidator = [
  check("email")
    .isEmail()
    .withMessage("INvalid email")
    .notEmpty()
    .withMessage("The email field should not be empty"),
  check("password")
    .notEmpty()
    .withMessage("The password field must not be empty"),
];

const emailValidator = [
  check("email")
    .isEmail()
    .withMessage("Invalid email")
    .notEmpty()
    .withMessage("Email is required"),
];

const verifyUserValidate = [
  check("email")
    .isEmail()
    .withMessage("Invalid email")
    .notEmpty()
    .withMessage("Email is required"),

  check("code").notEmpty().withMessage("Code is required"),
];

const recoverPasswordValidator = [
  check("email")
    .isEmail()
    .withMessage("Invalid email")
    .notEmpty()
    .withMessage("Email is required"),
  check("code").notEmpty().withMessage("Code is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("The password must be greater than 6 characters")
    .notEmpty()
    .withMessage("the password field cant be empty"),
];

const changePasswordValidator = [
  check("oldPassword")
    .notEmpty()
    .withMessage("Old password is required"),

  check("newPassword")
    .notEmpty()
    .withMessage("New password is required"),
];

const updateProfileValidator = [
  check("email")
  .custom(async(email) =>{
    if(email){
const isValidEmail = validateEmail(email);

if(!isValidEmail){
  throw "Invalid Email";
}

    }
  })
]

module.exports = {
  signupValidator,
  signinValidator,
  emailValidator,
  verifyUserValidate,
  recoverPasswordValidator,
  changePasswordValidator ,
  updateProfileValidator
};
