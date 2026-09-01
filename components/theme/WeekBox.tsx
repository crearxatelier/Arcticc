"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import styles from "./WeekBox.module.css";

export function WeekBox() {
  const { addItem } = useCart();
  const options = products.slice(0, 5);
  const [selected, setSelected] = useState<string[]>([options[0].id, options[1].id]);

  const total = useMemo(() => {
    return options
      .filter((p) => selected.includes(p.id))
      .reduce((sum, p) => sum + p.price, 0);
  }, [options, selected]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const addSet = () => {
    options
      .filter((p) => selected.includes(p.id))
      .forEach((p) => addItem(p));
  };

  return (
    <section className={styles.section} id="box">
      <div className={`container ${styles.layout}`}>
        <div className={styles.panel}>
          <p className="eyebrow">Subscription-ready</p>
          <h2>Build your week box</h2>
          <p className={styles.lead}>
            Pick five presses for the week ahead. Cold-packed and delivered on
            your schedule.
          </p>

          <ul className={styles.list}>
            {options.map((product) => {
              const checked = selected.includes(product.id);
              return (
                <li key={product.id}>
                  <label className={`${styles.row} ${checked ? styles.on : ""}`}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggle(product.id)}
                    />
                    <span className={styles.thumb}>
                      <Image
                        src={product.image}
                        alt=""
                        fill
                        sizes="56px"
                      />
                    </span>
                    <span className={styles.info}>
                      <strong>{product.name}</strong>
                      <em>{product.tagline}</em>
                    </span>
                    <span className={styles.price}>{formatPrice(product.price)}</span>
                  </label>
                </li>
              );
            })}
          </ul>

          <div className={styles.actions}>
            <div>
              <span className={styles.totalLabel}>Box total</span>
              <strong className={styles.total}>{formatPrice(total)}</strong>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={addSet}
              disabled={selected.length === 0}
            >
              Add set to cart
            </button>
          </div>
        </div>

        <div className={styles.visual}>
          <Image
            src="https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=1200&q=80"
            alt="Assorted cold-pressed bottles with fruit"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
