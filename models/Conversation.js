const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", conversationSchema);
