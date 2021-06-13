const express = require("express");
const router = express.Router();

const tweetController = require("../controllers/tweetController");
const authController = require("../controllers/authController");
const likeController = require("../controllers/likeController");
const commentController = require("../controllers/commentController");
const bookmarkController = require("../controllers/bookmarkController");

// For Logged-in users
router.use(authController.protect);

router
  .route("/")
  .get(tweetController.getAllTweets)
  .post(tweetController.createTweet);

// Related to Like
router.get("/like/users/:id", likeController.getLikedUsersOfTweet);
router.post("/like/:id", likeController.likeTweet);
router.post("/unlike/:id", likeController.unLikeTweet);

// Related To Comment
router.get("/comments/:id", commentController.getCommentsOfTweet);
router.post("/comment/:id", commentController.createComment);
router.delete("/comment/remove/:id", commentController.deleteComment);

// Related To Bookmark
router.post("/bookmark/:id", bookmarkController.addBookmark);
router.delete("/bookmark/:id", bookmarkController.removeBookmark);

router
  .route("/:id")
  .get(tweetController.getTweet)
  .patch(tweetController.updateMyTweet)
  .delete(tweetController.deleteMyTweet);

module.exports = router;
