import { getOwner } from "@/lib/getOwner";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const owner = await getOwner();
    if (!owner) {
      return NextResponse.json(
        {
          message: "Owner not found",
        },
        { status: 401 }
      );
    }
    const prisma = new PrismaClient();

    const properties_details = await prisma.property.findMany({
      where: {
        ownerId: owner.id,
        },
        select: {
            id: true,
            name: true,
            address: true,
            images: true,
            area: true,
            city: true,
            state: true,
            zipCode: true,
            propertyStatus: true,
          },
    });

    const properties = JSON.parse(
      JSON.stringify(properties_details, (_, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    );
    return NextResponse.json({ success: true, properties }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        messgae: "Internal server erorr",
        error,
      },
      { status: 500 }
    );
  }
}
