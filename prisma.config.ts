import path from "node:path";
import { defineConfig, env } from "prisma/config";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local"), override: true });

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL ?? env("DATABASE_URL"),
  },
});
