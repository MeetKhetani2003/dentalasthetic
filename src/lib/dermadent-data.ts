export type Treatment = {
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
};

export const clinic = {
  name: "DermaDent Aesthetics",
  tagline: "Dermatology, Aesthetics, Laser, Hair Restoration & Dental Design",
  location: "India",
  phone: "+91 98765 43210",
  email: "concierge@dermadent.example",
  address: "The Ivory House, 3rd Floor, Luxury Medical District, New Delhi",
  hours: "Mon–Sat · 10:00 AM – 8:00 PM",
  mapLabel: "DermaDent Aesthetics · New Delhi",
};

export const navLinks = [
  { href: "/", label: "Atelier" },
  { href: "/treatments", label: "Treatments" },
  { href: "/doctor", label: "Expert" },
  { href: "/before-after", label: "Transformations" },
  { href: "/gallery", label: "Gallery" },
  { href: "/testimonials", label: "Stories" },
];

export const heroStats = [
  { value: "18+", label: "Years of refined clinical artistry" },
  { value: "4.9", label: "Patient-rated luxury experience" },
  { value: "35k+", label: "Skin, smile & hair journeys" },
];

export const treatments: Treatment[] = [
  {
    slug: "skin-architecture",
    eyebrow: "Dermatology Atelier",
    title: "Signature Skin Architecture",
    shortTitle: "Skin Architecture",
    description:
      "A bespoke dermatology programme for acne, texture, pigmentation and age-related change—planned with diagnostics, barrier science and aesthetic restraint.",
    image:
      "/treatmentimages/Skinarchitecture.png",
    secondaryImage:
      "/treatmentimages/Skinarchitecture.png",
    portraitImage:
      "/treatmentimages/Skinarchitecture.png",
    icon: "◌",
    duration: "45–75 min",
    recovery: "Minimal to 3 days",
    focus: "Texture · Acne · Pigment · Barrier",
    benefits: [
      "Diagnostic-led regimen built for Indian skin tones",
      "Refines pores, post-acne marks and uneven tone",
      "Pairs clinical treatments with luxury barrier repair",
      "Elegant, natural outcomes without overcorrection",
    ],
    timeline: [
      { phase: "01 · Analysis", detail: "High-resolution skin mapping and medical history review." },
      { phase: "02 · Design", detail: "A layered protocol combining peels, lasers and cosmeceuticals." },
      { phase: "03 · Treatment", detail: "Comfort-led session with physician-supervised precision." },
      { phase: "04 · Refinement", detail: "Progressive reviews to calibrate glow, texture and resilience." },
    ],
    technology:
      "VISIA-inspired imaging, medical peels, fractional resurfacing, LED recovery and prescription-grade skincare protocols.",
    expectedResults:
      "Visible brightness from the first cycle, with refined clarity and smoother texture building over 8–12 weeks.",
    faqs: [
      { question: "Is it suitable for sensitive skin?", answer: "Yes. Protocols are barrier-first and adjusted after physician assessment." },
      { question: "How many sessions are required?", answer: "Most plans are designed as 3–6 visits depending on acne, pigment and texture depth." },
      { question: "Will I peel?", answer: "Some protocols have no visible peeling; others involve controlled micro-shedding for 48–72 hours." },
    ],
  },
  {
    slug: "laser-pigment-correction",
    eyebrow: "Laser Suite",
    title: "Precision Laser & Pigment Correction",
    shortTitle: "Laser Precision",
    description:
      "Calibrated laser journeys for melasma, tan, freckles, birthmarks and unwanted hair using parameters selected for safety, clarity and elegance.",
    image:
      "/treatmentimages/Leaserpricision.png",
    secondaryImage:
      "/treatmentimages/Leaserpricision.png",
    portraitImage:
      "/treatmentimages/Leaserpricision.png",
    icon: "✦",
    duration: "20–60 min",
    recovery: "0–5 days",
    focus: "Melasma · Hair · Tattoo · Tone",
    benefits: [
      "Conservative settings for deeper skin phototypes",
      "Targets pigment while protecting surrounding tissue",
      "Works beautifully with pre-event glow protocols",
      "Medical-grade cooling for a calm experience",
    ],
    timeline: [
      { phase: "01 · Patch", detail: "Laser suitability and pigment behaviour are evaluated." },
      { phase: "02 · Prep", detail: "Skin is cooled, shielded and prepared with exact parameters." },
      { phase: "03 · Pulse", detail: "Energy is delivered in measured passes for even response." },
      { phase: "04 · Calm", detail: "Barrier recovery and sun strategy are curated post-session." },
    ],
    technology:
      "Q-switched platforms, diode hair reduction, fractional laser resurfacing and contact cooling technology.",
    expectedResults:
      "A clearer, more even complexion over a series, with many hair-reduction clients seeing meaningful reduction after 4–6 sessions.",
    faqs: [
      { question: "Is laser safe for Indian skin?", answer: "When parameters are selected correctly, yes. We prioritise conservative, staged protocols." },
      { question: "Can melasma be removed permanently?", answer: "Melasma is managed, not promised as permanently cured. Maintenance and sun discipline are essential." },
      { question: "Is there downtime?", answer: "Many laser treatments have little downtime; resurfacing may need a few days of social recovery." },
    ],
  },
  {
    slug: "regenerative-hair-restoration",
    eyebrow: "Hair Restoration Studio",
    title: "Regenerative Hair Restoration",
    shortTitle: "Hair Restoration",
    description:
      "A discreet, data-led hair programme using scalp analysis, regenerative therapies and transplant planning for density that looks quietly natural.",
    image:
      "/treatmentimages/hairrestoration.png",
    secondaryImage:
      "/treatmentimages/hairrestoration.png",
    portraitImage:
      "/treatmentimages/hairrestoration.png",
    icon: "∿",
    duration: "30 min–1 day",
    recovery: "Same day to 7 days",
    focus: "Density · Hairline · Scalp · Growth",
    benefits: [
      "Microscopic scalp and follicle assessment",
      "PRP/GFC-inspired regenerative support",
      "Hairline design that respects facial architecture",
      "Private recovery and long-term follow-up",
    ],
    timeline: [
      { phase: "01 · Mapping", detail: "Density, shedding pattern and donor health are documented." },
      { phase: "02 · Strategy", detail: "Medical, regenerative or transplant pathways are selected." },
      { phase: "03 · Activation", detail: "Growth factors and scalp protocols are administered." },
      { phase: "04 · Review", detail: "Macro photography tracks visible change over cycles." },
    ],
    technology:
      "Digital trichoscopy, centrifuged growth-factor protocols, low-level light recovery and FUE planning systems.",
    expectedResults:
      "Reduced shedding often begins early; density and calibre improvements are assessed over 3–9 months.",
    faqs: [
      { question: "Is it painful?", answer: "Most regenerative sessions are well tolerated with topical anaesthesia and comfort pauses." },
      { question: "Do I need a transplant?", answer: "Not always. Many clients begin with medical and regenerative density support." },
      { question: "When will I see results?", answer: "Hair cycles are slow. Meaningful visible change usually develops across several months." },
    ],
  },
  {
    slug: "facial-balancing-injectables",
    eyebrow: "Facial Design",
    title: "Injectables & Facial Balancing",
    shortTitle: "Facial Balancing",
    description:
      "Subtle neuromodulator, filler and biostimulator treatments for lift, proportion and freshness—never a frozen or overfilled aesthetic.",
    image:
      "/treatmentimages/facialbalancing.png",
    secondaryImage:
      "/treatmentimages/facialbalancing.png",
    portraitImage:
      "/treatmentimages/facialbalancing.png",
    icon: "⌁",
    duration: "30–50 min",
    recovery: "24–72 hours",
    focus: "Lift · Hydration · Harmony · Collagen",
    benefits: [
      "Facial analysis before product selection",
      "Micro-dosing for natural expression",
      "Luxury numbing and bruise-minimising technique",
      "Refined outcomes designed to age elegantly",
    ],
    timeline: [
      { phase: "01 · Consult", detail: "Expressions, proportions and profile are studied in motion." },
      { phase: "02 · Mark", detail: "Injection points are mapped with minimal-intervention philosophy." },
      { phase: "03 · Sculpt", detail: "Product is placed slowly and conservatively." },
      { phase: "04 · Settle", detail: "A two-week review refines balance if needed." },
    ],
    technology:
      "Premium HA fillers, neuromodulators, skin boosters, cannula techniques and biostimulatory collagen support.",
    expectedResults:
      "Freshness can be immediate for fillers; neuromodulators settle over 10–14 days with soft, controlled expression.",
    faqs: [
      { question: "Will I look different?", answer: "The goal is for you to look rested and balanced—not visibly treated." },
      { question: "How long does it last?", answer: "Depending on area and product, results may last 4–18 months." },
      { question: "Can treatments be reversed?", answer: "Many HA filler treatments can be dissolved if medically appropriate." },
    ],
  },
  {
    slug: "smile-design-dental-aesthetics",
    eyebrow: "Dental Couture",
    title: "Smile Design & Dental Aesthetics",
    shortTitle: "Smile Design",
    description:
      "Cosmetic dentistry, veneers, whitening, aligners and implant planning designed as a fashion-grade smile transformation with medical precision.",
    image:
      "/treatmentimages/smiledesign.png",
    secondaryImage:
      "/treatmentimages/smiledesign.png",
    portraitImage:
      "/treatmentimages/smiledesign.png",
    icon: "◇",
    duration: "45 min–2 hrs",
    recovery: "Usually none",
    focus: "Veneers · Whitening · Aligners · Implants",
    benefits: [
      "Digital smile design before treatment begins",
      "Natural shade selection for Indian complexions",
      "Minimally invasive veneer and whitening protocols",
      "Aesthetic dentistry integrated with facial balance",
    ],
    timeline: [
      { phase: "01 · Scan", detail: "Intraoral scans, photos and bite analysis define the canvas." },
      { phase: "02 · Preview", detail: "A digital smile concept shows shape, shade and proportion." },
      { phase: "03 · Craft", detail: "Whitening, aligners, veneers or implants are planned in sequence." },
      { phase: "04 · Polish", detail: "Final contours are refined for speech, comfort and sparkle." },
    ],
    technology:
      "Intraoral scanning, digital smile design, ceramic veneer planning, aligner workflows and guided implant protocols.",
    expectedResults:
      "A camera-ready smile that remains believable, comfortable and proportionate to the full face.",
    faqs: [
      { question: "Do veneers damage teeth?", answer: "Modern veneer planning can be minimally invasive when case selection is appropriate." },
      { question: "How white should I go?", answer: "We guide shade selection to look luminous, not artificial." },
      { question: "Can skin and smile plans be combined?", answer: "Yes. Many clients coordinate facial treatments with smile milestones." },
    ],
  },
  {
    slug: "bridal-event-glow-protocol",
    eyebrow: "Occasion Protocols",
    title: "Bridal & Event Glow Protocol",
    shortTitle: "Event Glow",
    description:
      "A cinematic countdown for weddings, shoots and milestones—skin, smile, hair and laser plans orchestrated with exact timing.",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1800&q=85",
    secondaryImage:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=85",
    portraitImage:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=85",
    icon: "✧",
    duration: "6–24 week plan",
    recovery: "Planned around events",
    focus: "Glow · Smile · Hair · Confidence",
    benefits: [
      "Aesthetic calendar aligned to your event date",
      "No-risk timing for lasers, peels and injectables",
      "Smile brightening and complexion refinement together",
      "Concierge reminders and final-week calm protocol",
    ],
    timeline: [
      { phase: "01 · Countdown", detail: "Your event date anchors a backwards treatment calendar." },
      { phase: "02 · Build", detail: "Corrective work is completed early for stability." },
      { phase: "03 · Refine", detail: "Glow, hydration and smile luminosity are enhanced." },
      { phase: "04 · Finish", detail: "Final week is calm, low-risk and camera-focused." },
    ],
    technology:
      "Hydrafacial-style infusions, LED, peels, lasers, injectables, whitening and medical skincare sequencing.",
    expectedResults:
      "A polished, camera-responsive look—radiant skin, refined smile and confidence without visible downtime near the event.",
    faqs: [
      { question: "When should I start before a wedding?", answer: "Six months is ideal; twelve weeks can still create meaningful visible refinement." },
      { question: "Can my family join the plan?", answer: "Yes. We design elegant family glow calendars for close events." },
      { question: "What happens in the final week?", answer: "Only low-risk hydration, LED and calming treatments are considered." },
    ],
  },
];

