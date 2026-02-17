const express = require('express');
const router = express.Router();
const Save = require('../models/Save');

/* SAVE POST */
router.post('/:postId', async (req, res) => {
  const save = new Save({
    userId: req.body.userId,
    postId: req.params.postId
  });

  await save.save();
  res.json(save);
});

/* UNSAVE POST */
router.delete('/:postId', async (req, res) => {
  await Save.findOneAndDelete({
    userId: req.body.userId,
    postId: req.params.postId
  });

  res.json({ message: "Unsaved" });
});

module.exports = router;
