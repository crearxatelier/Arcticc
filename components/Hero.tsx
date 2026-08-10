"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./Hero.module.css";
import { HeroArtwork } from "./HeroArtwork";
import { DURATION, EASE } from "@/lib/animations";
import { prefersReducedMotion } from "@/lib/utils";

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = prefersReducedMotion();
    const ctx = gsap.context(() => {
      const nav = document.querySelector("[data-nav]");
      const lines = root.querySelectorAll("[data-hero-line]");
      const art = root.querySelector("[data-hero-art]");
      const support = root.querySelector("[data-hero-support]");
      const meta = root.querySelectorAll("[data-hero-meta]");
      const panel = root.querySelector("[data-hero-panel]");
      const cta = root.querySelector("[data-hero-cta]");
      const eyebrow = root.querySelectorAll("[data-hero-eyebrow]");

      if (reduced) {
        gsap.set([nav, lines, art, support, meta, panel, cta, eyebrow], {
          clearProps: "all",
          opacity: 1,
          y: 0,
          yPercent: 0,
        });
        return;
      }

      gsap.set(lines, { yPercent: 110, opacity: 0 });
      gsap.set([support, meta, panel, cta, eyebrow], { opacity: 0, y: 18 });
      gsap.set(art, {
        opacity: 0,
        scale: 1.05,
        clipPath: "inset(10% 8% 10% 8%)",
      });
      gsap.set(nav, { opacity: 0, y: -12 });

      const tl = gsap.timeline({ defaults: { ease: EASE.soft } });

      tl.to(nav, { opacity: 1, y: 0, duration: 0.5 }, 0)
        .to(eyebrow, { opacity: 1, y: 0, duration: 0.45, stagger: 0.05 }, 0.15)
        .to(
          lines,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
          },
          0.28
        )
        .to(
          art,
          {
            opacity: 1,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.95,
          },
          0.55
        )
        .to(support, { opacity: 1, y: 0, duration: 0.5 }, 0.95)
        .to(meta, { opacity: 1, y: 0, duration: 0.45, stagger: 0.05 }, 1.05)
        .to(
          panel,
          { opacity: 1, y: 0, duration: 0.55, ease: EASE.editorial },
          1.15
        )
        .to(cta, { opacity: 1, y: 0, duration: 0.45 }, 1.25);

      tl.duration(DURATION.hero);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      className={styles.hero}
      aria-label="Introduction"
    >
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <div className={styles.eyebrow}>
            <span data-hero-eyebrow>Guna / Visual Designer</span>
            <span data-hero-eyebrow>Social Media / Visual Design</span>
          </div>

          <h1 className={styles.title}>
            <span className={styles.line}>
              <span className={`${styles.lineInner} ${styles.bold}`} data-hero-line>
                Social
              </span>
            </span>
            <span className={styles.line}>
              <span
                className={`${styles.lineInner} ${styles.italic}`}
                data-hero-line
              >
                design
              </span>
            </span>
            <span className={styles.line}>
              <span className={`${styles.lineInner} ${styles.bold}`} data-hero-line>
                With
              </span>
            </span>
            <span className={styles.line}>
              <span
                className={`${styles.lineInner} ${styles.italic}`}
                data-hero-line
              >
                intention.
              </span>
            </span>
          </h1>

          <p className={styles.support} data-hero-support>
            A curated collection of social media work, visual ideas and brand
            communication.
          </p>

          <div className={styles.metaRow}>
            <span className="meta" data-hero-meta>
              12 Selected Works
            </span>
            <span className="meta" data-hero-meta>
              Coimbatore, India
            </span>
            <span className="meta" data-hero-meta>
              2026
            </span>
          </div>

          <a href="#work" className={styles.cta} data-hero-cta>
            Scroll to explore ↓
          </a>
        </div>

        <div className={styles.visual}>
          <HeroArtwork />
          <div className={`${styles.panel} glass`} data-hero-panel>
            <strong>Selected Work</strong>
            <span>12 Social Pieces</span>
            <a href="#work">↓ Explore</a>
          </div>
        </div>
      </div>
    </section>
  );
}
