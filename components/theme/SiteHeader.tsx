"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import styles from "./SiteHeader.module.css";

const navLeft = [
  { href: "/collections", label: "Shop" },
  { href: "/#ritual", label: "Find your ritual" },
  { href: "/#story", label: "About" },
];

export function SiteHeader() {
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <div className={styles.announce}>
        <p>Free cold delivery on orders over $50 — use code RIVULET</p>
        <div className={styles.social} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
      <header
        className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${menuOpen ? styles.menuOpen : ""}`}
      >
        <div className={styles.inner}>
          <nav className={styles.navLeft} aria-label="Primary">
            {navLeft.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <Link href="/" className={styles.logo} aria-label="Rivulet home">
            Rivulet
          </Link>

          <div className={styles.utils}>
            <button type="button" className={styles.utilBtn} aria-label="Search">
              <SearchIcon />
            </button>
            <button type="button" className={styles.utilBtn} aria-label="Account">
              <UserIcon />
            </button>
            <button
              type="button"
              className={styles.cartBtn}
              onClick={openCart}
              aria-label={`Open cart, ${count} items`}
            >
              <BagIcon />
              <span className={styles.count}>{count}</span>
            </button>
            <button
              type="button"
              className={styles.menuToggle}
              aria-expanded={menuOpen}
              aria-label="Menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={`${styles.mobile} ${menuOpen ? styles.mobileOpen : ""}`}>
        <nav>
          {navLeft.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/collections" onClick={() => setMenuOpen(false)}>
            All collections
          </Link>
        </nav>
      </div>
    </>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
      <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M5 19.5c1.5-3.2 4-4.8 7-4.8s5.5 1.6 7 4.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 8h12l-.8 11.2a1.5 1.5 0 0 1-1.5 1.4H8.3a1.5 1.5 0 0 1-1.5-1.4L6 8Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M9 8V7a3 3 0 0 1 6 0v1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
