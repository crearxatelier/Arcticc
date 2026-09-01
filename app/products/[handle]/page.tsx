"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { getProduct, products } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { ProductCard } from "@/components/theme/ProductCard";
import styles from "./product.module.css";

export default function ProductPage() {
  const params = useParams<{ handle: string }>();
  const product = getProduct(params.handle);
  const { addItem } = useCart();
  const [sizeId, setSizeId] = useState(
    () => product?.sizes[0]?.id ?? "250"
  );

  const related = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.id !== product.id && p.category === product.category)
      .slice(0, 4);
  }, [product]);

  if (!product) {
    notFound();
  }

  const size = product.sizes.find((s) => s.id === sizeId) ?? product.sizes[0];

  return (
    <div className={styles.page}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.gallery}>
          <div className={styles.heroImage}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 55vw"
            />
          </div>
          <div
            className={styles.colorBand}
            style={{ background: product.color }}
            aria-hidden="true"
          />
        </div>

        <div className={styles.info}>
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/collections">Shop</Link>
            <span>/</span>
            <span>{product.name}</span>
          </nav>

          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <p className={styles.tagline}>{product.tagline}</p>
          <p className={styles.rating}>
            ★ {product.rating} · {product.reviews} reviews
          </p>
          <p className={styles.price}>{formatPrice(size.price)}</p>
          <p className={styles.desc}>{product.description}</p>

          <div className={styles.sizes} role="group" aria-label="Size">
            {product.sizes.map((s) => (
              <button
                key={s.id}
                type="button"
                className={sizeId === s.id ? styles.active : undefined}
                onClick={() => setSizeId(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className="btn btn-citron"
              onClick={() => addItem(product, sizeId)}
            >
              Add to cart
            </button>
            <button type="button" className="btn btn-ink">
              Buy it now
            </button>
          </div>

          <ul className={styles.benefits}>
            {product.benefits.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>

          <details className={styles.panel} open>
            <summary>Ingredients</summary>
            <p>{product.ingredients.join(" · ")}</p>
          </details>

          <details className={styles.panel}>
            <summary>Nutrition</summary>
            <ul className={styles.nutrition}>
              {product.nutrition.map((n) => (
                <li key={n.label}>
                  <span>{n.label}</span>
                  <strong>{n.value}</strong>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>

      {related.length > 0 && (
        <section className={styles.related}>
          <div className="container">
            <h2>You may also like</h2>
            <div className={styles.relatedGrid}>
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
