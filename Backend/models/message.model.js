import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    originalMessage: { type: String, required: true },
    originalLanguage: { type: String, default: "en" },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
