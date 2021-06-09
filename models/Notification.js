const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Notification should contain some text"]
    },
    reciever: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Notification should have a reciever"]
    },
    seen: Boolean
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
