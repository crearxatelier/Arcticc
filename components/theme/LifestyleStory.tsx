import Image from "next/image";
import Link from "next/link";
import styles from "./LifestyleStory.module.css";

export function LifestyleStory() {
  return (
    <>
      <section className={styles.block} id="story">
        <div className={styles.media}>
          <Image
            src="https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?auto=format&fit=crop&w=1200&q=80"
            alt="Person enjoying a green tonic outdoors"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
        <div className={`${styles.copy} ${styles.mineral}`}>
          <p className="eyebrow">Our process</p>
          <h2>Pressed slow. Delivered cold.</h2>
          <p>
            Every Rivulet bottle starts with whole produce—never concentrate.
            We press at low temperature to keep vitamins intact, then seal and
            ship in insulated packs within hours.
          </p>
          <Link href="/collections" className="btn btn-primary">
            Explore the line
          </Link>
        </div>
      </section>

      <section className={`${styles.block} ${styles.reverse}`}>
        <div className={styles.media}>
          <Image
            src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80"
            alt="Fresh produce bowl with berries and greens"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
        <div className={`${styles.copy} ${styles.clay}`}>
          <p className="eyebrow" style={{ color: "rgba(255,255,255,0.7)" }}>
            Flavor × nutrition
          </p>
          <h2>Flavor that earns its place</h2>
          <p>
            Bright citrus for lift. Soft greens for clarity. Ruby beets for
            recovery. Each blend is built around one clear job—never a kitchen
            sink of trends.
          </p>
          <Link href="/#ritual" className="btn btn-ghost-light">
            Match a blend
          </Link>
        </div>
      </section>

      <section className={styles.block}>
        <div className={styles.media}>
          <Image
            src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=80"
            alt="Athlete recovering with a fresh drink"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
        <div className={`${styles.copy} ${styles.tide}`}>
          <p className="eyebrow" style={{ color: "rgba(255,255,255,0.7)" }}>
            For every pace
          </p>
          <h2>Tonics for every lifestyle</h2>
          <p>
            Morning focus, midday greens, evening unwind. Build a rhythm that
            fits your week—and let the bottles arrive already cold.
          </p>
          <Link href="/#box" className="btn btn-citron">
            Build a week box
          </Link>
        </div>
      </section>
    </>
  );
}
