import { NextResponse } from "next/server";
import { connectDB } from "@/db";
import { Doctor } from "@/db/schema";
import { getDoctors } from "@/lib/cms";

export async function GET() {
  const doctors = await getDoctors();
  const doctor = doctors.length > 0 ? doctors[0] : null;
  return NextResponse.json(doctor);
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    let doc = await Doctor.findOne();
    if (!doc) {
      doc = await Doctor.create(body);
    } else {
      Object.assign(doc, body);
      await doc.save();
    }

    return NextResponse.json({ success: true, data: doc });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
