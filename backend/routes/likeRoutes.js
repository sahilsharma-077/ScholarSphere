const express = require('express');
const router = express.Router();
const Like = require('../models/Like');

/* LIKE POST */
router.post('/:postId', async (req, res) => {
  const like = new Like({
    userId: req.body.userId,
    postId: req.params.postId
  });

  await like.save();
  res.json(like);
});

/* UNLIKE POST */
router.delete('/:postId', async (req, res) => {
  await Like.findOneAndDelete({
    userId: req.body.userId,
    postId: req.params.postId
  });

  res.json({ message: "Unliked" });
});

module.exports = router;
