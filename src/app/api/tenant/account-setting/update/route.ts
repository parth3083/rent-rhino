import { getTenant } from "@/lib/getTenant";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

enum TENANT_STATUS {
  STUDENT = "STUDENT",
  WORKING_PROFESSIONAL = "WORKING_PROFESSIONAL",
  FAMILY = "FAMILY",
  SELF_EMPLOYED = "SELF_EMPLOYED",
}

const TENANT_DETAILS = z.object({
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
  workingArea: z.string(),
  tenantStatus: z.nativeEnum(TENANT_STATUS),
});

export async function POST(request: NextRequest) {
  try {
    const tenant = await getTenant();
    const prisma = new PrismaClient();

    if (!tenant) {
      return NextResponse.json(
        { message: "Tenant not found" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validation = TENANT_DETAILS.safeParse(body);

    if (!validation.success) {
      console.log(validation.error);
      return NextResponse.json(
        { message: "Invalid data", validation },
        { status: 400 }
      );
    }
    const {
      contactNumber,
      adharNumber,
      adharImage,
      workingArea,
      tenantStatus,
    } = validation.data;

    await prisma.tenant.update({
      where: {
        id: tenant?.id,
      },
      data: {
        contactNumber:Number(contactNumber),
        adharNumber:Number(adharNumber),
        adharImage,
        workingArea,
        tenantStatus,
      },
    });
    return NextResponse.json(
      {
        message: "Tenant data updated successfully",
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal server error",
        error,
      },
      { status: 500 }
    );
  }
}
