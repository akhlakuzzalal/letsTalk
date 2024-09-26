const { createUser, getUserByKey } = require("../service/userService");
const generateToken = require("../../config/generateToken");
const bcrypt = require("bcryptjs");
const {
  BAD_REQUEST,
  OK,
  ERROR,
  FORBIDDEN,
  NOT_FOUND,
} = require("../../utils/responseHandler");

const registerUser = async (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return BAD_REQUEST(res, "Please provide all fields");
  }
  const existUser = await getUserByKey({ email });
  if (existUser) {
    return BAD_REQUEST(res, "User already exists");
  }
  const user = await createUser({ email, name, password });
  const token = generateToken(user);
  user.token = token;
  if (user) OK(res, user, "User created successfully");
  else ERROR(res, "Something went wrong");
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return BAD_REQUEST(res, "Please provide all fields");
  }
  const user = await getUserByKey({ email });
  if (!user) {
    return NOT_FOUND(res, "User not found");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return FORBIDDEN(res, "Invalid credentials");
  }
  const token = generateToken(user);
  user.token = token;
  if (user) OK(res, user, "User logged in successfully");
  else ERROR(res, "Something went wrong");
};

module.exports = {
  registerUser,
  loginUser,
};
