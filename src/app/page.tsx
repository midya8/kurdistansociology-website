import Link from "next/link";
import { locales, localeMeta, defaultLocale } from "@/i18n/config";

export const metadata = {
  title: "KISA — Kurdistan International Sociological Association",
  description: "Independent, scholarly, non-partisan association for sociology on Kurdistan, Kurdish societies, and the diaspora.",
};

export default function RootPage() {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="refresh" content={`0; url=/${defaultLocale}/`} />
      </head>
      <body
        style={{
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
          background: "#faf8f3",
          color: "#141a30",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 520 }}>
          <h1 style={{ fontSize: "1.75rem", marginBottom: "0.5rem", fontWeight: 600 }}>KISA</h1>
          <p style={{ marginBottom: "2rem", color: "#5c667a", fontSize: "0.95rem" }}>
            Kurdistan International Sociological Association
          </p>
          <p style={{ marginBottom: "1.25rem", color: "#5c667a", fontSize: "0.85rem" }}>
            Choose a language / زمان هەڵبژێرە / Zimanê hilbijêre
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            {locales.map((l) => (
              <Link
                key={l}
                href={`/${l}/`}
                style={{
                  padding: "0.7rem 1.4rem",
                  border: "1px solid #1a2f58",
                  borderRadius: 999,
                  textDecoration: "none",
                  color: "#1a2f58",
                  fontSize: "0.95rem",
                }}
              >
                {localeMeta[l].label}
              </Link>
            ))}
          </div>
        </div>
      </body>
    </html>
  );
}
