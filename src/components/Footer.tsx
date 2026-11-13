import Link from "next/link";
import Container from "./Container";

const FOOTER_LINKS = [
  { href: "/weekly-brand-protection/", label: "Weekly Brand Protection" },
  { href: "/pricing/", label: "Pricing" },
  { href: "/faq/", label: "FAQ" },
  { href: "/privacy-policy/", label: "Privacy Policy" },
  { href: "/contact/", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-brand-primary/10 bg-brand-white">
      <Container>
        <div className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-brand-dark">
            &copy; {new Date().getFullYear()} Trademark Copyright Protection. All
            rights reserved.
          </p>
          <nav className="flex flex-wrap gap-4">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-brand-dark hover:text-brand-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
