const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User"
  },
  tweetId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Tweet"
  },
  text: {
    type: String,
    required: [true, "Comment should contain text"],
    maxlength: 280
  },
  media: {
    type: String
  }
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
