const { BAD_REQUEST, OK, ERROR } = require("../../utils/responseHandler");
const { getAllMessages, createMessage } = require("../service/messageService");

const getMessages = async (req, res) => {
  const { chatId } = req.query;
  if (!chatId) {
    return BAD_REQUEST(res, "Chat id is required");
  }
  const filter = {};
  if (chatId) {
    filter.chatId = chatId;
  }
  const messages = await getAllMessages(filter, req.query);
  if (messages) {
    return OK(res, messages, "All messages fetched successfully");
  }
  return ERROR(res, "Something went wrong");
};

const sendMessage = async (req, res) => {
  const { user } = req;
  const { chatId, content } = req.body;
  if (!chatId || !content) {
    return BAD_REQUEST(res, "Chat id and content are required");
  }
  const body = {
    sender: user.userId,
    chatId,
    content,
  };
  const newMessage = await createMessage(body);
  if (newMessage) {
    return OK(res, newMessage, "Message sent successfully");
  }
  return ERROR(res, "Something went wrong");
};

module.exports = { getMessages, sendMessage };
