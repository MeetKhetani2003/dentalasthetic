import { NextResponse } from "next/server";
import { connectDB } from "@/db";
import { Testimonial } from "@/db/schema";
import { getTestimonials } from "@/lib/cms";

export async function GET() {
  const items = await getTestimonials();
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newDoc = await Testimonial.create(body);
    return NextResponse.json({ success: true, data: newDoc });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { _id, ...rest } = body;
    if (!_id) {
      return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    }
    const updated = await Testimonial.findByIdAndUpdate(_id, rest, { new: true });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "ID parameter missing" }, { status: 400 });
    }
    await Testimonial.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
