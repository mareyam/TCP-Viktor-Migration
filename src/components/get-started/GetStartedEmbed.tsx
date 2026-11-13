"use client";

import { useEffect } from "react";
import Script from "next/script";
import { GS_HTML } from "./markup";
import "./gs.css";

declare global {
  interface Window {
    gsInit?: () => void;
  }
}

// The /get-started form, plan picker, scan step and Stripe TEST checkout.
// Same markup + script as the live WordPress page, so sign-ups land in the
// same place (tcp-scanner Convex /signup and /lens/signup-scan).
export default function GetStartedEmbed() {
  useEffect(() => {
    // On client-side navigation the script is already loaded; run it again for the new DOM.
    window.gsInit?.();
  }, []);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: GS_HTML }} />
      <Script
        src="/get-started/gs.js"
        strategy="afterInteractive"
        onReady={() => window.gsInit?.()}
      />
    </>
  );
}
