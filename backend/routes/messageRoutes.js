const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

/* SEND MESSAGE */
router.post('/', async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* GET MESSAGES BETWEEN USERS */
router.get('/:user1/:user2', async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { senderId: req.params.user1, receiverId: req.params.user2 },
        { senderId: req.params.user2, receiverId: req.params.user1 }
      ]
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
