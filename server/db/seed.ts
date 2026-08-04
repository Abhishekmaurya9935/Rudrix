import bcrypt from "bcrypt";
import { prisma } from "./prisma";
import { env } from "../config/env";

export async function createAdminUserIfMissing() {
  if (!env.adminEmail || !env.adminPassword) {
    console.warn("ADMIN_EMAIL and ADMIN_PASSWORD are required to create the initial admin user.");
    return;
  }

  const existingAdmin = await prisma.adminUser.findUnique({ where: { email: env.adminEmail } });

  if (existingAdmin) {
    const passwordMatches = await bcrypt.compare(env.adminPassword, existingAdmin.passwordHash);

    if (!passwordMatches) {
      const passwordHash = await bcrypt.hash(env.adminPassword, 10);
      await prisma.adminUser.update({
        where: { id: existingAdmin.id },
        data: {
          name: env.adminName || existingAdmin.name,
          passwordHash,
        },
      });
      console.log(`Updated admin user password for: ${env.adminEmail}`);
    }

    return;
  }

  const passwordHash = await bcrypt.hash(env.adminPassword, 10);

  await prisma.adminUser.create({
    data: {
      email: env.adminEmail,
      name: env.adminName || "Administrator",
      passwordHash,
    },
  });

  console.log(`Created initial admin user: ${env.adminEmail}`);
}
