const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const postController = require("../controllers/postController");

router.post("/", authMiddleware, postController.createPost);
router.get("/", postController.getPosts);

module.exports = router;
