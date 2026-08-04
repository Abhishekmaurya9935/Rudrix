import bcrypt from "bcrypt";
import { sign, type Secret, type SignOptions } from "jsonwebtoken";
import type { Request, Response } from "express";
import { prisma } from "../db/prisma";
import { env } from "../config/env";
import { blacklistToken, JwtUserPayload, AuthenticatedRequest } from "../middleware/auth";

function getBearerToken(req: Request) {
  const authHeader = req.headers.authorization;
  return authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
}

export async function loginAdmin(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  const admin = await prisma.adminUser.findUnique({ where: { email } });

  if (!admin) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  const passwordMatches = await bcrypt.compare(password, admin.passwordHash);

  if (!passwordMatches) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  const jwtOptions: SignOptions = {
    expiresIn: env.jwtExpiresIn as any,
  };

  const token = sign(
    {
      sub: admin.id,
      email: admin.email,
      role: "admin",
    } as JwtUserPayload,
    env.jwtSecret as Secret,
    jwtOptions,
  );

  return res.json({
    success: true,
    data: {
      token,
      user: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    },
  });
}

export async function logoutAdmin(req: AuthenticatedRequest, res: Response) {
  const token = getBearerToken(req);

  if (!token) {
    return res.status(400).json({ success: false, message: "Authorization token is required to logout" });
  }

  blacklistToken(token);
  return res.json({ success: true, message: "Logout successful" });
}

export async function getAdminProfile(req: AuthenticatedRequest, res: Response) {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  return res.json({
    success: true,
    data: {
      id: req.user.sub,
      email: req.user.email,
      role: req.user.role,
    },
  });
}
