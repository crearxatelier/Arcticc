import Link from "next/link";
import { siteInfo } from "@/data/projects";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.brand}>
          {siteInfo.name} / {siteInfo.role}
        </p>
        <div className={styles.meta}>
          <p>© 2026 Guna</p>
          <p>{siteInfo.location}</p>
          <Link href="/shop">Shop</Link>
          <a href="https://arcticc.store" target="_blank" rel="noopener noreferrer">
            Shopify
          </a>
          <a href={`mailto:${siteInfo.email}`}>Email</a>
          <a
            href={siteInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href={siteInfo.behance} target="_blank" rel="noopener noreferrer">
            Behance
          </a>
        </div>
      </div>
    </footer>
  );
}
