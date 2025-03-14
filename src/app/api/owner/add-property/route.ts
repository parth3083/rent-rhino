import { getOwner } from "@/lib/getOwner";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

enum PROPERTY_STATUS {
  EMPTY = "EMPTY",
  RENTED = "RENTED",
}

const PROPERTY_DETAILS_VALIDATION = z.object({
  name: z.string(),
  address: z.string(),
  area: z.string(),
  city: z.string(),
  state: z.string(),
  pinCode: z
    .string()
    .refine(
      (val) => /^\d+$/.test(val),
      "Aadhar number must contain only digits"
    ),
  images: z.array(z.string()).optional(),
  personLimit: z
    .string()
    .refine(
      (val) => /^\d+$/.test(val),
      "Aadhar number must contain only digits"
    ),
  propertyStatus: z.nativeEnum(PROPERTY_STATUS),
  rentAmount: z
    .string()
    .refine(
      (val) => /^\d+$/.test(val),
      "Aadhar number must contain only digits"
    ),
  depositAmount: z
    .string()
    .refine(
      (val) => /^\d+$/.test(val),
      "Aadhar number must contain only digits"
    ),
});
export async function POST(request: NextRequest) {
  try {
    const owner = await getOwner();

    if (!owner) {
      throw new Error("Owner not found");
    }
    const prisma = new PrismaClient();
    const body = await request.json();
    const validation = PROPERTY_DETAILS_VALIDATION.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          message: validation.error,
        },
        { status: 401 }
      );
    }

    const {
      address,
      area,
      city,
      images,
      name,
      personLimit,
      pinCode,
      propertyStatus,
      rentAmount,
      state,
      depositAmount,
    } = validation.data;

    await prisma.property.create({
      data: {
        address: address.toLowerCase(),
        area: area.toLowerCase(),
        city: city.toLowerCase(),
        images,
        name: name.toLowerCase(),
        personLimit: Number(personLimit),
        zipCode: Number(pinCode),
        propertyStatus,
        rentAmount: Number(rentAmount),
        state: state.toLowerCase(),
        depositAmount: Number(depositAmount),
        ownerId: owner.id,
      },
    });

    return NextResponse.json(
      {
        message: "Property created successfully",
        success: true,
      },
      { status: 201 }
    );
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
