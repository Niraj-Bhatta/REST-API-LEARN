
const jwt = require("jsonwebtoken");
const { secret_key } = require("../config/keys");

const isAuth = (req, res, next) => {
  try {
    const authorization = req.headers.authorization || "";
    const [scheme, token] = authorization.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({
        code: 401,
        status: false,
        message: "A valid Bearer token is required",
      });
    }

    const payload = jwt.verify(token, secret_key);

    req.user = {
      _id: payload._id,
      name: payload.name,
      email: payload.email,
      role: payload.role,
    };

    return next();
  } catch (error) {
    if (error.name === "JsonWebTokenError" ||
        error.name === "TokenExpiredError") {
      return res.status(401).json({
        code: 401,
        status: false,
        message: "Invalid or expired token",
      });
    }

    return next(error);
  }
};

module.exports = isAuth;
