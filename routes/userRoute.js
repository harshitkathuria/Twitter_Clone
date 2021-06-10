const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
// const authController = require("../controllers/authController");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUser);

router.patch("/:id", userController.updateUser);

module.exports = router;
