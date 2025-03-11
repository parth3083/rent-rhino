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
  contactNumber: z.number().min(10).max(10),
  adharNumber: z.number().min(12).max(12),
  adharImage: z.string(),
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
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
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
        contactNumber,
        adharNumber,
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
    return NextResponse.json(
      {
        message: "Internal server error",
        error,
      },
      { status: 500 }
    );
  }
}
