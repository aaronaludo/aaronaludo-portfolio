"use client";

import { useState } from "react";

const FAQAccordion = () => {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={`overflow-hidden rounded-2xl border ${open ? "border-white/40" : "border-white/15"} bg-white/5 transition`}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-3 border-b border-white/10 px-4 py-3 text-left"
      >
        <p className="text-base font-semibold text-white">
          How do I cancel my subscription?
        </p>
        <ChevronIcon open={open} />
      </button>

      {open ? (
        <div className="space-y-3 px-4 py-4 text-sm text-white/80">
          <p>
            If you want to cancel your subscription, here is how it works depending on your platform:
          </p>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-white">For iPhone (Apple):</p>
            <p className="text-sm text-white/75">
              Go to Settings &gt; [Your Name] &gt; Subscriptions and cancel there.
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-white">For Android (Google Play):</p>
            <p className="text-sm text-white/75">
              Open the Play Store &gt; tap your profile &gt; Payments and subscriptions &gt; Subscriptions.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    aria-hidden
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={`h-5 w-5 fill-none stroke-current text-white/80 transition ${open ? "rotate-0" : "-rotate-180"}`}
  >
    <path
      d="m6 14 6-6 6 6"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default FAQAccordion;
