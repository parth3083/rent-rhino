import { getTenant } from "@/lib/getTenant";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getTenant();
    return NextResponse.json({ success: true, user }, { status: 201 });
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
