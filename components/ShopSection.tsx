import Link from "next/link";
import { getShopifyProducts, type ShopifyProduct } from "@/lib/shopify";
import { ShopGrid } from "./ShopGrid";
import styles from "./ShopSection.module.css";

export async function ShopSection() {
  let products: ShopifyProduct[] = [];
  try {
    products = await getShopifyProducts();
  } catch {
    products = [];
  }

  return (
    <section id="shop" className={styles.section} aria-label="Shop">
      <div className="container">
        <h2 className={styles.heading}>
          <span className={styles.bold}>ARCTICC</span>
          <span className={styles.italic}>Collection I</span>
        </h2>
        <p className={styles.support}>
          Live inventory from the Shopify store — four northern stories, ready
          to check out on arcticc.store.
        </p>
        {products.length ? (
          <ShopGrid products={products} />
        ) : (
          <p className={styles.empty}>
            The store catalog could not be loaded right now. Visit arcticc.store
            to shop Collection I.
          </p>
        )}
        <Link href="/shop" className={styles.cta}>
          Open the shop →
        </Link>
      </div>
    </section>
  );
}
