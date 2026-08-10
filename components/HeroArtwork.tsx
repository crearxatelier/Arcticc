"use client";

import Image from "next/image";
import styles from "./HeroArtwork.module.css";
import { seriesOne } from "@/data/projects";

export function HeroArtwork() {
  const project = seriesOne[0];

  return (
    <div className={styles.frame} data-hero-art>
      <Image
        src={project.image}
        alt={project.alt}
        fill
        priority
        sizes="(max-width: 768px) 88vw, (max-width: 1200px) 40vw, 34rem"
        className={styles.image}
      />
    </div>
  );
}
