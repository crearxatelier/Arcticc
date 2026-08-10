"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteInfo } from "@/data/projects";
import { GlassButton } from "./GlassButton";
import { DURATION, EASE } from "@/lib/animations";
import { prefersReducedMotion } from "@/lib/utils";
import styles from "./ContactSection.module.css";

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll("[data-reveal]"), {
        y: 32,
        opacity: 0,
        duration: DURATION.medium,
        ease: EASE.soft,
        stagger: 0.08,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={ref}
      className={styles.section}
      aria-label="Contact"
    >
      <div className={styles.glow} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <h2 className={styles.heading}>
          <span className={styles.italic} data-reveal>
            Make something
          </span>
          <span className={styles.bold} data-reveal>
            worth stopping for.
          </span>
        </h2>

        <div className={styles.ctaWrap} data-reveal>
          <GlassButton
            href={`mailto:${siteInfo.email}`}
            className={styles.cta}
            ariaLabel="Email Guna"
          >
            Let&apos;s talk <span className="arrow">→</span>
          </GlassButton>
        </div>

        <div className={styles.links} data-reveal>
          <a className={styles.link} href={`mailto:${siteInfo.email}`}>
            {siteInfo.email}
          </a>
          <a
            className={styles.link}
            href={siteInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            className={styles.link}
            href={siteInfo.behance}
            target="_blank"
            rel="noopener noreferrer"
          >
            Behance
          </a>
        </div>

        <p className={styles.availability} data-reveal>
          {siteInfo.availability}
        </p>
      </div>
    </section>
  );
}
