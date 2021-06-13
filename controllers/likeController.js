const Like = require("../models/Like");
const Tweet = require("../models/Tweet");

// Like Tweet
exports.likeTweet = async (req, res) => {
  try {
    const userId = req.user.id,
      tweetId = req.params.id;

    // Checking if the user has already liked the tweet
    if (await Like.exists({ tweetId, userId })) {
      return res.status(400).json({
        status: "fail",
        msg: "You have already liked this tweet."
      });
    }

    const like = await Like.create({ tweetId, userId });

    // Increment likesCount of the tweet by 1
    const tweet = await Tweet.findByIdAndUpdate(
      tweetId,
      {
        $inc: { likesCount: 1 }
      },
      { new: true }
    );

    res.status(201).json({
      status: "success",
      data: {
        like,
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

// UnLike Tweet
exports.unLikeTweet = async (req, res) => {
  try {
    const userId = req.user.id,
      tweetId = req.params.id;

    const like = await Like.findOneAndDelete({ userId, tweetId });
    if (!like) {
      return res.status(200).json({
        status: "fail",
        msg: "You have already unliked the tweet"
      });
    }
    const tweet = await Tweet.findByIdAndUpdate(
      tweetId,
      {
        $inc: { likesCount: -1 }
      },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      msg: "Successfully unliked the tweet",
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

// Get User's Liked Tweets
exports.getLikedTweetsOfUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const likedTweets = (await Like.find({ userId }).populate("tweetId")).map(
      data => data.tweetId
    );

    res.status(200).json({
      status: "success",
      data: {
        likedTweets
      }
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      msg: err.message
    });
  }
};

// Get Users who have liked the tweet
exports.getLikedUsersOfTweet = async (req, res) => {
  try {
    const likedUsers = await Like.find({ tweetId: req.params.id })
      .populate("userId", "name username")
      .select("userId");

    res.status(200).json({
      status: "success",
      data: {
        likedUsers
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      msg: err.message
    });
  }
};
