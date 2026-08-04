import { Router } from "express";
import { prisma } from "../db/prisma";

const router = Router();

router.get("/posts", async (_req, res) => {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  res.json(posts);
});

export default router;
