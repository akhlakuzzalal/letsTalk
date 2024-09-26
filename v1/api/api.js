const express = require("express");
const route = express.Router();
const verifyToken = require("../../middleware/auth");
const userApi = require("./userApi");
const chatApi = require("./chatApi");
const messageApi = require("./messageApi");

route.use("/user", userApi);
route.use("/chat", verifyToken, chatApi);
route.use("/message", verifyToken, messageApi);

module.exports = route;
