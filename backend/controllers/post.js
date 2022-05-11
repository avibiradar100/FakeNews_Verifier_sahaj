const Post = require("../models/Post");
const User = require("../models/User");

exports.createPost = async (req, res) => {
  try {
    const newPostData = {
      content: req.body.content,
      owner: req.user._id,
      comments:req.body.comments
    };

    const post = await Post.create(newPostData);

    const user = await User.findById(req.user._id);

    user.posts.unshift(post._id);

    await user.save();

    res.status(201).json({
      success: true,
      post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.upvotePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.upVote.includes(req.user._id)) {
      const index = post.upVote.indexOf(req.user._id);
      post.upVote.splice(index, 1);
      await post.save();
  
      return res.status(200).json({
        success: true,
        message: "Post Upvote Removed",
      });
    }

    if (post.downVote.includes(req.user._id)) {
      const index = post.downVote.indexOf(req.user._id);
      post.downVote.splice(index, 1);
    }
    post.upVote.push(req.user._id);
    await post.save();
    res.status(200).json({
      success: true,
      message: "Post Upvoted",
    });
    }catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.downvotePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.downVote.includes(req.user._id)) {
      const index = post.downVote.indexOf(req.user._id);
      post.downVote.splice(index, 1);
      await post.save();
  
      return res.status(200).json({
        success: true,
        message: "Post downvote Removed",
      });
    }

    if (post.upVote.includes(req.user._id)) {
      const index = post.upVote.indexOf(req.user._id);
      post.upVote.splice(index, 1);
    }
    post.downVote.push(req.user._id);
    await post.save();
    res.status(200).json({
      success: true,
      message: "Post downVoted",
    });
    }catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};