"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./MobileMenu.module.css";
import { lockBodyScroll, unlockBodyScroll, trapFocus } from "@/lib/focus";
import { cn } from "@/lib/utils";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  links: Array<{ href: string; label: string }>;
};

export function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    lockBodyScroll();
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (panelRef.current) trapFocus(e, panelRef.current);
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      unlockBodyScroll();
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-menu"
      ref={panelRef}
      className={cn(styles.overlay, open && styles.open)}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      aria-hidden={!open}
    >
      <div className={styles.top}>
        <p className={styles.brand}>Guna / Visual Designer</p>
        <button
          ref={closeRef}
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close menu"
        >
          Close
        </button>
      </div>

      <nav className={styles.nav} aria-label="Mobile">
        {links.map((link) =>
          link.href.startsWith("/#") ? (
            <a
              key={link.href}
              href={link.href}
              className={styles.link}
              tabIndex={open ? 0 : -1}
              onClick={onClose}
            >
              {link.label}
            </a>
          ) : (
            <Link
              key={link.href}
              href={link.href}
              className={styles.link}
              tabIndex={open ? 0 : -1}
              onClick={onClose}
            >
              {link.label}
            </Link>
          )
        )}
      </nav>

      <p className={styles.meta}>Social / Edited · Coimbatore</p>
    </div>
  );
}
