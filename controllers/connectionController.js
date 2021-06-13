const Connection = require("../models/Connection");

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
