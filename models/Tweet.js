const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: [true, "Tweet should be associated with an user"]
    },
    text: {
      type: String,
      required: [true, "Tweet should contain text"],
      maxlength: 260
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

const Tweet = mongoose.model("Tweet", tweetSchema);
module.exports = Tweet;
