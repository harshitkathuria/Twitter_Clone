const express = require("express");
const router = express.Router();

const tweetController = require("../controllers/tweetController");
const authController = require("../controllers/authController");

// For Logged-in users
router.use(authController.protect);

router
  .route("/")
  .get(tweetController.getAllTweets)
  .post(tweetController.createTweet);

router.get("/user/:id", tweetController.getMyTweet);

router
  .route("/:id")
  .patch(tweetController.updateMyTweet)
  .delete(tweetController.deleteMyTweet);

module.exports = router;
