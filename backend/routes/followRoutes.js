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

    /* CREATE NOTIFICATION */
    const notification = await Notification.create({
      userId: followingId,
      type: "follow",
      message: "Someone started following you",
      senderId: followerId
    });

    /* GET SOCKET SAFELY */
    const { io } = require('../server');

    io.emit("notification", {
      userId: notification.userId,
      message: notification.message
    });

    res.json({ message: "Followed successfully" });

  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
