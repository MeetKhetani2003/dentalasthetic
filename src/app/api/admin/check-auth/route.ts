import { NextResponse } from "next/server";
import { isVerifiedAdmin } from "@/lib/auth";

export async function GET() {
  const authenticated = await isVerifiedAdmin();
  return NextResponse.json({ authenticated });
}
