const express = require('express');
const router = express.Router();

const Follow = require('../models/Follow');
const Post = require('../models/Post');

/* GET PERSONALIZED FEED */
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Step 1: find users the current user follows
    const following = await Follow.find({ followerId: userId });

    // Step 2: extract IDs
    const followingIds = following.map(f => f.followingId);

    // Step 3: fetch posts of those users
    const posts = await Post.find({
      userId: { $in: followingIds }
    }).sort({ createdAt: -1 });

    res.json(posts);

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
