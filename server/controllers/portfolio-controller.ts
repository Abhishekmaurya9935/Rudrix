import type { Request, Response } from "express";
import {
  addPortfolioItem,
  deletePortfolioItem,
  portfolioItems,
  updatePortfolioItem,
  type PortfolioItem,
} from "../data/site-content";

export function getPortfolioItems(_req: Request, res: Response) {
  res.json({ success: true, data: portfolioItems });
}

export function getPortfolioItemBySlug(req: Request, res: Response) {
  const item = portfolioItems.find((entry) => entry.id === req.params.slug);

  if (!item) {
    return res.status(404).json({ success: false, message: "Portfolio item not found" });
  }

  res.json({ success: true, data: item });
}

export function createPortfolioItem(req: Request, res: Response) {
  const { id, title, category, description, image, link, metrics } = req.body;

  if (!id || !title || !category || !description || !image || !link || !metrics) {
    return res.status(400).json({ success: false, message: "Missing required portfolio fields" });
  }

  try {
    const created = addPortfolioItem({ id, title, category, description, image, link, metrics });
    return res.status(201).json({ success: true, data: created });
  } catch (error) {
    return res.status(400).json({ success: false, message: (error as Error).message });
  }
}

export function updatePortfolioItemBySlug(req: Request, res: Response) {
  const slug = req.params.slug as string;
  const updates = req.body as Partial<PortfolioItem>;

  try {
    const updated = updatePortfolioItem(slug, updates);
    return res.json({ success: true, data: updated });
  } catch (error) {
    return res.status(404).json({ success: false, message: (error as Error).message });
  }
}

export function deletePortfolioItemBySlug(req: Request, res: Response) {
  const slug = req.params.slug as string;

  try {
    const deleted = deletePortfolioItem(slug);
    return res.json({ success: true, data: deleted });
  } catch (error) {
    return res.status(404).json({ success: false, message: (error as Error).message });
  }
}
