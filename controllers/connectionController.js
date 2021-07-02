const Connection = require("../models/Connection");
const Conversation = require("../models/Conversation");

exports.follow = async (req, res) => {
  try {
    const followed = req.params.id,
      following = req.user.id;
    if (await Connection.exists({ followed, following }))
      return res.status(400).json({
        status: "fail",
        msg: "You are already following this person"
      });

    const connection = await Connection.create({
      followed,
      following
    });

    if (
      !(await Conversation.exists({
        members: { $all: [String(req.user._id), req.params.id] }
      }))
    )
      await Conversation.create({
        members: [String(req.user._id), req.params.id]
      });

    res.status(200).json({
      status: "success",
      data: {
        connection
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      msg: err.message
    });
  }
};

exports.unfollow = async (req, res) => {
  try {
    const followed = req.params.id,
      following = req.user.id;

    const connection = await Connection.findOneAndDelete({
      followed,
      following
    });
    if (!connection)
      return res.status(400).json({
        status: "fail",
        msg: "You have already unfollowed this user"
      });
    res.status(200).json({
      status: "success",
      msg: "Succesfully Unfollowed",
      data: {
        connection
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      msg: err.message
    });
  }
};

// Get Followers of an User
exports.getFollowers = async (req, res) => {
  try {
    const followers = (
      await Connection.find({ followed: req.params.id }).populate("following")
    ).map(data => data.following);

    res.status(200).json({
      status: "success",
      data: {
        followers
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      msg: err.message
    });
  }
};

// Get Followings of an User
exports.getFollowing = async (req, res) => {
  try {
    const followings = (
      await Connection.find({
        following: req.params.id
      }).populate("followed")
    ).map(data => data.followed);

    res.status(200).json({
      status: "success",
      data: {
        followings
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      msg: err.message
    });
  }
};
