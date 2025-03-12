import { getTenant } from "@/lib/getTenant";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getTenant();
    const serializedUser = JSON.parse(
      JSON.stringify(user, (_, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    );
    return NextResponse.json({ success: true, serializedUser }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error,
      },
      { status: 500 }
    );
  }
}
