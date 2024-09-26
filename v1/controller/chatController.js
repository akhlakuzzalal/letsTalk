const {
  OK,
  ERROR,
  NO_CONTENT,
  BAD_REQUEST,
} = require("../../utils/responseHandler");
const {
  getAllChats,
  createChat,
  getChatByKey,
} = require("../service/chatService");

const createUserChat = async (req, res) => {
  const { participants } = req.body;
  if (!participants) return BAD_REQUEST(res, "Participants are required");
  const existChat = await getChatByKey({ participants });
  if (existChat) return OK(res, existChat, "Chat already exists");
  const newChat = await createChat({ participants });
  if (newChat) OK(res, newChat, "Chat created successfully");
  else ERROR(res, "Something went wrong");
};

const getUserAllChats = async (req, res) => {
  const { userId } = req.user;
  const filter = { participants: userId };
  const chats = await getAllChats(filter, req.query);
  if (chats) OK(res, chats, "All chats fetched successfully");
  else ERROR(res, "Something went wrong");
};

module.exports = { getUserAllChats, createUserChat };
