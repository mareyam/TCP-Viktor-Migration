import Link from "next/link";
import Image from "next/image";
import Container from "./Container";

const NAV_LINKS = [
  { href: "/brand-owners/", label: "Brand Owners" },
  { href: "/law-firms/", label: "Law Firms" },
  { href: "/how-it-works/", label: "How It Works" },
  { href: "/pricing/", label: "Pricing" },
  { href: "/faq/", label: "FAQ" },
  { href: "/blog/", label: "Blog" },
  { href: "/contact/", label: "Contact" },
];

export default function Header() {
  return (
    <header className="border-b border-brand-primary/10 bg-brand-white">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
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
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-brand-dark hover:text-brand-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/get-started/"
            className="rounded-md bg-brand-primary px-4 py-2 text-sm font-semibold text-brand-white hover:bg-brand-dark"
          >
            Get Started
          </Link>
        </div>
      </Container>
    </header>
  );
}