export const doctors = [
  {
    name: "Dr. Aarya Mehta",
    title: "Founder, Dermatologic & Aesthetic Design Director",
    portrait: "/dr.png",
    signature: "Aarya Mehta",
    biography:
      "Dr. Aarya Mehta founded DermaDent Aesthetics as an atelier for clinically precise, visually restrained beauty. Her work combines dermatology, facial design, lasers, hair restoration and smile aesthetics into quiet transformations that respect identity.",
    credentials: [
      "MD Dermatology · Fellowship in Aesthetic Lasers",
      "International training in facial anatomy and injectables",
      "Advanced certification in trichology-led hair restoration",
      "Clinical collaborator for smile-led facial aesthetics",
    ],
    achievements: [
      "35,000+ patient journeys supervised",
      "Faculty speaker for aesthetic dermatology forums",
      "Published protocols for pigment-safe laser planning",
      "Awarded for patient experience and ethical aesthetic care",
    ],
    timeline: [
      { year: "2008", detail: "Medical dermatology residency and research in pigment disorders." },
      { year: "2012", detail: "Laser fellowship with focus on Indian skin safety." },
      { year: "2017", detail: "Integrated facial aesthetics, hair and smile design into practice." },
      { year: "2024", detail: "Launched DermaDent’s luxury medical atelier concept." },
    ],
  },
  {
    name: "Dr. Amrendra Kumar",
    title: "BOT AND MOT(ORTHOPAEDIC)",
    portrait: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1200&q=85",
    signature: "Amrendra Kumar",
    biography:
      "Dr. Amrendra Kumar specializes in Physical Therapy and Rehabilitation, bringing extensive expertise in orthopaedic care. He focuses on comprehensive patient recovery and long-term physical well-being through customized therapeutic protocols.",
    credentials: [
      "BOT AND MOT(ORTHOPAEDIC)",
      "National Institute for Orthopaedically Handicapped (NILD), Kolkata",
      "Specialist in Physical Therapy and Rehabilitation",
    ],
    achievements: [
      "Expertise in advanced orthopaedic rehabilitation",
      "Dedicated to restoring mobility and enhancing quality of life",
    ],
    timeline: [
      { year: "Present", detail: "Leading Physical Therapy and Rehabilitation at DermaDent Aesthetics." },
    ],
  }
];

