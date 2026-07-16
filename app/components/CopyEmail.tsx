"use client";

import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState("Copy email");

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("Email copied");
      window.setTimeout(() => setStatus("Copy email"), 3000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button className="copy-email" type="button" onClick={copyEmail}>
      {status}
      <span className="visually-hidden" aria-live="polite">
        {status === "Email copied" ? `${email} copied to clipboard` : ""}
      </span>
    </button>
  );
}
