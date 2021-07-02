const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true
    },
    tweetId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Tweet",
      required: true
    },
    text: {
      type: String,
      required: [true, "Comment should contain text"],
      maxlength: 280
    },
    media: {
      type: String
    },
    likesCount: {
      type: Number,
      default: 0
    },
    commentsCount: {
      type: Number,
      default: 0
    },
    retweetsCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
