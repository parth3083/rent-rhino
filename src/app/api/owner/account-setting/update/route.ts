import { getOwner } from "@/lib/getOwner";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const OWNER_DETAILS_VALIDATION = z.object({
  contactNumber: z
    .string()
    .min(10)
    .max(10)
    .refine(
      (val) => /^\d+$/.test(val),
      "Aadhar number must contain only digits"
    ),
  adharNumber: z
    .string()
    .min(12)
    .max(12)
    .refine(
      (val) => /^\d+$/.test(val),
      "Aadhar number must contain only digits"
    ),
  adharImage: z.string().optional(),
});

export async function PUT(request: NextRequest) {
  try {
    const owner = await getOwner();
    const prisma = new PrismaClient();
    if (!owner) {
      return NextResponse.json({ message: "Owner not found" }, { status: 401 });
    }
    const body = await request.json();
    const validation = OWNER_DETAILS_VALIDATION.safeParse(body);
    if (!validation.success) {
      console.log(validation.error);
      return NextResponse.json(
        { message: "Invalid data", validation },
        { status: 400 }
      );
    }
    const { contactNumber, adharNumber, adharImage } = validation.data;

    const properties = await prisma.property.count({
      where: {
        ownerId: owner?.id,
      },
    });

    await prisma.owner.update({
      where: {
        id: owner?.id,
      },
      data: {
        contactNumber: Number(contactNumber),
        adharNumber: Number(adharNumber),
        adharImage,
        numberOfProperties: properties,
      },
    });
    return NextResponse.json(
      {
        message: "Owner data updated successfully",
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error",
        error,
      },
      { status: 500 }
    );
  }
}
