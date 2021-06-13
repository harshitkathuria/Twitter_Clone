const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const LikeController = require("../controllers/LikeController");
const connectionController = require("../controllers/connectionController");

// Forgot Password
router.post("/forgotPassword", authController.forgotPassword);
// Reset Password
router.patch("/resetPassword/:token", authController.resetPassword);

router.use(authController.protect);

router.get("/", userController.getAllUsers);
router.patch("/updateMe", userController.updateMe);
router.delete("/deleteMe", userController.deleteMe);

router.get("/like", LikeController.getMyLikedTweets);

router.get("/followers/:id", connectionController.getFollowers);
router.get("/following/:id", connectionController.getFollowing);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser);

module.exports = router;
