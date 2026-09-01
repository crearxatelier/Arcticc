import Link from "next/link";
import { products } from "@/data/products";
import { ProductCard } from "./ProductCard";
import styles from "./FeaturedProducts.module.css";

export function FeaturedProducts() {
  return (
    <section className={`section ${styles.section}`} id="shop">
      <div className="container">
        <div className={styles.head}>
          <div>
            <p className="eyebrow">Featured presses</p>
            <h2>Blends in the current</h2>
          </div>
          <Link href="/collections" className="btn btn-ghost">
            View all
          </Link>
        </div>
        <div className={styles.grid}>
          {products.slice(0, 5).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
