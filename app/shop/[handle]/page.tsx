import Link from "next/link";
import { notFound } from "next/navigation";
import { ShopGrid } from "@/components/ShopGrid";
import { ProductBuyBox } from "@/components/ProductBuyBox";
import { getCollectionStory } from "@/data/collectionStories";
import {
  formatMoney,
  getProductImages,
  getShopifyProduct,
  getShopifyProducts,
  stripHtml,
} from "@/lib/shopify";
import styles from "@/components/ShopPage.module.css";

type PageProps = {
  params: Promise<{ handle: string }>;
};

export async function generateStaticParams() {
  try {
    const products = await getShopifyProducts();
    return products.map((product) => ({ handle: product.handle }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { handle } = await params;
  const product = await getShopifyProduct(handle);
  return {
    title: product ? `${product.title} — ARCTICC` : "Product — ARCTICC",
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { handle } = await params;
  const product = await getShopifyProduct(handle);
  if (!product) notFound();

  const story = getCollectionStory(product.handle);
  const images = getProductImages(product);
  const others = (await getShopifyProducts()).filter(
    (item) => item.handle !== product.handle
  );
  const price = product.variants[0]?.price;
  const care = stripHtml(product.body_html);

  return (
    <article className={`container ${styles.page}`}>
      <div className={styles.product}>
        <div className={styles.gallery}>
          <div className={styles.mainImage}>
            {images[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={images[0].src} alt={images[0].alt || product.title} />
            ) : null}
          </div>
          {images.length > 1 ? (
            <div className={styles.thumbs}>
              {images.slice(1, 5).map((image) => (
                <span key={image.id}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image.src} alt={image.alt || ""} />
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className={styles.info}>
          <p className={styles.eyebrow}>
            {story
              ? `${story.number} · ${story.subtitle}`
              : product.vendor || "ARCTICC"}
          </p>
          <h1>{product.title}</h1>
          {story ? <p className={styles.meaning}>{story.meaningTitle}</p> : null}
          {price ? <p className={styles.price}>{formatMoney(price)}</p> : null}
          {story ? <p className={styles.desc}>{story.description}</p> : null}
          {care ? <p className={styles.care}>{care}</p> : null}
          <ProductBuyBox product={product} />
        </div>
      </div>

      {others.length ? (
        <section className={styles.more} aria-label="More from the collection">
          <h2>More from Collection I</h2>
          <ShopGrid products={others} />
        </section>
      ) : (
        <Link href="/shop">Back to shop</Link>
      )}
    </article>
  );
}
