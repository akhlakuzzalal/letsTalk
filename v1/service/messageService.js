const Message = require("../model/messageModel");

const createMessage = async (message) => {
  try {
    const newMessage = (await Message.create({ ...message })).toObject();
    return newMessage;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllMessages = async (
  filter,
  { page = 1, limit = 10, order = { updatedAt: -1 } }
) => {
  try {
    const messages = await Message.find(filter)
      .sort(order)
      .skip(page - 1)
      .limit(limit)
      .populate([
        {
          path: "Sender",
          select: "name email -_id",
        },
      ])
      .lean();
    const totalCount = await Message.countDocuments(filter);
    return { totalCount, count: messages.length, rows: messages };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getMessageByKey = async (key) => {
  try {
    return await Message.findOne({ ...key }).lean();
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateMessage = async (key, updateBody) => {
  try {
    return await Message.findOneAndUpdate(
      { ...key },
      { ...updateBody },
      { new: true }
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteMessage = async (key) => {
  try {
    return await Message.findOneAndDelete({ ...key });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createMessage,
  getAllMessages,
  getMessageByKey,
  updateMessage,
  deleteMessage,
};
