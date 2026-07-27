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

// Treatment Schema
export interface ITreatment extends Document {
  slug: string;
  eyebrow: string;
  title: string;
  shortTitle: string;
  description: string;
  image: string;
  secondaryImage: string;
  portraitImage: string;
  icon: string;
  duration: string;
  recovery: string;
  focus: string;
  benefits: string[];
  timeline: { phase: string; detail: string }[];
  technology: string;
  expectedResults: string;
  faqs: { question: string; answer: string }[];
  order?: number;
}

const treatmentSchema = new mongoose.Schema<ITreatment>({
  slug: { type: String, required: true, unique: true },
  eyebrow: { type: String, required: true },
  title: { type: String, required: true },
  shortTitle: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  secondaryImage: { type: String, required: true },
  portraitImage: { type: String, required: true },
  icon: { type: String, default: "✦" },
  duration: { type: String, required: true },
  recovery: { type: String, required: true },
  focus: { type: String, required: true },
  benefits: [{ type: String }],
  timeline: [{ phase: { type: String }, detail: { type: String } }],
  technology: { type: String, required: true },
  expectedResults: { type: String, required: true },
  faqs: [{ question: { type: String }, answer: { type: String } }],
  order: { type: Number, default: 0 },
});

export const Treatment: Model<ITreatment> =
  mongoose.models.Treatment || mongoose.model<ITreatment>("Treatment", treatmentSchema);

// Doctor / Expert Schema
export interface IDoctor extends Document {
  name: string;
  title: string;
  portrait: string;
  signature: string;
  biography: string;
  credentials: string[];
  achievements: string[];
  timeline: { year: string; detail: string }[];
}

const doctorSchema = new mongoose.Schema<IDoctor>({
  name: { type: String, required: true },
  title: { type: String, required: true },
  portrait: { type: String, required: true },
  signature: { type: String, required: true },
  biography: { type: String, required: true },
  credentials: [{ type: String }],
  achievements: [{ type: String }],
  timeline: [{ year: { type: String }, detail: { type: String } }],
});

export const Doctor: Model<IDoctor> =
  mongoose.models.Doctor || mongoose.model<IDoctor>("Doctor", doctorSchema);

// Home Page Content Schema
export interface IHomeContent extends Document {
  heroKicker: string;
  heroTitle: string;
  heroSubheading: string;
  heroImage?: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
  introEyebrow: string;
  introHeading: string;
  introDescription: string;
  philosophyEyebrow: string;
  philosophyHeading: string;
  philosophyCards: { title: string; description: string }[];
  featuredEyebrow: string;
  featuredHeading: string;
  featuredSubheading: string;
  heroStats: { value: string; label: string }[];
}

const homeContentSchema = new mongoose.Schema<IHomeContent>({
  heroKicker: { type: String, required: true },
  heroTitle: { type: String, required: true },
  heroSubheading: { type: String, required: true },
  heroImage: { type: String },
  primaryBtnText: { type: String, default: "Book consultation" },
  primaryBtnLink: { type: String, default: "/appointment" },
  secondaryBtnText: { type: String, default: "Explore treatments" },
  secondaryBtnLink: { type: String, default: "/treatments" },
  introEyebrow: { type: String, default: "Luxury introduction" },
  introHeading: { type: String, default: "A private atelier for clinically precise beauty." },
  introDescription: { type: String, default: "We designed DermaDent to feel like entering a serene residence. Every treatment is tailored for Indian skin, facial harmony and long-term confidence." },
  philosophyEyebrow: { type: String, default: "Clinic philosophy" },
  philosophyHeading: { type: String, default: "Beauty should be almost imperceptible." },
  philosophyCards: [{ title: { type: String }, description: { type: String } }],
  featuredEyebrow: { type: String, default: "Featured treatments" },
  featuredHeading: { type: String, default: "Standardized Excellence" },
  featuredSubheading: { type: String, default: "Each protocol is designed as a complete journey." },
  heroStats: [{ value: { type: String }, label: { type: String } }],
});

export const HomeContent: Model<IHomeContent> =
  mongoose.models.HomeContent || mongoose.model<IHomeContent>("HomeContent", homeContentSchema);

// Transformation Schema
export interface ITransformation extends Document {
  title: string;
  concern: string;
  timeline: string;
  result: string;
  before: string;
  after: string;
  order?: number;
}

const transformationSchema = new mongoose.Schema<ITransformation>({
  title: { type: String, required: true },
  concern: { type: String, required: true },
  timeline: { type: String, required: true },
  result: { type: String, required: true },
  before: { type: String, required: true },
  after: { type: String, required: true },
  order: { type: Number, default: 0 },
});

export const Transformation: Model<ITransformation> =
  mongoose.models.Transformation || mongoose.model<ITransformation>("Transformation", transformationSchema);

// Testimonial Schema
export interface ITestimonial extends Document {
  quote: string;
  name: string;
  detail: string;
  rating: string;
  portrait: string;
  order?: number;
}

const testimonialSchema = new mongoose.Schema<ITestimonial>({
  quote: { type: String, required: true },
  name: { type: String, required: true },
  detail: { type: String, required: true },
  rating: { type: String, default: "5.0" },
  portrait: { type: String, required: true },
  order: { type: Number, default: 0 },
});

export const Testimonial: Model<ITestimonial> =
  mongoose.models.Testimonial || mongoose.model<ITestimonial>("Testimonial", testimonialSchema);

// Clinic Info Schema
export interface IClinicInfo extends Document {
  name: string;
  tagline: string;
  location: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  mapLabel: string;
}

const clinicInfoSchema = new mongoose.Schema<IClinicInfo>({
  name: { type: String, required: true },
  tagline: { type: String, required: true },
  location: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  hours: { type: String, required: true },
  mapLabel: { type: String, required: true },
});

export const ClinicInfo: Model<IClinicInfo> =
  mongoose.models.ClinicInfo || mongoose.model<IClinicInfo>("ClinicInfo", clinicInfoSchema);

// Gallery Item Schema
export interface IGalleryItem extends Document {
  src: string;
  title: string;
  category: string;
  size: string;
}

const galleryItemSchema = new mongoose.Schema<IGalleryItem>({
  src: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  size: { type: String, default: "regular" },
});

export const GalleryItem: Model<IGalleryItem> =
  mongoose.models.GalleryItem || mongoose.model<IGalleryItem>("GalleryItem", galleryItemSchema);

