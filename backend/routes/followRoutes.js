const express = require('express');
const router = express.Router();
const Follow = require('../models/Follow');
const Notification = require('../models/Notification');


/* FOLLOW USER */
router.post('/:userId', async (req, res) => {
  try {
    const followerId = req.body.followerId;
    const followingId = req.params.userId;

    const existing = await Follow.findOne({ followerId, followingId });
    if (existing) return res.status(400).json({ message: "Already following" });

    const follow = new Follow({ followerId, followingId });
    await follow.save();

    // CREATE NOTIFICATION
    await Notification.create({
      userId: followingId,
      type: "follow",
      message: "Someone started following you",
      senderId: followerId
    });

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

    // OPTIONAL: remove follow notification
    await Notification.findOneAndDelete({
      userId: followingId,
      senderId: followerId,
      type: "follow"
    });

    res.json({ message: "Unfollowed successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
