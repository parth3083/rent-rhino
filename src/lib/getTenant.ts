import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import {  NextResponse } from "next/server";

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
    return NextResponse.json(
      { message: "Authentiaction Error", error },
      { status: 500 }
    );
    return null;
  }
}
