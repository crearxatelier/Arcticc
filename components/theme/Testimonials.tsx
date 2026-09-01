import { testimonials } from "@/data/products";
import styles from "./Testimonials.module.css";

export function Testimonials() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.head}>
          <p className="eyebrow">Social proof</p>
          <h2>Loved by thousands</h2>
        </div>
        <div className={styles.grid}>
          {testimonials.map((t) => (
            <blockquote key={t.id} className={styles.quote}>
              <div className={styles.stars} aria-label={`${t.rating} stars`}>
                {"★★★★★"}
              </div>
              <p>“{t.quote}”</p>
              <footer>
                <strong>{t.name}</strong>
                <span>{t.location}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
