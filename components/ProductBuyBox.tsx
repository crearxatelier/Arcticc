"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";
import {
  findVariant,
  getProductImages,
  getSizeOption,
  type ShopifyProduct,
} from "@/lib/shopify";
import { GlassButton } from "./GlassButton";
import { cn } from "@/lib/utils";
import styles from "./ProductBuyBox.module.css";

export function ProductBuyBox({ product }: { product: ShopifyProduct }) {
  const sizes = getSizeOption(product)?.values ?? [];
  const [size, setSize] = useState(sizes[2] ?? sizes[0] ?? "");
  const [error, setError] = useState("");
  const { addItem } = useCart();

  const variant = useMemo(
    () => (size ? findVariant(product, size) : product.variants[0]),
    [product, size]
  );
  const image = getProductImages(product)[0];

  const onAdd = () => {
    if (!variant) {
      setError("This size is not available yet.");
      return;
    }
    setError("");
    addItem({
      variantId: variant.id,
      handle: product.handle,
      title: product.title,
      size: variant.option1 ?? size,
      price: variant.price,
      image: image?.src,
    });
  };

  return (
    <div className={styles.box}>
      {sizes.length > 0 ? (
        <div className={styles.sizes}>
          <span>Select size</span>
          <div className={styles.row}>
            {sizes.map((value) => (
              <button
                key={value}
                type="button"
                className={cn(styles.size, size === value && styles.active)}
                onClick={() => setSize(value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {error ? <p className={styles.error}>{error}</p> : null}

      <GlassButton onClick={onAdd} ariaLabel={`Add ${product.title} to bag`}>
        Add to bag{size ? ` — ${size}` : ""}
      </GlassButton>

      <p className={styles.sku}>
        {variant?.sku ? `SKU ${variant.sku} · ` : ""}
        Live from Shopify · Checkout on arcticc.store
      </p>
    </div>
  );
}
