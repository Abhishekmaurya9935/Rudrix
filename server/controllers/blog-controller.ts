import type { Request, Response } from "express";
import { prisma } from "../db/prisma";

export async function getBlogPosts(_req: Request, res: Response) {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  res.json({ success: true, data: posts });
}

export async function getBlogPostById(req: Request, res: Response) {
  const post = await prisma.post.findUnique({
    where: { id: Number(req.params.id) },
  });

  if (!post) {
    return res.status(404).json({ success: false, message: "Blog post not found" });
  }

  res.json({ success: true, data: post });
}

export async function createBlogPost(req: Request, res: Response) {
  const { title, excerpt, content, category, readTime } = req.body;

  if (!title || !excerpt || !content || !category || !readTime) {
    return res.status(400).json({ success: false, message: "Missing required blog fields" });
  }

  const post = await prisma.post.create({
    data: {
      title,
      excerpt,
      content,
      category,
      readTime,
    },
  });

  res.status(201).json({ success: true, data: post });
}

export async function updateBlogPost(req: Request, res: Response) {
  const postId = Number(req.params.id);
  const { title, excerpt, content, category, readTime } = req.body;

  const updated = await prisma.post.update({
    where: { id: postId },
    data: {
      title: title ?? undefined,
      excerpt: excerpt ?? undefined,
      content: content ?? undefined,
      category: category ?? undefined,
      readTime: readTime ?? undefined,
    },
  });

  res.json({ success: true, data: updated });
}

export async function deleteBlogPost(req: Request, res: Response) {
  const postId = Number(req.params.id);

  await prisma.post.delete({ where: { id: postId } });
  res.json({ success: true, data: { id: postId } });
}
