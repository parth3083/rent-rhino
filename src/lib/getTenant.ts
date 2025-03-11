import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

export async function getTenant() {
  try {
    const prisma = new PrismaClient();
    const auth = await currentUser();
    if (!auth) {
      throw new Error("Not Authenticated");
    }
    const tenant = await prisma.tenant.findUnique({
      where: {
        externalId: auth.id,
      },
    });
    if (!tenant) {
      throw new Error("Tenant not found");
    }
    return tenant;
  } catch (error) {
    console.error(error);
    throw new Error("Authentication Error");
  }
}
