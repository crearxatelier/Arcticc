"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Navigation.module.css";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

const LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/shop", label: "Shop" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, setOpen } = useCart();

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
            <Link href="/" className={styles.brand} aria-label="Guna, Visual Designer">
              <span>Guna</span>
              <span>Visual Designer</span>
            </Link>

            <nav className={styles.nav} aria-label="Primary">
              {LINKS.map((link) =>
                link.href.startsWith("/#") ? (
                  <a key={link.href} href={link.href} className={styles.link}>
                    {link.label}
                  </a>
                ) : (
                  <Link key={link.href} href={link.href} className={styles.link}>
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.bag}
                onClick={() => setOpen(true)}
                aria-label={count ? `Open bag, ${count} items` : "Open bag"}
              >
                Bag{count ? ` ${count}` : ""}
              </button>
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
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={LINKS} />
    </>
  );
}
