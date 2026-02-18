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

    const post = await Post.findById(req.params.postId);

    // avoid self-notification
    if (post && post.userId.toString() !== req.body.userId) {

      const notification = await Notification.create({
        userId: post.userId,
        senderId: req.body.userId,
        type: "comment",
        message: "Someone commented on your post"
      });

      /* SOCKET EMIT */
      const { io } = require('../server');

      io.emit("notification", {
        userId: notification.userId,
        message: notification.message
      });
    }

    res.status(200).json(comment);

  } catch (err) {
    res.status(500).json(err);
  }
});

/* GET COMMENTS FOR POST */
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
