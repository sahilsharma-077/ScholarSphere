const express = require('express');
const router = express.Router();
const Share = require('../models/Share');

/* SHARE POST */
router.post('/:postId', async (req, res) => {
  const share = new Share({
    userId: req.body.userId,
    postId: req.params.postId
  });

  await share.save();
  res.json(share);
});

module.exports = router;
