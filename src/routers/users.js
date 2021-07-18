const express = require("express");
const router = express();

const userController = require("../controllers/user");
router.post("/login", userController.login);
router.post("/register", userController.register);
module.exports = router;
