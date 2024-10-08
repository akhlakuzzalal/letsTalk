const express = require("express");
const { registerUser, loginUser } = require("../controller/userController");
const verifyToken = require("../../middleware/auth");
const route = express.Router();

route.post("/register", registerUser);
route.post("/login", loginUser);

module.exports = route;
