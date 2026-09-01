"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import styles from "./CartDrawer.module.css";

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, subtotal } =
    useCart();

  return (
    <>
      <div
        className={`${styles.backdrop} ${isOpen ? styles.open : ""}`}
        onClick={closeCart}
        aria-hidden={!isOpen}
      />
      <aside
        className={`${styles.drawer} ${isOpen ? styles.open : ""}`}
        aria-hidden={!isOpen}
        aria-label="Shopping cart"
      >
        <div className={styles.head}>
          <h2>Your box</h2>
          <button type="button" onClick={closeCart} aria-label="Close cart">
            Close
          </button>
        </div>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <p>Your cart is waiting for a first pour.</p>
            <button type="button" className="btn btn-primary" onClick={closeCart}>
              Continue shopping
            </button>
          </div>
        ) : (
          <>
            <ul className={styles.list}>
              {items.map((item) => (
                <li key={`${item.product.id}-${item.sizeId}`}>
                  <div className={styles.thumb}>
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      sizes="72px"
                    />
                  </div>
                  <div className={styles.meta}>
                    <h3>{item.product.name}</h3>
                    <p>
                      {item.sizeLabel} · {formatPrice(item.price)}
                    </p>
                    <div className={styles.qty}>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.sizeId,
                            item.quantity - 1
                          )
                        }
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.sizeId,
                            item.quantity + 1
                          )
                        }
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className={styles.remove}
                        onClick={() =>
                          removeItem(item.product.id, item.sizeId)
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className={styles.foot}>
              <div className={styles.subtotal}>
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <p className={styles.note}>Shipping calculated at checkout</p>
              <button type="button" className="btn btn-citron" style={{ width: "100%" }}>
                Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
