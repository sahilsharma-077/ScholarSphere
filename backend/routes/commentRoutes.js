const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

/* ADD COMMENT */
router.post('/:postId', async (req, res) => {
  try {
    const comment = new Comment({
      userId: req.body.userId,
      postId: req.params.postId,
      text: req.body.text
    });

    await comment.save();
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
