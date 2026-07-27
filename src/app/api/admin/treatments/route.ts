import { NextResponse } from "next/server";
import { connectDB } from "@/db";
import { Treatment } from "@/db/schema";
import { getTreatments } from "@/lib/cms";

export async function GET() {
  const items = await getTreatments();
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    if (!body.slug || !body.title) {
      return NextResponse.json({ success: false, error: "Slug and title are required" }, { status: 400 });
    }

    // Generate slug if simple
    const slugClean = body.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const newDoc = await Treatment.create({ ...body, slug: slugClean });

    return NextResponse.json({ success: true, data: newDoc });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
