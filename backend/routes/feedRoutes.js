const express = require('express');
const router = express.Router();

const Follow = require('../models/Follow');
const Post = require('../models/Post');

router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    /* STEP 1: Get following list */
    const following = await Follow.find({ followerId: userId });
    const followingIds = following.map(f => f.followingId);

    /* STEP 2: Posts from followed users */
    const followingPosts = await Post.find({
      userId: { $in: followingIds }
    }).sort({ createdAt: -1 });

    /* STEP 3: Explore posts (exclude followed users AND self) */
    const explorePosts = await Post.find({
      userId: { $nin: [...followingIds, userId] }
    })
      .sort({ createdAt: -1 })
      .limit(10);

    /* STEP 4: Combine results */
    const finalFeed = [...followingPosts, ...explorePosts];

    res.json(finalFeed);

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
