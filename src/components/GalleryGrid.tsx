"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export function GalleryGrid({
  images,
  eventKey,
}: {
  images: string[];
  eventKey: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);
  const prev = useCallback(() => {
    setOpenIndex((i) =>
      i === null ? null : (i - 1 + images.length) % images.length
    );
  }, [images.length]);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, close, next, prev]);

  const thumbFor = (src: string) =>
    src.replace(`/gallery/${eventKey}/`, `/gallery/${eventKey}/thumb/`);

  const isOpen = mounted && openIndex !== null;

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {images.map((src, i) => (
          <div
            key={src}
            role="button"
            tabIndex={0}
            onClick={() => setOpenIndex(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setOpenIndex(i);
              }
            }}
            className="group relative aspect-square overflow-hidden rounded-lg ring-1 ring-border bg-surface block cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-accent select-none"
            aria-label={`Open image ${i + 1} of ${images.length}`}
          >
            <Image
              src={thumbFor(src)}
              alt=""
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
              className="object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "rgba(0,0,0,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={close}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "3rem 1rem",
              boxSizing: "border-box",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[openIndex]}
              alt=""
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                userSelect: "none",
              }}
              draggable={false}
            />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            aria-label="Close"
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              width: 44,
              height: 44,
              borderRadius: 999,
              border: "none",
              background: "rgba(255,255,255,0.15)",
              color: "white",
              fontSize: 28,
              lineHeight: 1,
              cursor: "pointer",
            }}
          >
            ×
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous image"
            style={{
              position: "absolute",
              left: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              width: 48,
              height: 48,
              borderRadius: 999,
              border: "none",
              background: "rgba(255,255,255,0.15)",
              color: "white",
              fontSize: 30,
              lineHeight: 1,
              cursor: "pointer",
            }}
          >
            ‹
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next image"
            style={{
              position: "absolute",
              right: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              width: 48,
              height: 48,
              borderRadius: 999,
              border: "none",
              background: "rgba(255,255,255,0.15)",
              color: "white",
              fontSize: 30,
              lineHeight: 1,
              cursor: "pointer",
            }}
          >
            ›
          </button>

          <div
            style={{
              position: "absolute",
              bottom: "1rem",
              left: "50%",
              transform: "translateX(-50%)",
              color: "rgba(255,255,255,0.85)",
              fontSize: 14,
              fontVariantNumeric: "tabular-nums",
              userSelect: "none",
            }}
          >
            {openIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
