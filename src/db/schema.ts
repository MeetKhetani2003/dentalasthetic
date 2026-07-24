import mongoose, { Document, Model } from "mongoose";

export interface IAppointment extends Document {
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
  status: string;
  createdAt: Date;
}

const appointmentSchema = new mongoose.Schema<IAppointment>({
  name: { type: String, required: true, maxlength: 160 },
  email: { type: String, required: true, maxlength: 240 },
  phone: { type: String, required: true, maxlength: 60 },
  service: { type: String, required: true, maxlength: 160 },
  preferredDate: { type: String, maxlength: 80 },
  preferredTime: { type: String, maxlength: 80 },
  message: { type: String },
  status: { type: String, required: true, default: "new", maxlength: 40 },
  createdAt: { type: Date, default: Date.now },
});

export const Appointment: Model<IAppointment> =
  mongoose.models.Appointment || mongoose.model<IAppointment>("Appointment", appointmentSchema);

export type NewAppointment = Omit<IAppointment, keyof Document | "createdAt" | "status">;
