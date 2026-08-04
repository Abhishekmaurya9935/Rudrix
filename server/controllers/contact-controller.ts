import type { Request, Response } from "express";
import { prisma } from "../db/prisma";

export async function getContactMessages(_req: Request, res: Response) {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  res.json({ success: true, data: messages });
}

export async function getContactMessageById(req: Request, res: Response) {
  const message = await prisma.contactMessage.findUnique({
    where: { id: Number(req.params.id) },
  });

  if (!message) {
    return res.status(404).json({ success: false, message: "Contact message not found" });
  }

  res.json({ success: true, data: message });
}

export async function submitContactMessage(req: Request, res: Response) {
  const { name, email, company, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Name, email, and message are required" });
  }

  const saved = await prisma.contactMessage.create({
    data: { name, email, company: company || "", message },
  });

  res.status(201).json({ success: true, data: saved });
}

export async function updateContactMessage(req: Request, res: Response) {
  const messageId = Number(req.params.id);
  const { name, email, company, message } = req.body;

  const updated = await prisma.contactMessage.update({
    where: { id: messageId },
    data: {
      name: name ?? undefined,
      email: email ?? undefined,
      company: company ?? undefined,
      message: message ?? undefined,
    },
  });

  res.json({ success: true, data: updated });
}

export async function deleteContactMessage(req: Request, res: Response) {
  const messageId = Number(req.params.id);

  await prisma.contactMessage.delete({ where: { id: messageId } });

  res.json({ success: true, data: { id: messageId } });
}
