const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Chat should contain some text"]
    },
    sender: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: [true, "Message should have a sender"]
    },
    receiver: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: [true, "Message should have a receiver"]
    },
    seen: Boolean,
    room: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
