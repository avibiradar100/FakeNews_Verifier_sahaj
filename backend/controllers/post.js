const Post = require("../models/Post");
const User = require("../models/User");
const cloudinary = require("cloudinary");

exports.createPost = async (req, res) => {
  try {

    const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "posts",
    });

    const newPostData = {
      content: req.body.content,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      owner: req.user._id,
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

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({
        success: false,
        message: "post not found",
      });
    }

    if (post.owner.toString() !== req.user._id.toString()) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await cloudinary.v2.uploader.destroy(post.image.public_id);

    await post.remove();

    const user = await User.findById(req.user._id);

    const index = user.posts.indexOf(req.params.id);

    user.posts.splice(index, 1);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Post deleted ",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.commentOnPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    let commentIndex = -1;

    //checking if comment already exists
    post.comments.forEach((item, index) => {
      if (item.user.toString() === req.user._id.toString()) {
        commentIndex = index;
      }
    });

    if (commentIndex !== -1) {
      post.comments[commentIndex].comment = req.body.comment;

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Comment updated",
      });
    } else {
      post.comments.push({
        user: req.user._id,
        comment: req.body.comment,
      });

      await post.save();

      res.status(200).json({
        success: true,
        message: "Comment added",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    //chcking if owner wants to delete
    if (post.owner.toString() === req.user._id.toString()) {
      if (req.body.commentId === undefined) {
        return res.status(404).json({
          success: false,
          message: "Comment Id is required",
        });
      }

      post.comments.forEach((item, index) => {
        if (item._id.toString() === req.body.commentId.toString()) {
          return post.comments.splice(index, 1);
        }
      });

      await post.save();

      return res.status(200).json({
        success: true,
        message: "selected comment has deleted",
      });
    } 
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};