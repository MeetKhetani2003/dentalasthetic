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
      preferredDate: payload.preferredDate || null,
      preferredTime: payload.preferredTime || null,
      message: payload.message?.trim() || null,
    });

    return Response.json({ ok: true, id: appointment._id });
  } catch (error) {
    console.error(error);
    return Response.json({ ok: false, error: "Unable to create appointment" }, { status: 500 });
  }
}
