
const express = require("express");
const router = express.Router();

const { categoryController } = require("../controllers");
const { addCategoryValidator } = require("../validators/category");
const { validate } = require("../validators/validate");
const isAuth = require("../middleware/isAuth");
const isAdmin = require("../middleware/isAdmin")
router.post(
  "/",
  isAuth,
  isAdmin,
  addCategoryValidator,
  validate,
  categoryController.addCategory
);

router.put("/:id",isAuth,isAdmin)

module.exports = router;
