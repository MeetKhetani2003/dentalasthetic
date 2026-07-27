import { NextResponse } from "next/server";
import { connectDB } from "@/db";
import { HomeContent } from "@/db/schema";
import { getHomeContent } from "@/lib/cms";

export async function GET() {
  const content = await getHomeContent();
  return NextResponse.json(content);
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    let doc = await HomeContent.findOne();
    if (!doc) {
      doc = await HomeContent.create(body);
    } else {
      Object.assign(doc, body);
      await doc.save();
    }

    return NextResponse.json({ success: true, data: doc });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
