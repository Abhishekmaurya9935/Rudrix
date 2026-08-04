import { Router } from "express";
import { getAdminProfile, loginAdmin, logoutAdmin } from "../controllers/admin-controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.post("/admin/login", loginAdmin);
router.post("/admin/logout", requireAuth, logoutAdmin);
router.get("/admin/me", requireAuth, getAdminProfile);

export default router;
