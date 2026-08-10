"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CursorLabel.module.css";
import { isTouchDevice, prefersReducedMotion } from "@/lib/utils";

type CursorLabelProps = {
  label?: string;
  active: boolean;
};

export function CursorLabel({
  label = "VIEW WORK →",
  active,
}: CursorLabelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (prefersReducedMotion() || isTouchDevice()) {
      setEnabled(false);
      return;
    }
    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const tick = () => {
      current.current.x += (pos.current.x - current.current.x) * 0.18;
      current.current.y += (pos.current.y - current.current.y) * 0.18;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove);
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      className={`${styles.label} glass ${active ? styles.visible : ""}`}
      aria-hidden="true"
    >
      {label}
    </div>
  );
}
