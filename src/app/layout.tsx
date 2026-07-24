import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/luxury-ui";
import { SiteHeader } from "@/components/site-header";
import { SmoothExperience } from "@/components/smooth-experience";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://dermadent.example"),
  title: {
    default: "DermaDent Aesthetics · Luxury Dermatology, Laser, Hair & Dental Clinic",
    template: "%s · DermaDent Aesthetics",
  },
  description:
    "A luxury medical atelier in India for dermatology, aesthetic medicine, laser treatments, hair restoration and smile design.",
  keywords: [
    "luxury dermatology India",
    "aesthetic clinic",
    "laser clinic",
    "hair restoration",
    "cosmetic dentistry",
    "DermaDent Aesthetics",
  ],
  openGraph: {
    title: "DermaDent Aesthetics",
    description: "Luxury dermatology, aesthetic, laser, hair restoration and dental design clinic.",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1600&q=85",
        width: 1600,
        height: 1000,
        alt: "DermaDent Aesthetics luxury clinic experience",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SmoothExperience>
          <SiteHeader />
          {children}
          <SiteFooter />
        </SmoothExperience>
      </body>
    </html>
  );
}
