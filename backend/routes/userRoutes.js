const express = require('express');
const router = express.Router();
const Follow = require('../models/Follow');
const User = require('../models/User');

/* SUGGESTED USERS */
router.get('/suggested/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    /* users current user follows */
    const following = await Follow.find({ followerId: userId });
    const followingIds = following.map(f => f.followingId.toString());

    /* users followed by those people (mutual network) */
    const mutualFollows = await Follow.find({
      followerId: { $in: followingIds }
    });

    const suggestedIds = mutualFollows
      .map(f => f.followingId.toString())
      .filter(id => !followingIds.includes(id) && id !== userId);

    const suggestedUsers = await User.find({
      _id: { $in: suggestedIds }
    }).limit(10);

    res.json(suggestedUsers);

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
