import { Router } from "express";
import {
  deleteContactMessage,
  getContactMessageById,
  getContactMessages,
  submitContactMessage,
  updateContactMessage,
} from "../controllers/contact-controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/contact", requireAuth, getContactMessages);
router.get("/contact/:id", requireAuth, getContactMessageById);
router.post("/contact", submitContactMessage);
router.put("/contact/:id", requireAuth, updateContactMessage);
router.delete("/contact/:id", requireAuth, deleteContactMessage);

export default router;
