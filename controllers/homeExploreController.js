const Connection = require("../models/Connection");
const Tweet = require("../models/Tweet");
const Retweet = require("../models/Retweet");
const User = require("../models/User");
const Comment = require("../models/Comment");

exports.getHomeContent = async (req, res) => {
  try {
    let followings = await Connection.find({ following: req.user.id });
    let result = [];

    // Get other user's tweets and retweets
    for (let i = 0; i < followings.length; i++) {
      const tweetArr = await Tweet.find({
        userId: followings[i].followed
      }).populate("userId", "name username");
      const retweetArr = await Retweet.find({
        userId: followings[i].followed
      })
        .populate({
          path: "tweetId",
          populate: {
            path: "userId",
            select: "name username"
          }
        })
        .populate("userId", "name username");
      const commentsArr = await Comment.find({
        userId: followings[i].followed
      })
        .populate("tweetId")
        .populate("userId", "name username");
      result = result.concat(tweetArr, retweetArr, commentsArr);
    }
    // Get logged in user's tweets and retweets
    result = result.concat(
      await Tweet.find({ userId: req.user.id }).populate(
        "userId",
        "name username"
      )
    );
    result = result.concat(
      await Retweet.find({ userId: req.user.id })
        .populate({
          path: "tweetId",
          populate: {
            path: "userId",
            select: "name username"
          }
        })
        .populate("userId", "name username")
    );
    result = result.concat(
      await Comment.find({ userId: req.user.id })
        .populate({
          path: "tweetId",
          populate: {
            path: "userId",
            select: "name username"
          }
        })
        .populate("userId", "name username")
    );

    // Sort all tweets according to the date in descending order
    result.sort(function (tweet1, tweet2) {
      return new Date(tweet2.createdAt) - new Date(tweet1.createdAt);
    });

    res.status(200).json({
      status: "success",
      data: {
        result
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      msg: err.message
    });
  }
};

exports.getExploreContent = async (req, res) => {
  try {
    const suggestions = await this.getFollowSuggestion(req.user.id);
    res.status(200).json({
      status: "success",
      data: {
        suggestions
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      msg: err.message
    });
  }
};

exports.getFollowSuggestion = async id => {
  const followings = await Connection.find({ following: id }).select(
    "followed"
  );
  let followingsArr = Array.from(followings, following => following.followed);
  followingsArr.push(id);

  // Get User's which are not in the followings of the user.
  const users = await User.find({ _id: { $nin: followingsArr } });
  return users;
};
