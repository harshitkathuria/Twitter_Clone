const Tweet = require("../models/Tweet");
const Like = require("../models/Like");
const Comment = require("../models/Comment");
const Retweet = require("../models/Retweet");
const { cloudinaryLink } = require("../utils/upload");

// Get All Tweets
exports.getAllTweets = async (req, res) => {
  try {
    const tweets = await Tweet.find();
    res.status(200).json({
      status: "success",
      data: {
        tweets
      }
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      status: "fail",
      msg: err.message
    });
  }
};

// Get Tweet
exports.getTweet = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        tweet
      }
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      status: "fail",
      msg: err.message
    });
  }
};

// Create Tweet
exports.createTweet = async (req, res) => {
  try {
    const user = req.user;
    // Get Cloudinary Link for Media
    const mediaLink = await cloudinaryLink(req.file.path);
    let tweet = await Tweet.create({
      userId: user._id,
      text: req.body.text,
      media: mediaLink.url
    });
    tweet = await tweet.populate("userId", "name username").execPopulate();

    res.status(201).json({
      status: "success",
      data: {
        tweet
      }
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      status: "fail",
      msg: err.message
    });
  }
};

// Get Tweets Of User
exports.getTweetsOfUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const tweets = await Tweet.find({ userId })
      .populate("userId", "name username")
      .sort("-createdAt");
    res.status(200).json({
      status: "success",
      data: {
        length: tweets.length,
        tweets
      }
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      status: "fail",
      msg: err.message
    });
  }
};

// Update My Tweet
exports.updateMyTweet = async (req, res) => {
  try {
    const tweet = await Tweet.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      {
        new: true
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        tweet
      }
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ status: "error", msg: err.message });
  }
};

// Delete My Tweet
exports.deleteMyTweet = async (req, res) => {
  try {
    const tweetId = req.params.id;
    await Tweet.findOneAndDelete({ _id: tweetId, userId: req.user.id });
    await Like.deleteMany({ tweetId });
    await Comment.deleteMany({ tweetId });
    await Retweet.deleteMany({ tweetId });
    res
      .status(204)
      .json({ status: "success", msg: "Tweet successfully deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ status: "error", msg: err.message });
  }
};
