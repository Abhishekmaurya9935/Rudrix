import type { Request, Response } from "express";
import { addService, deleteService, services, updateService } from "../data/site-content";

export function getServices(_req: Request, res: Response) {
  res.json({ success: true, data: services });
}

export function getServiceBySlug(req: Request, res: Response) {
  const service = services.find((item) => item.id === req.params.slug);

  if (!service) {
    return res.status(404).json({ success: false, message: "Service not found" });
  }

  res.json({ success: true, data: service });
}

export function createService(req: Request, res: Response) {
  const { id, title, description, icon, features } = req.body;

  if (!id || !title || !description || !icon || !Array.isArray(features)) {
    return res.status(400).json({ success: false, message: "Missing required service fields" });
  }

  try {
    const created = addService({ id, title, description, icon, features });
    return res.status(201).json({ success: true, data: created });
  } catch (error) {
    return res.status(400).json({ success: false, message: (error as Error).message });
  }
}

export function updateServiceBySlug(req: Request, res: Response) {
  const slug = req.params.slug as string;
  const updates = req.body;

  try {
    const updated = updateService(slug, updates);
    return res.json({ success: true, data: updated });
  } catch (error) {
    return res.status(404).json({ success: false, message: (error as Error).message });
  }
}

export function deleteServiceBySlug(req: Request, res: Response) {
  const slug = req.params.slug as string;

  try {
    const deleted = deleteService(slug);
    return res.json({ success: true, data: deleted });
  } catch (error) {
    return res.status(404).json({ success: false, message: (error as Error).message });
  }
}
