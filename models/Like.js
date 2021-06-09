const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User"
  },
  tweetId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Tweet"
  }
});

const Like = mongoose.model("Like", likeSchema);
module.exports = Like;
