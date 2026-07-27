import { connectDB } from "@/db";
import {
  Treatment,
  Doctor,
  HomeContent,
  Transformation,
  Testimonial,
  ClinicInfo,
  GalleryItem,
} from "@/db/schema";
import {
  treatments as defaultTreatments,
  doctor as defaultDoctor,
  heroStats as defaultHeroStats,
  transformations as defaultTransformations,
  testimonials as defaultTestimonials,
  clinic as defaultClinic,
  gallery as defaultGallery,
  Treatment as TreatmentType,
} from "@/lib/dermadent-data";

export async function seedInitialData() {
  try {
    await connectDB();

    // 1. Treatments
    const treatmentCount = await Treatment.countDocuments();
    if (treatmentCount === 0) {
      console.log("Seeding initial treatments...");
      await Treatment.insertMany(
        defaultTreatments.map((t, idx) => ({ ...t, order: idx }))
      );
    }

    // 2. Doctor
    const doctorCount = await Doctor.countDocuments();
    if (doctorCount === 0) {
      console.log("Seeding initial doctor data...");
      await Doctor.create(defaultDoctor);
    }

    // 3. Home Content
    const homeCount = await HomeContent.countDocuments();
    if (homeCount === 0) {
      console.log("Seeding initial home page content...");
      await HomeContent.create({
        heroKicker: "India’s premium medical atelier",
        heroTitle: "Skin, smile and hair refinement for those who prefer quality perfection.",
        heroSubheading: "DermaDent Aesthetics blends dermatology, lasers, regenerative hair care and dental design into a calm, deeply personal beauty experience.",
        primaryBtnText: "Book consultation",
        primaryBtnLink: "/appointment",
        secondaryBtnText: "Explore treatments",
        secondaryBtnLink: "/treatments",
        introEyebrow: "Luxury introduction",
        introHeading: "A private atelier for clinically precise beauty.",
        introDescription: "We designed DermaDent to feel like entering a serene residence. Every treatment is tailored for Indian skin, facial harmony and long-term confidence.",
        philosophyEyebrow: "Clinic philosophy",
        philosophyHeading: "Beauty should be almost imperceptible.",
        philosophyCards: [
          {
            title: "Barrier-first dermatology",
            description: "Our philosophy is conservative, diagnostic and aesthetic. We study skin behaviour before creating a protocol."
          },
          {
            title: "Facial architecture mapping",
            description: "We analyze facial proportion and structural balance for subtle, harmonious results."
          },
          {
            title: "Laser parameters for Indian skin",
            description: "Advanced laser technology specifically calibrated for safety and efficacy on melanin-rich skin."
          }
        ],
        featuredEyebrow: "Featured treatments",
        featuredHeading: "Standardized Excellence",
        featuredSubheading: "Each protocol is designed as a complete journey.",
        heroStats: defaultHeroStats
      });
    }

    // 4. Transformations
    const transCount = await Transformation.countDocuments();
    if (transCount === 0) {
      console.log("Seeding initial transformations...");
      await Transformation.insertMany(
        defaultTransformations.map((t, idx) => ({ ...t, order: idx }))
      );
    }

    // 5. Testimonials
    const testCount = await Testimonial.countDocuments();
    if (testCount === 0) {
      console.log("Seeding initial testimonials...");
      await Testimonial.insertMany(
        defaultTestimonials.map((t, idx) => ({ ...t, order: idx }))
      );
    }

    // 6. Clinic Info
    const clinicCount = await ClinicInfo.countDocuments();
    if (clinicCount === 0) {
      console.log("Seeding initial clinic info...");
      await ClinicInfo.create(defaultClinic);
    }

    // 7. Gallery Items
    const galleryCount = await GalleryItem.countDocuments();
    if (galleryCount === 0) {
      console.log("Seeding initial gallery items...");
      await GalleryItem.insertMany(defaultGallery);
    }

    return { success: true, message: "Database seeded successfully" };
  } catch (error) {
    console.error("Error seeding data:", error);
    return { success: false, error: (error as Error).message };
  }
}

