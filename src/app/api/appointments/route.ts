import { connectDB } from "@/db";
import { Appointment } from "@/db/schema";

export const dynamic = "force-dynamic";

type AppointmentPayload = {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
};

export async function GET() {
  try {
    await connectDB();
    const items = await Appointment.find().sort({ createdAt: -1 }).lean();
    return Response.json({ ok: true, data: items });
  } catch (error) {
    console.error(error);
    return Response.json({ ok: false, error: "Unable to fetch appointments" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const payload = (await request.json()) as AppointmentPayload;
    const name = payload.name?.trim();
    const email = payload.email?.trim();
    const phone = payload.phone?.trim();
    const service = payload.service?.trim();

    if (!name || !email || !phone || !service) {
      return Response.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    const appointment = await Appointment.create({
      name,
      email,
      phone,
      service,
      preferredDate: payload.preferredDate || undefined,
      preferredTime: payload.preferredTime || undefined,
      message: payload.message?.trim() || undefined,
    });

    return Response.json({ ok: true, id: appointment._id });
  } catch (error) {
    console.error(error);
    return Response.json({ ok: false, error: "Unable to create appointment" }, { status: 500 });
  }
}

