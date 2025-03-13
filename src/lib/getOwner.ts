import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

export async function getOwner() {
  try {
    const prisma = new PrismaClient();
    const auth = await currentUser();
    if (!auth) {
      throw new Error("Not Authenticated");
    }
    const owner = await prisma.owner.findUnique({
      where: {
        externalId: auth.id,
      },
    });
    if (!owner) {
      throw new Error("Owner not found");
    }
    return owner;
  } catch (error) {
    console.log(error);
    throw new Error("Authentication Error");
  }
}
