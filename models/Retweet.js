const mongoose = require("mongoose");

const retweetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User"
  },
  tweetId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Tweet"
  }
});

const Retweet = mongoose.model("Retweet", retweetSchema);
module.exports = Retweet;
