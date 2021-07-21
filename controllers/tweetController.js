const Tweet = require("../models/Tweet");
const Like = require("../models/Like");
const Comment = require("../models/Comment");
const Retweet = require("../models/Retweet");
const sharp = require("sharp");
const multer = require("multer");

//image stored in buffer
const multerStorage = multer.memoryStorage();

// Multer filter
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadTweetImage = upload.single("media");

//Resize user photo
exports.resizeTweetImage = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.media = `tweet-media-${req.user.id}-${Date.now()}.jpeg`;
      await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat("jpeg")
        //90 % quality
        .jpeg({ quality: 90 })
        .toFile(`./client/src/assets/tweets/${req.body.media}`);
    }
    next();
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ status: "error", msg: err.message });
  }
};

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
    let tweet = await Tweet.create({
      userId: user._id,
      text: req.body.text,
      media: req.body.media
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
