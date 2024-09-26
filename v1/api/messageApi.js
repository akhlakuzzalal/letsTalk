const express = require("express");
const { getMessages, sendMessage } = require("../controller/messageController");
const route = express.Router();

route.get("/", getMessages);
route.post("/send", sendMessage);

module.exports = route;
