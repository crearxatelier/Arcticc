"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { products, categories } from "@/data/products";
import { ProductCard } from "@/components/theme/ProductCard";
import styles from "./collections.module.css";
import { Suspense } from "react";

function CollectionsContent() {
  const searchParams = useSearchParams();
  const cat = searchParams.get("cat");

  const filtered = useMemo(() => {
    if (!cat) return products;
    const map: Record<string, string[]> = {
      energy: ["Energy"],
      greens: ["Greens"],
      recovery: ["Recovery"],
      calm: ["Calm"],
      glow: ["Glow"],
    };
    const allowed = map[cat];
    if (!allowed) return products;
    return products.filter((p) => allowed.includes(p.category));
  }, [cat]);

  const title =
    categories.find((c) => c.id === cat)?.name ?? "All blends";

  return (
    <div className={styles.page}>
      <div className="container">
        <header className={styles.head}>
          <p className="eyebrow">Collection</p>
          <h1>{title}</h1>
          <p>
            Cold-pressed botanical tonics—shop by ritual or browse the full
            line.
          </p>
        </header>

        <div className={styles.filters}>
          <a
            href="/collections"
            className={!cat ? styles.active : undefined}
          >
            All
          </a>
          {categories.map((c) => (
            <a
              key={c.id}
              href={`/collections?cat=${c.id}`}
              className={cat === c.id ? styles.active : undefined}
            >
              {c.name}
            </a>
          ))}
        </div>

        <div className={styles.grid}>
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CollectionsPage() {
  return (
    <Suspense fallback={<div className={styles.page} />}>
      <CollectionsContent />
    </Suspense>
  );
}
