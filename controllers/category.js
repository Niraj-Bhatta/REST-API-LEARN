
const { User, Category } = require("../models");

const addCategory = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { _id } = req.user;

    // Check whether the category already exists
    const isCategoryExist = await Category.findOne({ title });

    if (isCategoryExist) {
      return res.status(400).json({
        code: 400,
        status: false,
        message: "Category already exists",
      });
    }

    // Check whether the user exists
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({
        code: 404,
        status: false,
        message: "User not found",
      });
    }

    // Create a new category
    const newCategory = new Category({
      title,
      description,
      updatedBy: _id,
    });

    await newCategory.save();

    return res.status(201).json({
      code: 201,
      status: true,
      message: "Category added successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { addCategory };
