import express from "express";
import { getPostById, createPost } from "../queries/postQueries";

const router = express.Router();

// Route to get post by ID
router.get("/api/post/:postId", async (req, res) => {
  const post_id = req.params.postId;

  try {
    const post = await getPostById({ post_id });
    res.status(200).json(post);
  } catch (error) {
    console.error("Error getting post:", error);
    res.status(500);
  }
});

// Route to create a post
router.post("/api/post", async (req, res) => {
  const { post_id, user_id, club_id, content, images, created_at } = req.body;

  const postInfo = {
    post_id,
    user_id,
    club_id,
    content,
    images,
    created_at,
  };

  try {
    const newPost = await createPost(postInfo);
    if (newPost) res.status(200).json(newPost);
    else res.status(500).json();
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500);
  }
});

export default router;
