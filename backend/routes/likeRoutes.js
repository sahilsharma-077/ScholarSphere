const express = require('express');
const router = express.Router();
const Like = require('../models/Like');
const Notification = require('../models/Notification');
const Post = require('../models/Post');

/* LIKE POST */
router.post('/:postId', async (req, res) => {

  const like = new Like({
    userId: req.body.userId,
    postId: req.params.postId
  });

  await like.save();

  /* FIND POST OWNER */
  const post = await Post.findById(req.params.postId);
  const postOwnerId = post.userId;

  /* CREATE NOTIFICATION */
  const notification = await Notification.create({
    userId: postOwnerId,
    type: "like",
    message: "Someone liked your post"
  });

  /* GET IO SAFELY */
  const { io } = require('../server');

  io.emit("notification", {
    userId: notification.userId,
    message: notification.message
  });

  res.json(like);
});
module.exports = router;
