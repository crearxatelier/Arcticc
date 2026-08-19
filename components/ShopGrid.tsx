import Link from "next/link";
import {
  formatMoney,
  getProductImages,
  type ShopifyProduct,
} from "@/lib/shopify";
import { getCollectionStory } from "@/data/collectionStories";
import styles from "./ShopGrid.module.css";

export function ShopGrid({ products }: { products: ShopifyProduct[] }) {
  return (
    <div className={styles.grid}>
      {products.map((product, index) => {
        const story = getCollectionStory(product.handle);
        const image = getProductImages(product)[0];
        const price = product.variants[0]?.price;

        return (
          <Link
            key={product.id}
            href={`/shop/${product.handle}`}
            className={styles.card}
          >
            <div className={styles.media}>
              {image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={image.src} alt={image.alt || product.title} />
              ) : null}
            </div>
            <div className={styles.meta}>
              <p className={styles.number}>
                {story?.number ?? String(index + 1).padStart(2, "0")}
              </p>
              <h2 className={styles.title}>{product.title}</h2>
              {story ? <p className={styles.meaning}>{story.meaningTitle}</p> : null}
              {price ? (
                <p className={styles.price}>{formatMoney(price)}</p>
              ) : null}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
