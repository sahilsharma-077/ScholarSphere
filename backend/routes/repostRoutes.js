const express = require('express');
const router = express.Router();
const Repost = require('../models/Repost');
const Notification = require('../models/Notification');
const Post = require('../models/Post');


/* CREATE REPOST */
router.post('/:postId', async (req, res) => {
  try {

    const repost = new Repost({
      userId: req.body.userId,
      originalPostId: req.params.postId
    });

    await repost.save();

    // FIND ORIGINAL POST
    const post = await Post.findById(req.params.postId);

    // CREATE NOTIFICATION (avoid self notification)
    if (post && post.userId.toString() !== req.body.userId) {
      await Notification.create({
        userId: post.userId,
        senderId: req.body.userId,
        type: "repost",
        message: "Someone reposted your post"
      });
    }

    res.json(repost);

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

