//use of express validator for validating inputs
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

module.exports ={signupValidator};
