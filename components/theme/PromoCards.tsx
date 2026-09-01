import Image from "next/image";
import Link from "next/link";
import styles from "./PromoCards.module.css";

export function PromoCards() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.grid}`}>
        <Link href="/collections?cat=recovery" className={styles.card}>
          <Image
            src="https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=1100&q=80"
            alt=""
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
          />
          <div className={styles.copy}>
            <p className="eyebrow" style={{ color: "rgba(255,255,255,0.7)" }}>
              Limited
            </p>
            <h3>Up to 16% off recovery presses</h3>
            <span>Shop recovery →</span>
          </div>
        </Link>
        <Link href="/collections?cat=energy" className={styles.card}>
          <Image
            src="https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=1100&q=80"
            alt=""
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
          />
          <div className={styles.copy}>
            <p className="eyebrow" style={{ color: "rgba(255,255,255,0.7)" }}>
              Members
            </p>
            <h3>Subscribe & save on energy blends</h3>
            <span>Shop energy →</span>
          </div>
        </Link>
      </div>
    </section>
  );
}
