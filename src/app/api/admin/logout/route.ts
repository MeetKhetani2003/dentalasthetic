import { NextResponse } from "next/server";
import { getAuthCookieDetails } from "@/lib/auth";

export async function POST() {
  const { name } = getAuthCookieDetails();
  const response = NextResponse.json({ success: true, message: "Logged out" });
  response.cookies.set({
    name,
    value: "",
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
  return response;
}
