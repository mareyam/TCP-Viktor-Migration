import Link from "next/link";
import Image from "next/image";
import Container from "./Container";

const PRODUCT_LINKS = [
  { href: "/", label: "Home" },
  { href: "/brand-owners/", label: "For Brand Owners" },
  { href: "/law-firms/", label: "For Law Firms" },
  { href: "/how-it-works/", label: "How It Works" },
  { href: "/pricing/", label: "Pricing" },
  { href: "/weekly-brand-protection/", label: "Weekly Brand Protection" },
  { href: "/get-started/", label: "Get Started" },
  { href: "/book-a-demo/", label: "Book a Demo" },
  { href: "/contact/", label: "Contact" },
];

const LEARN_LINKS = [
  { href: "/blog/", label: "Blog" },
  { href: "/faq/", label: "FAQ" },
];

export default function Footer() {
  return (
    <footer className="border-t border-brand-primary/10 bg-brand-white">
      <Container>
        <div className="grid gap-10 py-14 sm:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo_trimmed-1024x612.png"
                alt="Trademark Copyright Protection"
                width={160}
                height={96}
                className="h-10 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-brand-dark">
              Trademark and IP monitoring that tells you what to do, and does
              it for you. Built for people who have better things to worry
              about.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">
              Product
            </p>
            <ul className="mt-4 space-y-3">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-dark hover:text-brand-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">
              Learn
            </p>
            <ul className="mt-4 space-y-3">
              {LEARN_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-dark hover:text-brand-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t border-brand-primary/10 py-6 text-xs text-brand-dark/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} Trademark Copyright Protection.
            All rights reserved. ·{" "}
            <Link href="/privacy-policy/" className="hover:text-brand-primary">
              Privacy Policy
            </Link>
          </p>
          <p>Not a law firm. Content is for informational purposes only.</p>
        </div>
      </Container>
    </footer>
  );
}
