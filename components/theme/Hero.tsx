import Link from "next/link";
import Image from "next/image";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-label="Rivulet hero">
      <div className={styles.media} aria-hidden="true">
        <Image
          src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=2000&q=80"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.bg}
        />
        <div className={styles.wash} />
        <div className={styles.productFloat}>
          <Image
            src="https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=900&q=80"
            alt=""
            fill
            sizes="(max-width: 900px) 55vw, 34vw"
            className={styles.product}
            priority
          />
        </div>
      </div>

      <div className={styles.content}>
        <p className={styles.brand}>Rivulet</p>
        <h1>
          Cold-pressed botanicals,
          <em> made to move with you</em>
        </h1>
        <p className={styles.sub}>
          Soft greens, bright citrus, and evening calms—pressed daily and
          delivered cold.
        </p>
        <div className={styles.actions}>
          <Link href="/collections" className="btn btn-citron">
            Shop blends
          </Link>
          <Link href="/#ritual" className="btn btn-ghost-light">
            Find your ritual
          </Link>
        </div>
      </div>
    </section>
  );
}
