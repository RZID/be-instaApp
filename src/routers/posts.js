const express = require("express");
const router = express();

const { login } = require("../middlewares/auth");
const { post } = require("../helpers/multer");

const postController = require("../controllers/post");
router.get("/getuserwithpost/:id", login, postController.getUserWithPost);
router.get("/posts", login, postController.getRandomPost);
router.post("/addpost", login, post, postController.addPost);
module.exports = router;
