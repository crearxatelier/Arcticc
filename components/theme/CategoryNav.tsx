import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/products";
import styles from "./CategoryNav.module.css";

export function CategoryNav() {
  return (
    <section className={styles.section}>
      <div className="container">
        <p className="eyebrow" style={{ color: "rgba(255,255,255,0.65)" }}>
          Shop by need
        </p>
        <h2>Choose your current</h2>
        <ul className={styles.list}>
          {categories.map((cat) => (
            <li key={cat.id}>
              <Link href={`/collections?cat=${cat.id}`} className={styles.item}>
                <span className={styles.thumb}>
                  <Image src={cat.image} alt="" fill sizes="80px" />
                </span>
                <span>
                  <strong>{cat.name}</strong>
                  <em>{cat.description}</em>
                </span>
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
