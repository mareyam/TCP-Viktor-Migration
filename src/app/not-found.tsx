import Section from "@/components/Section";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <Section>
      <h1 className="font-heading text-3xl font-bold text-brand-dark sm:text-4xl">
        Page Not Found
      </h1>
      <p className="mt-4 text-brand-dark">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <div className="mt-6">
        <Button href="/">Back to Home</Button>
      </div>
    </Section>
  );
}
