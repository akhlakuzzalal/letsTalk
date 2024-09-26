const express = require("express");
const {
  getUserAllChats,
  createUserChat,
} = require("../controller/chatController");
const route = express.Router();

route.get("/", getUserAllChats);
route.post("/create", createUserChat);

module.exports = route;
