import { ShopGrid } from "@/components/ShopGrid";
import { getShopifyProducts, type ShopifyProduct } from "@/lib/shopify";
import styles from "@/components/ShopPage.module.css";

export const metadata = {
  title: "Shop — ARCTICC Collection I",
  description: "Live Shopify catalog for ARCTICC Collection I.",
};

export default async function ShopPage() {
  let products: ShopifyProduct[] = [];
  try {
    products = await getShopifyProducts();
  } catch {
    products = [];
  }

  return (
    <section className={`container ${styles.page}`}>
      <div className={styles.hero}>
        <p className={styles.eyebrow}>Connected to arcticc.store</p>
        <h1 className={styles.title}>
          Collection
          <br />
          <em>I</em>
        </h1>
        <p className={styles.support}>
          Four hoodies from the live Shopify store. Add a size to the bag, then
          check out on Shopify for shipping, tax, and payment.
        </p>
      </div>
      {products.length ? (
        <ShopGrid products={products} />
      ) : (
        <p className={styles.support}>
          The catalog could not be loaded. Open arcticc.store to shop directly.
        </p>
      )}
    </section>
  );
}
