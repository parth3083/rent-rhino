import { getOwner } from "@/lib/getOwner";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getOwner();
    const serializedOwner = JSON.parse(
      JSON.stringify(user, (_, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    );
    return NextResponse.json(
      { success: true, serializedOwner },
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
