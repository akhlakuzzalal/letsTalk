const mongoose = require("mongoose");
const { generateId } = require("../../utils/commonUtils");

const messageSchema = new mongoose.Schema(
  {
    messageId: {
      type: String,
      unique: true,
      default: () => {
        return generateId();
      },
    },
    sender: { type: String, required: true },
    chatId: { type: String, required: true }, // Chat ID
    content: { type: String, required: true },
    messageType: {
      type: String,
      enum: ["text", "image", "file"],
      default: "text",
    },
  },
  {
    timestamps: true,
    versionKey: false,
    virtuals: true,
  }
);

messageSchema.virtual("Sender", {
  ref: "User",
  localField: "sender",
  foreignField: "userId",
  justOne: true,
});

messageSchema.virtual("Chat", {
  ref: "Chat",
  localField: "chatId",
  foreignField: "chatId",
  justOne: true,
});

module.exports = mongoose.model("Message", messageSchema);
