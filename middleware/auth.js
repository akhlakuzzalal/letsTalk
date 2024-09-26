const jwt = require("jsonwebtoken");
const { FORBIDDEN, UNAUTHORIZED } = require("../utils/responseHandler");

const verifyToken = (req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth && auth.split(" ")[1];
  if (!token) {
    return UNAUTHORIZED(res, "Please provide a token");
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return FORBIDDEN(res, "Invalid token");
    }
    req.user = user;
    next();
  });
};

module.exports = verifyToken;
