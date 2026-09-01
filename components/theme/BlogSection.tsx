import Image from "next/image";
import { blogPosts } from "@/data/products";
import styles from "./BlogSection.module.css";

export function BlogSection() {
  return (
    <section className={`section ${styles.section}`} id="journal">
      <div className="container">
        <div className={styles.head}>
          <p className="eyebrow">From the journal</p>
          <h2>Notes from the press room</h2>
        </div>
        <div className={styles.grid}>
          {blogPosts.map((post) => (
            <article key={post.id} className={styles.card}>
              <div className={styles.media}>
                <Image
                  src={post.image}
                  alt=""
                  fill
                  sizes="(max-width: 800px) 100vw, 33vw"
                />
              </div>
              <p className={styles.date}>{post.date}</p>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
