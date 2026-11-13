import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export default function Button({ href, children, variant = "primary" }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-semibold transition-colors";

  const styles =
    variant === "primary"
      ? "bg-brand-primary text-brand-white hover:bg-brand-dark"
      : "bg-brand-white text-brand-primary border border-brand-primary hover:bg-brand-cream";

  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}
