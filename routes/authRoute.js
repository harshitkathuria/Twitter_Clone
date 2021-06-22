const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.get("/", authController.protect, authController.getUserFromToken);
router.post("/signup", authController.signup);
router.post("/login", authController.login);

module.exports = router;
