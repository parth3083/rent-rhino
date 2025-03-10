import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    const auth = await currentUser();
    const { passedValue } = await request.json();
    if (!auth) {
      return NextResponse.json({ isSynced: false }, { status: 401 });
    }
    const prisma = new PrismaClient();
    if (passedValue === "OWNER") {
      const owner = await prisma.owner.findFirst({
        where: {
          externalId: auth.id,
        },
      });
      if (!owner) {
        await prisma.owner.create({
          data: {
            externalId: auth.id,
            email: auth.emailAddresses[0]?.emailAddress,
            name: auth.fullName,
          },
        });
        return NextResponse.json({ isSynced: true }, { status: 201 });
      }
      return NextResponse.json({ isSynced: true }, { status: 201 });
    } else if (passedValue === "TENANT") {
      const tenant = await prisma.tenant.findFirst({
        where: {
          externalId: auth.id,
        },
      });
      if (!tenant) {
        await prisma.tenant.create({
          data: {
            externalId: auth.id,
            email: auth.emailAddresses[0]?.emailAddress,
            name: auth.fullName,
          },
        });
        return NextResponse.json({ isSynced: true }, { status: 201 });
      }
      return NextResponse.json({ isSynced: true }, { status: 201 });
    }
    return NextResponse.json({ isSynced: false }, { status: 401 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
