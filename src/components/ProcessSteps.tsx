type Step = {
  title: string;
  description: string;
};

export default function ProcessSteps({ steps }: { steps: Step[] }) {
  return (
    <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <li key={step.title}>
          <span className="font-heading text-sm font-bold text-brand-magenta">
            Step {index + 1}
          </span>
          <h3 className="mt-2 font-heading text-lg font-bold text-brand-dark">
            {step.title}
          </h3>
          <p className="mt-2 text-sm text-brand-dark">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
