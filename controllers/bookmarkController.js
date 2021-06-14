const Bookmark = require("../models/Bookmark");

exports.addBookmark = async (req, res) => {
  try {
    const userId = req.user.id,
      tweetId = req.params.id;

    if (await Bookmark.exists({ tweetId, userId })) {
      return res.status(400).json({
        status: "fail",
        msg: "You have already bookmarked this tweet"
      });
    }

    const bookmark = await Bookmark.create({
      tweetId,
      userId
    });

    res.status(200).json({
      status: "success",
      data: {
        bookmark
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      msg: err.message
    });
  }
};

exports.removeBookmark = async (req, res) => {
  try {
    const userId = req.user.id,
      tweetId = req.params.id;
    const bookmark = await Bookmark.findOneAndDelete({
      tweetId,
      userId
    });

    res.status(204).json({
      status: "success",
      msg: "Successfully removed bookmark",
      data: {
        bookmark
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      msg: err.message
    });
  }
};

exports.getAllBookmarks = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookmarks = await Bookmark.find({ userId });

    res.status(200).json({
      status: "success",
      data: {
        bookmarks
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      msg: err.message
    });
  }
};

exports.clearAllBookmarks = async (req, res) => {
  try {
    const userId = req.user.id;
    await Bookmark.deleteMany({ userId });

    res.status(204).json({
      status: "success",
      msg: "Successfully cleared all bookmarks"
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      msg: err.message
    });
  }
};
