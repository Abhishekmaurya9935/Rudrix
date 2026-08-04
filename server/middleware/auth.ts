import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

const blacklistedTokens = new Set<string>();

export interface JwtUserPayload {
  sub: number;
  email: string;
  role: "admin";
  iat?: number;
  exp?: number;
}

export interface AuthenticatedRequest extends Request {
  user?: JwtUserPayload;
}

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Authorization header missing or invalid" });
  }

  const token = authHeader.slice(7);

  if (blacklistedTokens.has(token)) {
    return res.status(401).json({ success: false, message: "Token has been revoked" });
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret);

    if (typeof payload === "string" || typeof payload.sub !== "number" || typeof payload.email !== "string" || payload.role !== "admin") {
      return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }

    req.user = {
      sub: payload.sub,
      email: payload.email,
      role: payload.role,
      iat: payload.iat,
      exp: payload.exp,
    } satisfies JwtUserPayload;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
}

export function blacklistToken(token: string) {
  blacklistedTokens.add(token);
}