// Data Getters with Graceful Fallback
export async function getHomeContent() {
  try {
    await connectDB();
    const data = await HomeContent.findOne().lean();
    if (data) {
      return JSON.parse(JSON.stringify(data));
    }
  } catch (e) {
    console.error("Failed to fetch home content from DB:", e);
  }
  return {
    heroKicker: "India’s premium medical atelier",
    heroTitle: "Skin, smile and hair refinement for those who prefer quality perfection.",
    heroSubheading: "DermaDent Aesthetics blends dermatology, lasers, regenerative hair care and dental design into a calm, deeply personal beauty experience.",
    primaryBtnText: "Book consultation",
    primaryBtnLink: "/appointment",
    secondaryBtnText: "Explore treatments",
    secondaryBtnLink: "/treatments",
    introEyebrow: "Luxury introduction",
    introHeading: "A private atelier for clinically precise beauty.",
    introDescription: "We designed DermaDent to feel like entering a serene residence. Every treatment is tailored for Indian skin, facial harmony and long-term confidence.",
    philosophyEyebrow: "Clinic philosophy",
    philosophyHeading: "Beauty should be almost imperceptible.",
    philosophyCards: [
      {
        title: "Barrier-first dermatology",
        description: "Our philosophy is conservative, diagnostic and aesthetic. We study skin behaviour before creating a protocol."
      },
      {
        title: "Facial architecture mapping",
        description: "We analyze facial proportion and structural balance for subtle, harmonious results."
      },
      {
        title: "Laser parameters for Indian skin",
        description: "Advanced laser technology specifically calibrated for safety and efficacy on melanin-rich skin."
      }
    ],
    featuredEyebrow: "Featured treatments",
    featuredHeading: "Standardized Excellence",
    featuredSubheading: "Each protocol is designed as a complete journey.",
    heroStats: defaultHeroStats
  };
}

export async function getDoctor() {
  try {
    await connectDB();
    const data = await Doctor.findOne().lean();
    if (data) {
      return JSON.parse(JSON.stringify(data));
    }
  } catch (e) {
    console.error("Failed to fetch doctor from DB:", e);
  }
  return defaultDoctor;
}

export async function getTreatments(): Promise<TreatmentType[]> {
  try {
    await connectDB();
    const items = await Treatment.find().sort({ order: 1 }).lean();
    if (items && items.length > 0) {
      return JSON.parse(JSON.stringify(items));
    }
  } catch (e) {
    console.error("Failed to fetch treatments from DB:", e);
  }
  return defaultTreatments;
}

export async function getTreatmentBySlug(slug: string): Promise<TreatmentType | undefined> {
  try {
    await connectDB();
    const item = await Treatment.findOne({ slug }).lean();
    if (item) {
      return JSON.parse(JSON.stringify(item));
    }
  } catch (e) {
    console.error(`Failed to fetch treatment ${slug} from DB:`, e);
  }
  return defaultTreatments.find((t) => t.slug === slug);
}

export async function getTransformations() {
  try {
    await connectDB();
    const items = await Transformation.find().sort({ order: 1 }).lean();
    if (items && items.length > 0) {
      return JSON.parse(JSON.stringify(items));
    }
  } catch (e) {
    console.error("Failed to fetch transformations from DB:", e);
  }
  return defaultTransformations;
}

export async function getTestimonials() {
  try {
    await connectDB();
    const items = await Testimonial.find().sort({ order: 1 }).lean();
    if (items && items.length > 0) {
      return JSON.parse(JSON.stringify(items));
    }
  } catch (e) {
    console.error("Failed to fetch testimonials from DB:", e);
  }
  return defaultTestimonials;
}

export async function getClinicInfo() {
  try {
    await connectDB();
    const data = await ClinicInfo.findOne().lean();
    if (data) {
      return JSON.parse(JSON.stringify(data));
    }
  } catch (e) {
    console.error("Failed to fetch clinic info from DB:", e);
  }
  return defaultClinic;
}

export async function getGallery() {
  try {
    await connectDB();
    const items = await GalleryItem.find().lean();
    if (items && items.length > 0) {
      return JSON.parse(JSON.stringify(items));
    }
  } catch (e) {
    console.error("Failed to fetch gallery from DB:", e);
  }
  return defaultGallery;
}
