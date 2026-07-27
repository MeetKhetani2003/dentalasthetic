import { NextResponse } from "next/server";
import { seedInitialData } from "@/lib/cms";

export async function POST() {
  const result = await seedInitialData();
  if (result.success) {
    return NextResponse.json(result);
  }
  return NextResponse.json(result, { status: 500 });
}
