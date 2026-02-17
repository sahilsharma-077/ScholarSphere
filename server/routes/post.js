const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const postController = require("../controllers/postController");

router.post("/", authMiddleware, postController.createPost);
router.get("/", postController.getPosts);

router.put("/like/:id", authMiddleware, postController.likePost);
router.post("/comment/:id", authMiddleware, postController.commentPost);
router.post("/share/:id", authMiddleware, postController.sharePost);

router.put("/:id", authMiddleware, postController.updatePost);
router.delete("/:id", authMiddleware, postController.deletePost);

module.exports = router;
