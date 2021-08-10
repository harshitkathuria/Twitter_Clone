const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const LikeController = require("../controllers/likeController");
const connectionController = require("../controllers/connectionController");
const commentController = require("../controllers/commentController");
const tweetController = require("../controllers/tweetController");
const bookmarkController = require("../controllers/bookmarkController");
const retweetController = require("../controllers/retweetController");
const homeExploreController = require("../controllers/homeExploreController");

// Forgot Password
router.post("/forgotPassword", authController.forgotPassword);
// Reset Password
router.patch("/resetPassword/:token", authController.resetPassword);

router.use(authController.protect);

router.get("/", userController.getAllUsers);
router.patch(
  "/updateMe",
  userController.uploadUserImages,
  userController.resizeUserImages,
  userController.updateMe
);
router.delete("/deleteMe", userController.deleteMe);

// Related To Home And Explore Section
router.get("/home", homeExploreController.getHomeContent);
router.get("/explore", homeExploreController.getExploreContent);

// Related To Tweet
router.get("/tweets/:id", tweetController.getTweetsOfUser);

// Related To Like
router.get("/like/:id", LikeController.getLikedTweetsOfUser);

// Related To Comment
router.get("/comments/:id", commentController.getCommentsOfUser);

// Related To connection
router.get("/followers/:id", connectionController.getFollowers);
router.get("/following/:id", connectionController.getFollowing);

// Related To Bookmark
router.get("/bookmark", bookmarkController.getAllBookmarks);
router.delete("/bookmark", bookmarkController.clearAllBookmarks);

// Related To Retweet
router.get("/retweet/:id", retweetController.getRetweetsOfUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser);

module.exports = router;
