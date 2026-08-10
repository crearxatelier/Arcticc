"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DURATION, EASE } from "@/lib/animations";
import { prefersReducedMotion } from "@/lib/utils";
import styles from "./ApproachSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const PRINCIPLES = [
  {
    number: "01",
    title: "Idea",
    text: "A clear thought before decoration.",
  },
  {
    number: "02",
    title: "Hierarchy",
    text: "Making the message understood quickly.",
  },
  {
    number: "03",
    title: "Character",
    text: "Creating visuals that don't disappear into the feed.",
  },
];

export function ApproachSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll("[data-reveal]"), {
        y: 30,
        opacity: 0,
        duration: DURATION.medium,
        ease: EASE.soft,
        stagger: 0.08,
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="approach"
      ref={ref}
      className={styles.section}
      aria-label="Approach"
    >
      <div className="container">
        <h2 className={styles.heading}>
          <span className={styles.bold} data-reveal>
            The work is the result.
          </span>
          <span className={styles.italic} data-reveal>
            The thinking comes first.
          </span>
        </h2>
        <p className={styles.copy} data-reveal>
          Social media moves fast. Good design needs to communicate even faster.
          I focus on building visuals with a clear idea, strong hierarchy and
          enough character to stop the scroll.
        </p>

        <ol className={styles.list}>
          {PRINCIPLES.map((item) => (
            <li key={item.number} className={styles.item} data-reveal>
              <span className={styles.number}>{item.number}</span>
              <div>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.text}>{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
