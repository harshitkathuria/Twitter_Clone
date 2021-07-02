const Tweet = require("../models/Tweet");
const Comment = require("../models/Comment");

// Create Comment
exports.createComment = async (req, res) => {
  try {
    const tweetId = req.params.id,
      userId = req.user.id,
      text = req.body.text;
    let comment = await Comment.create({ tweetId, userId, text });
    const tweet = await Tweet.findByIdAndUpdate(
      tweetId,
      {
        $inc: { commentsCount: 1 }
      },
      { new: true }
    );

    comment = await comment
      .populate({
        path: "tweetId",
        populate: {
          path: "userId",
          select: "name username"
        }
      })
      .populate("userId", "name username")
      .execPopulate();

    res.status(200).json({
      status: "success",
      data: {
        comment,
        tweet
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      msg: err.message
    });
  }
};

// Delete Comment
exports.deleteComment = async (req, res) => {
  try {
    const tweetId = req.params.id,
      userId = req.user.id;
    const comment = await Comment.findOneAndDelete({ tweetId, userId });
    const tweet = await Tweet.findByIdAndUpdate(
      tweetId,
      { $inc: { commentsCount: -1 } },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      data: {
        tweet,
        comment
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      msg: err.message
    });
  }
};

// Get Comments Of Tweet
exports.getCommentsOfTweet = async (req, res) => {
  try {
    const tweetId = req.params.id,
      userId = req.user.id;
    const comments = await Comment.find({ tweetId, userId })
      .populate("userId", "name username")
      .select("userId text");

    res.status(200).json({
      status: "success",
      data: {
        comments
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      msg: err.message
    });
  }
};

// Get Comments Of User
exports.getCommentsOfUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const comments = await Comment.find({ userId })
      .populate("tweetId")
      .select("text tweetId");

    res.status(200).json({
      status: "success",
      data: {
        comments
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      msg: err.message
    });
  }
};
