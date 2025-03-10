import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const auth = await currentUser();
    if (!auth) {
      return NextResponse.json({ isSynced: false }, { status: 401 });
    }
    const prisma = new PrismaClient();
    const owner = await prisma.owner.findFirst({
      where: {
        externalId: auth.id,
      },
    });
    if (owner) {
      return NextResponse.json(
        { isSynced: true, role: "OWNER" },
        { status: 201 }
      );
    } else {
      const tenant = await prisma.tenant.findFirst({
        where: {
          externalId: auth.id,
        },
      });
      if (tenant) {
        return NextResponse.json(
          { isSynced: true, role: "TENANT" },
          { status: 201 }
        );
      }
      if (!tenant) {
        return NextResponse.json({ isSynced: false }, { status: 404 });
      }
    }
    return NextResponse.json({ isSynced: false }, { status: 404 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error,
      },
      { status: 500 }
    );
  }
}
