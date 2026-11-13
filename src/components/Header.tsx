"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "./Container";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/brand-owners/", label: "Brand Owners" },
  { href: "/law-firms/", label: "Law Firms" },
  { href: "/how-it-works/", label: "How It Works" },
  { href: "/pricing/", label: "Pricing Plans" },
  { href: "/blog/", label: "Blog" },
  { href: "/faq/", label: "FAQ" },
  { href: "/contact/", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-brand-primary/10 bg-brand-white">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center" onClick={() => setMenuOpen(false)}>
            <Image
              src="/images/logo_trimmed-1024x612.png"
              alt="Trademark Copyright Protection"
              width={160}
              height={96}
              className="h-10 w-auto"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.slice(0, 5).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-brand-dark hover:text-brand-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link
              href="/get-started/"
              className="rounded-md bg-brand-magenta px-4 py-2 text-sm font-semibold text-brand-white hover:bg-brand-accent"
            >
              Get Started →
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation menu"
            className="flex h-10 w-10 items-center justify-center rounded-md border border-brand-primary/20 text-brand-dark md:hidden"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </Container>

      {menuOpen && (
        <nav
          id="mobile-nav"
          className="border-t border-brand-primary/10 bg-brand-white md:hidden"
        >
          <Container>
            <div className="flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md px-2 py-2 text-sm font-medium text-brand-dark hover:bg-brand-cream hover:text-brand-primary"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/get-started/"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-md bg-brand-magenta px-4 py-2 text-center text-sm font-semibold text-brand-white hover:bg-brand-accent"
              >
                Get Started →
              </Link>
            </div>
          </Container>
        </nav>
      )}
    </header>
  );
}
