const Tweet = require("../models/Tweet");

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

// Create Tweet
exports.createTweet = async (req, res) => {
  try {
    const user = req.user;
    const tweet = await Tweet.create({
      userId: user._id,
      text: req.body.text
    });

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
exports.getMyTweet = async (req, res) => {
  try {
    const user = req.user;
    const tweets = await Tweet.find({ userId: user._id });
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
    await Tweet.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res
      .status(204)
      .json({ status: "success", msg: "Tweet successfully deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ status: "error", msg: err.message });
  }
};
