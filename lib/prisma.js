import { PrismaClient } from "@prisma/client";

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

// The `globalThis.prisma` variable ensures that the Prisma client instance is reused across hot reloads during development.  
// Without this, a new Prisma client instance would be created each time the application reloads, which could lead to connection issues.