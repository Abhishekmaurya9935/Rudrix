import dotenv from "dotenv";

dotenv.config();
dotenv.config({ path: ".env.local", override: true });

export const env = {
  port: Number(process.env.PORT || 5000),
  nodeEnv: process.env.NODE_ENV || "development",
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",
  jwtSecret: process.env.JWT_SECRET || "change-this-secret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1h",
  adminEmail: process.env.ADMIN_EMAIL || "admin@example.com",
  adminPassword: process.env.ADMIN_PASSWORD || "admin123",
  adminName: process.env.ADMIN_NAME || "Administrator",
};
