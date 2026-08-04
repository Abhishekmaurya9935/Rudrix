import { Router } from "express";
import {
  createPortfolioItem,
  deletePortfolioItemBySlug,
  getPortfolioItemBySlug,
  getPortfolioItems,
  updatePortfolioItemBySlug,
} from "../controllers/portfolio-controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/portfolio", getPortfolioItems);
router.get("/portfolio/:slug", getPortfolioItemBySlug);
router.post("/portfolio", requireAuth, createPortfolioItem);
router.put("/portfolio/:slug", requireAuth, updatePortfolioItemBySlug);
router.delete("/portfolio/:slug", requireAuth, deletePortfolioItemBySlug);

export default router;
