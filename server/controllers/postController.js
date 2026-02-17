const Post = require("../models/Post");

exports.createPost = async (req, res) => {
    try {
        
        const post = await Post.create({
            user: req.user.id,
            content: req.body.content
        });

        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;

        const posts = await Post.find()
            .populate("user", "name college")
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Like Post
exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post.likes.includes(req.user.id)) {
            post.likes.push(req.user.id);
        }

        await post.save();
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Comment Post
exports.commentPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        post.comments.push({
            user: req.user.id,
            text: req.body.text
        });

        await post.save();
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Share Post (Repost)
exports.sharePost = async (req, res) => {
    try {
        const newShare = await Post.create({
            user: req.user.id,
            sharedPost: req.params.id,
            content: req.body.content || ""
        });

        res.json(newShare);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        post.content = req.body.content || post.content;
        await post.save();

        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await post.deleteOne();
        res.json({ message: "Post deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


