const express = require('express');
const router = express.Router();
const Like = require('../models/Like');
const Notification = require('../models/Notification');


/* LIKE POST */
router.post('/:postId', async (req, res) => {
  const like = new Like({
    userId: req.body.userId,
    postId: req.params.postId
  });

  await like.save();
  res.json(like);
  await Notification.create({
  userId: postOwnerId,     // receiver (post author)
  type: "like",
  message: "Someone liked your post"
});

});

/* UNLIKE POST */
router.delete('/:postId', async (req, res) => {
  await Like.findOneAndDelete({
    userId: req.body.userId,
    postId: req.params.postId
  });

  res.json({ message: "Unliked" });
  await Notification.create({
  userId: postOwnerId,     // receiver (post author)
  type: "unlike",
  message: "Someone unliked your post"
});

});

module.exports = router;
