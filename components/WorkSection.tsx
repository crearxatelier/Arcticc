"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { seriesOne, seriesTwo } from "@/data/projects";
import { CarouselSeries } from "./CarouselSeries";
import { DURATION, EASE } from "@/lib/animations";
import { prefersReducedMotion } from "@/lib/utils";
import styles from "./WorkSection.module.css";

gsap.registerPlugin(ScrollTrigger);

export function WorkSection() {
  const introRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = introRef.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll("[data-reveal]"), {
        y: 28,
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
    <section id="work" className={styles.section} aria-label="Selected work">
      <div className="container" ref={introRef}>
        <h2 className={styles.heading}>
          <span className={styles.bold} data-reveal>
            Selected
          </span>
          <span className={styles.italic} data-reveal>
            Social Work
          </span>
        </h2>
        <p className={styles.support} data-reveal>
          Twelve selected pieces from my social media design work, presented as
          two visual series.
        </p>
        <hr className={styles.rule} data-reveal />
      </div>

      <CarouselSeries
        seriesKey="one"
        projects={seriesOne}
        label="01 / Social Series"
        support="Five selected social media pieces."
      />

      <CarouselSeries
        seriesKey="two"
        projects={seriesTwo}
        label="02 / Social Series"
        support="Seven selected social media pieces."
      />
    </section>
  );
}
