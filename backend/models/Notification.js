const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,   // receiver
  type: String,                             // like, comment, follow, repost
  message: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);
