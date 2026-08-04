import { Router } from "express";
import {
  createBlogPost,
  deleteBlogPost,
  getBlogPostById,
  getBlogPosts,
  updateBlogPost,
} from "../controllers/blog-controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/blog", getBlogPosts);
router.get("/blog/:id", getBlogPostById);
router.post("/blog", requireAuth, createBlogPost);
router.put("/blog/:id", requireAuth, updateBlogPost);
router.delete("/blog/:id", requireAuth, deleteBlogPost);

export default router;
