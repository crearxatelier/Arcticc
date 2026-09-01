"use client";

import Image from "next/image";
import Link from "next/link";
import { lifestyleImages, products } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import styles from "./ShoppableGallery.module.css";

export function ShoppableGallery() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.head}>
          <p className="eyebrow">Lived-in moments</p>
          <h2>Shoppable from the frame</h2>
        </div>
        <div className={styles.grid}>
          {lifestyleImages.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            if (!product) return null;
            return (
              <Link
                key={item.id}
                href={`/products/${product.handle}`}
                className={styles.tile}
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 800px) 50vw, 25vw"
                />
                <div className={styles.hover}>
                  <div className={styles.chip}>
                    <span
                      className={styles.dot}
                      style={{ background: product.color }}
                    />
                    <div>
                      <strong>{product.name}</strong>
                      <span>{formatPrice(product.price)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
