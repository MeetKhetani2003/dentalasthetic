import { connectDB } from "@/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    return Response.json({ ok: true });
  } catch (error) {
    console.error(error);
    return Response.json({ ok: false }, { status: 500 });
  }
}
