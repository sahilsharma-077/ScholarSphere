const express = require('express');
const router = express.Router();

const Follow = require('../models/Follow');
const Post = require('../models/Post');
const Like = require('../models/Like');
const Save = require('../models/Save');
const Comment = require('../models/Comment');
const Share = require('../models/Share');
const Repost = require('../models/Repost');


router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const following = await Follow.find({ followerId: userId });
    const followingIds = following.map(f => f.followingId.toString());

    const posts = await Post.find();

    const scoredPosts = await Promise.all(posts.map(async (post) => {

      const likeCount = await Like.countDocuments({ postId: post._id });
      const saveCount = await Save.countDocuments({ postId: post._id });
      const commentCount = await Comment.countDocuments({ postId: post._id });
      const shareCount = await Share.countDocuments({ postId: post._id });
      const repostCount = await Repost.countDocuments({ originalPostId: post._id });

      const isFollowing = followingIds.includes(post.userId.toString());

      const score =
        (likeCount * 2) +
        (saveCount * 3) +
        (commentCount * 2) +
        (shareCount * 2) +
        (repostCount * 4) +
        (isFollowing ? 5 : 0);

      return { post, score };
    }));

    scoredPosts.sort((a, b) => b.score - a.score);

    res.json(scoredPosts.map(p => p.post));

  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
