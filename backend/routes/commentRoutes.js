const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const Notification = require('../models/Notification');
const Post = require('../models/Post');


/* ADD COMMENT */
router.post('/:postId', async (req, res) => {
  try {
    const comment = new Comment({
      userId: req.body.userId,
      postId: req.params.postId,
      text: req.body.text
    });

    await comment.save();

    // FIND POST OWNER
    const post = await Post.findById(req.params.postId);

    // CREATE NOTIFICATION
    if (post && post.userId.toString() !== req.body.userId) {
      await Notification.create({
        userId: post.userId,
        senderId: req.body.userId,
        type: "comment",
        message: "Someone commented on your post"
      });
    }

    res.status(200).json(comment);

  } catch (err) {
    res.status(500).json(err);
  }
});


/* GET COMMENTS FOR A POST */
router.get('/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
