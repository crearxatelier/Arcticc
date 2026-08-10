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
