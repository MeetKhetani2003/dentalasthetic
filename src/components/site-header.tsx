"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/dermadent-data";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
      <Link href="/" className="brand-mark" aria-label="DermaDent Aesthetics home">
        <img src="/logo.png" alt="DermaDent Aesthetics Logo" className="header-logo" style={{ height: "65px", width: "auto" }} />
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className={pathname === link.href ? "is-active" : ""}>
            {link.label}
          </Link>
        ))}
      </nav>

      <Link href="/appointment" className="header-cta magnetic-link">
        Private Consultation
      </Link>

      <button
        className="menu-toggle"
        type="button"
        aria-label="Toggle navigation menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
      </button>

      <div className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="mobile-menu__panel">
          <p className="eyebrow">Luxury medical atelier</p>
          {navLinks.map((link, index) => (
            <Link key={link.href} href={link.href} style={{ transitionDelay: `${index * 45}ms` }}>
              {link.label}
            </Link>
          ))}
          <Link href="/appointment" className="mobile-menu__cta">
            Begin your consultation
          </Link>
        </div>
      </div>
    </header>
  );
}
