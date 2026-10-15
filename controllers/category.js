
const { User, Category } = require("../models");

const addCategory = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { _id } = req.user;

    // Check whether the category already exists
    const isCategoryExist = await Category.findOne({ title });

    if (isCategoryExist) {
      res.code = 400;
      throw new Error("Category already exists");
    }

    // Check whether the user exists
    const user = await User.findById(_id);

    if (!user) {
      res.code = 404;
      throw new Error("User not found");
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
