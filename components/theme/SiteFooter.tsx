"use client";

import Link from "next/link";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div>
          <h2 className={styles.brand}>Rivulet</h2>
          <p className={styles.tagline}>
            Cold-pressed botanical tonics for quiet energy, soft greens, and
            evening calm.
          </p>
        </div>

        <div>
          <h3>Shop</h3>
          <ul>
            <li>
              <Link href="/collections">All blends</Link>
            </li>
            <li>
              <Link href="/collections?cat=energy">Energy</Link>
            </li>
            <li>
              <Link href="/collections?cat=greens">Greens</Link>
            </li>
            <li>
              <Link href="/#box">Build a week box</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3>Help</h3>
          <ul>
            <li>
              <a href="#story">Our process</a>
            </li>
            <li>
              <a href="#journal">Journal</a>
            </li>
            <li>
              <a href="#contact">Shipping</a>
            </li>
            <li>
              <a href="#contact">Returns</a>
            </li>
          </ul>
        </div>

        <div className={styles.newsletter} id="contact">
          <h3>Stay in the current</h3>
          <p>Seasonal blends, member drops, and quiet notes—no spam.</p>
          <form
            className={styles.form}
            onSubmit={(e) => e.preventDefault()}
          >
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email address"
              required
            />
            <button type="submit" className="btn btn-ink">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <p>
            © {new Date().getFullYear()} Rivulet Theme · Designed for
            Shopify-style storefronts
          </p>
          <div className={styles.pay} aria-hidden="true">
            <span>Visa</span>
            <span>MC</span>
            <span>Amex</span>
            <span>PayPal</span>
            <span>Shop Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
