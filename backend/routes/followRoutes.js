const express = require('express');
const router = express.Router();
const Follow = require('../models/Follow');

/* FOLLOW USER */
router.post('/:userId', async (req, res) => {
  try {
    const followerId = req.body.followerId;
    const followingId = req.params.userId;

    const existing = await Follow.findOne({ followerId, followingId });
    if (existing) return res.status(400).json({ message: "Already following" });

    const follow = new Follow({ followerId, followingId });
    await follow.save();

    res.json({ message: "Followed successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* UNFOLLOW USER */
router.delete('/:userId', async (req, res) => {
  try {
    const followerId = req.body.followerId;
    const followingId = req.params.userId;

    await Follow.findOneAndDelete({ followerId, followingId });

    res.json({ message: "Unfollowed successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* GET FOLLOWERS */
router.get('/:userId/followers', async (req, res) => {
  try {
    const followers = await Follow.find({ followingId: req.params.userId });
    res.json(followers);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* GET FOLLOWING */
router.get('/:userId/following', async (req, res) => {
  try {
    const following = await Follow.find({ followerId: req.params.userId });
    res.json(following);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
