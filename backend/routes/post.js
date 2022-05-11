const express = require("express");
const { createPost, upvotePost,downvotePost, deletePost, commentOnPost, deleteComment } = require("../controllers/post");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.route("/post/upload").post(isAuthenticated, createPost);
router.route("/post/upvote/:id").get(isAuthenticated, upvotePost);
router.route("/post/downvote/:id").get(isAuthenticated,downvotePost)
router.route("/post/:id").delete(isAuthenticated, deletePost);
router
  .route("/post/comment/:id")
  .put(isAuthenticated, commentOnPost)
  .delete(isAuthenticated, deleteComment);

module.exports = router;