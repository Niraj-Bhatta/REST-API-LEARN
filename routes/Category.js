
const { Category } = require("../models");

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const category = await Category.findByIdAndUpdate(
      id,
      { title, description },
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { updateCategory };
