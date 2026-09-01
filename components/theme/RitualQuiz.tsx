import Link from "next/link";
import Image from "next/image";
import styles from "./RitualQuiz.module.css";

export function RitualQuiz() {
  return (
    <section className={styles.section} id="ritual">
      <Image
        src="https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=1800&q=80"
        alt=""
        fill
        sizes="100vw"
        className={styles.bg}
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <p className="eyebrow" style={{ color: "rgba(255,255,255,0.75)" }}>
          Guided match
        </p>
        <h2>Find your ritual</h2>
        <p>
          Three quiet questions. We&apos;ll match you to the presses that fit
          your mornings, recovery, and evenings.
        </p>
        <Link href="/collections" className="btn btn-citron">
          Start
        </Link>
      </div>
    </section>
  );
}