export const transformations = [
  {
    title: "Melasma clarity with restraint",
    concern: "Pigment · barrier weakness",
    timeline: "14 weeks",
    result: "More even tone, softer patches and calmer skin behaviour.",
    before:
      "https://images.unsplash.com/photo-1598300188904-6287d52746ad?auto=format&fit=crop&w=1000&q=85",
    after:
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Smile architecture refresh",
    concern: "Shade · proportion · edge wear",
    timeline: "6 weeks",
    result: "Natural luminosity and better harmony with the face.",
    before:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1000&q=85",
    after:
      "https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=1000&q=85",
  },
];

export const testimonials = [
  {
    quote:
      "It felt less like a clinic and more like a private atelier. My skin looks expensive, but still completely like me.",
    name: "Anika R.",
    detail: "Founder · Pigment correction",
    rating: "5.0",
    portrait:
      "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?auto=format&fit=crop&w=800&q=85",
  },
  {
    quote:
      "DermaDent planned my wedding skin, smile and hair calendar with the precision of a couture fitting.",
    name: "Meera S.",
    detail: "Bride · Event glow protocol",
    rating: "5.0",
    portrait:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=85",
  },
  {
    quote:
      "The consultation was deeply scientific, but the experience was serene. No one can tell what I did—they just say I look rested.",
    name: "Rahul K.",
    detail: "Executive · Facial balancing",
    rating: "4.9",
    portrait:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=85",
  },
];

export const gallery = [
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
    title: "Ivory reception salon",
    category: "Interiors",
    size: "large",
  },
  {
    src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=85",
    title: "Digital dental studio",
    category: "Dental",
    size: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1200&q=85",
    title: "Skin ritual suite",
    category: "Dermatology",
    size: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=85",
    title: "Laser precision bay",
    category: "Technology",
    size: "regular",
  },
  {
    src: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&q=85",
    title: "Barrier science lab",
    category: "Skin",
    size: "regular",
  },
  {
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1300&q=85",
    title: "Bridal glow studio",
    category: "Events",
    size: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1300&q=85",
    title: "Consultation theatre",
    category: "Experience",
    size: "wide",
  },
];

export const awards = ["Aesthetic Safety Guild", "Luxury Patient Experience", "Laser Excellence", "Smile Design Council"];
