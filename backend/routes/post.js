const express = require("express");
const { createPost, upvotePost,downvotePost } = require("../controllers/post");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.route("/post/upload").post(isAuthenticated, createPost);
router.route("/post/upvote/:id").get(isAuthenticated, upvotePost);
router.route("/post/downvote/:id").get(isAuthenticated,downvotePost)

module.exports = router;