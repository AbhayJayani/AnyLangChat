import { getReceiverSocketId, io } from "../SocketIO/server.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { translateText } from "../utils/translate.js";

// Save only the original message and language
export const sendMessage = async (req, res) => {
  try {
    const { message, language = "en" } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, receiverId],
      });
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      originalMessage: message,
      originalLanguage: language,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await Promise.all([conversation.save(), newMessage.save()]);
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Always translate all messages to the requesting user's preferred language
export const getMessage = async (req, res) => {
  try {
    const { id: chatUser } = req.params;
    const userId = req.user._id;
    let conversation = await Conversation.findOne({
      members: { $all: [userId, chatUser] },
    }).populate("messages");
    if (!conversation) {
      return res.status(201).json([]);
    }
    const user = await User.findById(userId);
    const preferredLanguage = user?.preferredLanguage;

    // Translate all messages to user's preferred language
    const translatedMessages = await Promise.all(
      conversation.messages.map(async (msg) => {
        let translatedText = msg.originalMessage;
        if (msg.originalLanguage !== preferredLanguage) {
          translatedText = await translateText(
            msg.originalMessage,
            preferredLanguage,
            process.env.API_KEY
          );
        }
        return {
          ...msg.toObject(),
          message: translatedText,
          language: preferredLanguage,
        };
      })
    );
    res.status(201).json(translatedMessages);
  } catch (error) {
    console.log("Error in getMessage", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Optionally, translate all messages in all conversations for the user
export const getAllMessages = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    const preferredLanguage = user?.preferredLanguage;
    const conversations = await Conversation.find({ members: userId })
      .populate("messages")
      .sort({ updatedAt: -1 });
    if (!conversations) {
      return res.status(201).json([]);
    }
    // Flatten and translate all messages
    const messages = await Promise.all(
      conversations.flatMap((conv) =>
        conv.messages.map(async (msg) => {
          let translatedText = msg.originalMessage;
          if (msg.originalLanguage !== preferredLanguage) {
            translatedText = await translateText(
              msg.originalMessage,
              preferredLanguage,
              process.env.API_KEY
            );
          }
          return {
            ...msg.toObject(),
            message: translatedText,
            language: preferredLanguage,
          };
        })
      )
    );
    res.status(201).json(messages);
  } catch (error) {
    console.log("Error in getAllMessages", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
