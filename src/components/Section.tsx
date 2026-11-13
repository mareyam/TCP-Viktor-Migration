import type { ReactNode } from "react";
import Container from "./Container";

export default function Section({ children }: { children: ReactNode }) {
  return (
    <section className="py-12 sm:py-16">
      <Container>{children}</Container>
    </section>
  );
}
