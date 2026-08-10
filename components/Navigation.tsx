"use client";

import { useEffect, useState } from "react";
import styles from "./Navigation.module.css";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={cn(styles.header, scrolled && styles.scrolled)} data-nav>
        <div className="container">
          <div className={styles.inner}>
            <a href="#top" className={styles.brand} aria-label="Guna, Visual Designer">
              <span>Guna</span>
              <span>Visual Designer</span>
            </a>

            <nav className={styles.nav} aria-label="Primary">
              {LINKS.map((link) => (
                <a key={link.href} href={link.href} className={styles.link}>
                  {link.label}
                </a>
              ))}
            </nav>

            <button
              type="button"
              className={styles.menuToggle}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(true)}
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={LINKS} />
    </>
  );
}
