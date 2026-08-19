"use client";

import { useCart } from "@/context/CartContext";
import { formatMoney } from "@/lib/shopify";
import { GlassButton } from "./GlassButton";
import { cn } from "@/lib/utils";
import styles from "./CartDrawer.module.css";

export function CartDrawer() {
  const { lines, open, setOpen, updateQuantity, removeItem, checkout } =
    useCart();

  return (
    <div
      className={cn(styles.overlay, open && styles.open)}
      role="dialog"
      aria-modal="true"
      aria-label="Bag"
      aria-hidden={!open}
      onClick={() => setOpen(false)}
    >
      <aside
        className={styles.panel}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.top}>
          <h2 className={styles.title}>Bag</h2>
          <button
            type="button"
            className={styles.close}
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </div>

        {lines.length === 0 ? (
          <p className={styles.empty}>Your bag is empty.</p>
        ) : (
          <div className={styles.lines}>
            {lines.map((line) => (
              <article key={line.variantId} className={styles.line}>
                {line.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className={styles.thumb}
                    src={line.image}
                    alt=""
                  />
                ) : (
                  <div className={styles.thumb} />
                )}
                <div className={styles.meta}>
                  <h3>{line.title}</h3>
                  <p>Size {line.size}</p>
                  <span>{formatMoney(line.price)}</span>
                  <div className={styles.qty}>
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() =>
                        updateQuantity(line.variantId, line.quantity - 1)
                      }
                    >
                      −
                    </button>
                    <span>{line.quantity}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() =>
                        updateQuantity(line.variantId, line.quantity + 1)
                      }
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => removeItem(line.variantId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className={styles.footer}>
          <p className={styles.note}>
            Checkout opens on Arcticc Shopify so tax, shipping, and payment stay
            with the live store.
          </p>
          <GlassButton onClick={checkout} ariaLabel="Checkout on Shopify">
            Checkout on Shopify <span className="arrow">→</span>
          </GlassButton>
        </div>
      </aside>
    </div>
  );
}
