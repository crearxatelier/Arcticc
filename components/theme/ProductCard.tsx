"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import styles from "./ProductCard.module.css";

const badgeLabel: Record<NonNullable<Product["badge"]>, string> = {
  bestseller: "Bestseller",
  new: "New",
  sale: "Sale",
  preorder: "Preorder",
};

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <article className={styles.card}>
      <Link href={`/products/${product.handle}`} className={styles.media}>
        {(product.badge || product.saleLabel) && (
          <span
            className={`${styles.badge} ${
              product.badge === "sale"
                ? styles.sale
                : product.badge === "new"
                  ? styles.new
                  : product.badge === "preorder"
                    ? styles.preorder
                    : ""
            }`}
          >
            {product.saleLabel || (product.badge && badgeLabel[product.badge])}
          </span>
        )}
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 700px) 50vw, 20vw"
          className={styles.image}
        />
        <span
          className={styles.swatch}
          style={{ background: product.color }}
          aria-hidden="true"
        />
      </Link>
      <div className={styles.body}>
        <Link href={`/products/${product.handle}`}>
          <h3>{product.name}</h3>
        </Link>
        <p className={styles.tagline}>{product.tagline}</p>
        <div className={styles.meta}>
          <div className={styles.price}>
            <span>{formatPrice(product.price)}</span>
            {product.compareAt && (
              <s>{formatPrice(product.compareAt)}</s>
            )}
          </div>
          <p className={styles.rating}>
            <span aria-hidden="true">★</span> {product.rating} · {product.reviews}
          </p>
        </div>
        <button
          type="button"
          className={styles.cta}
          onClick={() => addItem(product)}
        >
          Quick add
        </button>
      </div>
    </article>
  );
}
