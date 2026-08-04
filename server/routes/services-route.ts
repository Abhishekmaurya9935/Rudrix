import { Router } from "express";
import {
  createService,
  deleteServiceBySlug,
  getServiceBySlug,
  getServices,
  updateServiceBySlug,
} from "../controllers/services-controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/services", getServices);
router.get("/services/:slug", getServiceBySlug);
router.post("/services", requireAuth, createService);
router.put("/services/:slug", requireAuth, updateServiceBySlug);
router.delete("/services/:slug", requireAuth, deleteServiceBySlug);

export default router;
