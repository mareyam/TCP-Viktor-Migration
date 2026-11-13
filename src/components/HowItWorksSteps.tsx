const STEPS = [
  {
    title: "We scan",
    description:
      "Every week we check marketplaces, social platforms, domain registries, and the open web for anything touching your brand.",
  },
  {
    title: "We score",
    description:
      "Each result gets an AI conflict-risk score and a plain-English verdict: Act Now, Watch, or All Clear.",
  },
  {
    title: "We recommend",
    description:
      "For every alert worth acting on, you get a specific recommendation — send a notice, file a takedown, or ignore it.",
  },
  {
    title: "We act",
    description:
      "Approve our recommendation and we handle the enforcement, or use the ready-to-send template yourself.",
  },
];

export default function HowItWorksSteps() {
  return (
    <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {STEPS.map((step, index) => (
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
