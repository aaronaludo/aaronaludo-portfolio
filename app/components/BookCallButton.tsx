"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { HiOutlineCalendar } from "react-icons/hi";

const CAL_NAMESPACE = "30min";
const CAL_LINK = "aaron-aludo-z3ljt1/30min";

export default function BookCallButton() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <button
      type="button"
      aria-label="Book my Cal"
      data-cal-namespace={CAL_NAMESPACE}
      data-cal-link={CAL_LINK}
      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
      className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-semibold text-black shadow-md transition duration-150 ease-out hover:bg-white/90 hover:shadow-lg"
    >
      <HiOutlineCalendar className="h-4 w-4" strokeWidth={2} />
      <span>Book my Cal</span>
    </button>
  );
}
