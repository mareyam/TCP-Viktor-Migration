import Section from "./Section";

export default function PagePlaceholder({ title }: { title: string }) {
  return (
    <Section>
      <h1 className="font-heading text-3xl font-bold text-brand-dark sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 text-brand-dark">
        Content for this page is coming soon.
      </p>
    </Section>
  );
}
