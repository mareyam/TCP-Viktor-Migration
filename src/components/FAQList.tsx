type FAQ = {
  question: string;
  answer: string;
};

export default function FAQList({ items }: { items: FAQ[] }) {
  return (
    <div className="mx-auto max-w-3xl divide-y divide-brand-primary/10">
      {items.map((item) => (
        <div key={item.question} className="py-6">
          <h3 className="font-heading text-lg font-bold text-brand-dark">
            {item.question}
          </h3>
          <p className="mt-2 text-sm text-brand-dark">{item.answer}</p>
        </div>
      ))}
    </div>
  );
}
