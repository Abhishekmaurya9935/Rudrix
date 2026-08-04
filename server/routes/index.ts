import { Router } from "express";
import { getHealth } from "../controllers/health-controller";
import adminRoute from "./admin-route";
import blogRoute from "./blog-route";
import contactRoute from "./contact-route";
import portfolioRoute from "./portfolio-route";
import postsRoute from "./posts-route";
import servicesRoute from "./services-route";

const router = Router();

router.get("/health", getHealth);
router.use(adminRoute);
router.use(blogRoute);
router.use(contactRoute);
router.use(portfolioRoute);
router.use(postsRoute);
router.use(servicesRoute);

export default router;
