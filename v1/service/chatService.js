const Chat = require("../model/chatModel");

const createChat = async (chat) => {
  try {
    const newChat = (await Chat.create({ ...chat })).toObject();
    return newChat;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllChats = async (
  filter,
  { page = 1, limit = 10, order = { updatedAt: -1 } }
) => {
  try {
    const chats = await Chat.find(filter)
      .sort(order)
      .skip(page - 1)
      .limit(limit)
      .populate([
        {
          path: "Participants",
          select: "userId name email",
        },
        {
          path: "LastMessages",
          select: "content sender",
          populate: { path: "Sender", select: "userId name email" },
        },
      ])
      .lean();
    const totalCount = await Chat.countDocuments(filter);
    return { totalCount, count: chats.length, rows: chats };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getChatByKey = async (key) => {
  try {
    return await Chat.findOne({ ...key })
      .populate([
        {
          path: "Participants",
          select: "userId name email",
        },
        {
          path: "LastMessages",
          select: "content sender",
          populate: { path: "Sender", select: "userId name email" },
        },
      ])
      .lean();
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateChat = async (key, updateBody) => {
  try {
    return await Chat.findOneAndUpdate(
      { ...key },
      { ...updateBody },
      { new: true }
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteChat = async (key) => {
  try {
    return await Chat.findOneAndDelete({ ...key });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createChat,
  getAllChats,
  getChatByKey,
  updateChat,
  deleteChat,
};
