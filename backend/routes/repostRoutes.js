const express = require('express');
const router = express.Router();
const Repost = require('../models/Repost');

/* CREATE REPOST */
router.post('/:postId', async (req, res) => {
  const repost = new Repost({
    userId: req.body.userId,
    originalPostId: req.params.postId
  });

  await repost.save();
  res.json(repost);
});

module.exports = router;
