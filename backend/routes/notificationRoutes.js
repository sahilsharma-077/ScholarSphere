const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

/* GET USER NOTIFICATIONS */
router.get('/:userId', async (req, res) => {
  const notifications = await Notification.find({
    userId: req.params.userId
  }).sort({ createdAt: -1 });

  res.json(notifications);
});

module.exports = router;
