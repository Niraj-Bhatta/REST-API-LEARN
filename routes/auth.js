const express = require("express");
const router = express.Router();
const { authController } = require("../controllers");
const {
  signupValidator,
  signinValidator,
  emailValidator,
  verifyUserValidate,
  recoverPasswordValidator
} = require("../validators/auth");
const { validate } = require("../validators/validate");

router.post("/signup", signupValidator, validate, authController.signup);

router.post("/signin", signinValidator, validate, authController.signin);

router.post(
  "/send-verification-code",
  emailValidator,
  validate,
  authController.verifyCode,
);

router.post(
  "/verify-user",
  verifyUserValidate,
  validate,
  authController.verifyUser,
);

router.post(
  "/recover-password",
  recoverPasswordValidator,
  validate,
  authController.recoverPassword,
);

router.post(
  "/forgot-password-code",
  emailValidator,
  validate,
  authController.forgotPasswordCode,
);

router.post("/change-password",validate,authController.changePassword)
module.exports = router;
