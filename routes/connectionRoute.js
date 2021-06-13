const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const connectionController = require("../controllers/connectionController");

// For Logged-in users
router.use(authController.protect);

router.post("/follow/:id", connectionController.follow);
router.delete("/unfollow/:id", connectionController.unfollow);

module.exports = router;
