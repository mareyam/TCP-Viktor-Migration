"use client";

import { useState } from "react";

type FAQ = {
  question: string;
  answer: string;
};

export default function FAQList({ items }: { items: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-brand-primary/10">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question} className="py-4">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-heading text-base font-semibold text-brand-dark underline decoration-brand-primary/30 underline-offset-4">
                {item.question}
              </span>
              <span
                className={`shrink-0 text-brand-primary transition-transform ${isOpen ? "rotate-90" : ""}`}
                aria-hidden="true"
              >
                ▸
              </span>
            </button>
            {isOpen && (
              <p className="mt-3 text-sm text-brand-dark">{item.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
