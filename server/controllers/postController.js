const Post = require("../models/Post");

exports.createPost = async (req, res) => {
    try {
        console.log("Create post route hit");
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
        const posts = await Post.find()
            .populate("user", "name college")
            .sort({ createdAt: -1 });

        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


