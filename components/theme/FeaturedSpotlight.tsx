"use client";

import { useState } from "react";
import Image from "next/image";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import styles from "./FeaturedSpotlight.module.css";

export function FeaturedSpotlight() {
  const product = products[1];
  const { addItem } = useCart();
  const [sizeId, setSizeId] = useState(product.sizes[0].id);
  const size = product.sizes.find((s) => s.id === sizeId) ?? product.sizes[0];

  return (
    <section className={`section ${styles.section}`}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.media}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
        <div className={styles.copy}>
          <p className="eyebrow">Member favorite</p>
          <h2>{product.name}</h2>
          <p className={styles.rating}>
            ★ {product.rating} · {product.reviews} reviews
          </p>
          <p className={styles.desc}>{product.description}</p>
          <p className={styles.price}>{formatPrice(size.price)}</p>

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
              className="btn btn-primary"
              onClick={() => addItem(product, sizeId)}
            >
              Add to cart
            </button>
            <button type="button" className="btn btn-ink">
              Buy it now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
