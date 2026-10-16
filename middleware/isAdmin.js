
const isAdmin = (req, res, next) => {
  try {
    if (
      req.user &&
      (req.user.role === 1 || req.user.role === 2)
    ) {
      return next();
    }

    return res.status(403).json({
      code: 403,
      status: false,
      message: "Permission denied",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = isAdmin;
