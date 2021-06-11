const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

// Forgot Password
router.post("/forgotPassword", authController.forgotPassword);
// Reset Password
router.patch("/resetPassword/:token", authController.resetPassword);

router.use(authController.protect);

router.get("/", userController.getAllUsers);
router.patch("/updateMe", userController.updateMe);
router.delete("/deleteMe", userController.deleteMe);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser);

module.exports = router;
