const mongoose = require("mongoose");
const { generateId } = require("../../utils/commonUtils");

const chatSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
      unique: true,
      default: () => {
        return generateId();
      },
    },
    participants: [{ type: String }],
    name: { type: String }, // Optional, useful for group chats
    isGroup: { type: Boolean, default: false }, // Indicates if it's a group chat
    lastMessage: { type: String }, // Last message sent in the chat
  },
  {
    timestamps: true,
    versionKey: false,
    virtuals: true,
  }
);

chatSchema.virtual("Participants", {
  ref: "User",
  localField: "participants",
  foreignField: "userId",
  justOne: false,
});

chatSchema.virtual("LastMessages", {
  ref: "Message",
  localField: "lastMessage",
  foreignField: "messageId",
  justOne: true,
});

module.exports = mongoose.model("Chat", chatSchema);
