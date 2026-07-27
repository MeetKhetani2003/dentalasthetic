import { NextResponse } from "next/server";
import { connectDB } from "@/db";
import { ClinicInfo } from "@/db/schema";
import { getClinicInfo } from "@/lib/cms";

export async function GET() {
  const data = await getClinicInfo();
  return NextResponse.json(data);
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    let doc = await ClinicInfo.findOne();
    if (!doc) {
      doc = await ClinicInfo.create(body);
    } else {
      Object.assign(doc, body);
      await doc.save();
    }

    return NextResponse.json({ success: true, data: doc });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
