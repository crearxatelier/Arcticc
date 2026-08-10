"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteInfo } from "@/data/projects";
import { DURATION, EASE } from "@/lib/animations";
import { prefersReducedMotion } from "@/lib/utils";
import styles from "./AboutSection.module.css";

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll("[data-reveal]"), {
        y: 28,
        opacity: 0,
        duration: DURATION.medium,
        ease: EASE.soft,
        stagger: 0.06,
        scrollTrigger: {
          trigger: el,
          start: "top 78%",
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={ref} className={styles.section} aria-label="About">
      <div className="container">
        <h2 className={styles.heading}>
          <span className={styles.bold} data-reveal>
            A designer
          </span>
          <span className={styles.italic} data-reveal>
            between ideas
          </span>
          <span className={styles.bold} data-reveal>
            and screens.
          </span>
        </h2>

        <div className={styles.grid}>
          <div>
            <p className={styles.bio} data-reveal>
              {siteInfo.bio}
            </p>
            <ul className={styles.capabilities} data-reveal>
              {siteInfo.capabilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className={styles.details}>
            <div className={styles.block} data-reveal>
              <p className={styles.label}>Experience</p>
              <p className={styles.primary}>{siteInfo.experience.company}</p>
              <p className={styles.secondary}>{siteInfo.experience.role}</p>
              <p className={styles.secondary}>{siteInfo.experience.duration}</p>
            </div>

            <div className={styles.block} data-reveal>
              <p className={styles.label}>Education</p>
              <p className={styles.primary}>{siteInfo.education.school}</p>
              <p className={styles.secondary}>{siteInfo.education.degree}</p>
              <p className={styles.secondary}>{siteInfo.education.years}</p>
            </div>

            <div className={styles.block} data-reveal>
              <p className={styles.label}>Tools</p>
              <ul className={styles.tools}>
                {siteInfo.tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
