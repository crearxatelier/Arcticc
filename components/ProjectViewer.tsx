"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { formatCarouselIndex, formatPostLabel } from "@/data/projects";
import { usePortfolio } from "@/context/PortfolioContext";
import { lockBodyScroll, unlockBodyScroll, trapFocus } from "@/lib/focus";
import { DURATION, EASE } from "@/lib/animations";
import { cn, prefersReducedMotion } from "@/lib/utils";
import styles from "./ProjectViewer.module.css";

gsap.registerPlugin(Flip);

export function ProjectViewer() {
  const {
    viewer,
    closeViewer,
    nextInViewer,
    prevInViewer,
    getSeriesProjects,
    getActiveProject,
    lastTriggerRef,
  } = usePortfolio();

  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  const projects = getSeriesProjects(viewer.series);
  const project = getActiveProject();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (viewer.open && !wasOpen.current) {
      wasOpen.current = true;
      lockBodyScroll();
      closeRef.current?.focus();

      const reduced = prefersReducedMotion();
      const source = viewer.sourceEl?.querySelector("img") as HTMLElement | null;
      const target = frameRef.current?.querySelector("img") as HTMLElement | null;

      gsap.set(root, { autoAlpha: 1 });

      if (!reduced && source && target) {
        const state = Flip.getState(source);
        Flip.fit(target, state, { scale: true, absolute: true });
        Flip.from(state, {
          targets: target,
          duration: DURATION.viewer,
          ease: EASE.soft,
          absolute: true,
          scale: true,
          onComplete: () => {
            gsap.set(target, { clearProps: "all" });
          },
        });
      }

      gsap.fromTo(
        root.querySelectorAll("[data-viewer-ui]"),
        { opacity: reduced ? 1 : 0, y: reduced ? 0 : 12 },
        {
          opacity: 1,
          y: 0,
          duration: reduced ? 0.01 : 0.45,
          stagger: reduced ? 0 : 0.05,
          delay: reduced ? 0 : 0.2,
          ease: EASE.editorial,
        }
      );
    }

    if (!viewer.open && wasOpen.current) {
      wasOpen.current = false;
      unlockBodyScroll();
      gsap.to(root, {
        autoAlpha: 0,
        duration: prefersReducedMotion() ? 0.01 : 0.35,
        ease: EASE.editorial,
      });
      lastTriggerRef.current?.focus();
    }
  }, [viewer.open, viewer.sourceEl, lastTriggerRef]);

  useEffect(() => {
    if (!viewer.open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeViewer();
      if (e.key === "ArrowRight") nextInViewer();
      if (e.key === "ArrowLeft") prevInViewer();
      if (rootRef.current) trapFocus(e, rootRef.current);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [viewer.open, closeViewer, nextInViewer, prevInViewer]);

  return (
    <div
      ref={rootRef}
      className={cn(styles.viewer, viewer.open && styles.open)}
      role="dialog"
      aria-modal="true"
      aria-label="Project viewer"
      aria-hidden={!viewer.open}
    >
      <div className={styles.top} data-viewer-ui>
        <div className={styles.titleBlock}>
          <span className={styles.post}>
            {project ? formatPostLabel(project.id) : ""}
          </span>
          <span className={styles.type}>
            {project?.type ?? "Social Media Design"}
          </span>
        </div>
        <button
          ref={closeRef}
          type="button"
          className={styles.close}
          onClick={closeViewer}
          aria-label="Close project viewer"
        >
          Close
        </button>
      </div>

      <div className={styles.stage}>
        <div ref={frameRef} className={styles.frame}>
          {project && (
            <Image
              key={project.id}
              src={project.image}
              alt={project.alt}
              fill
              sizes="90vw"
              className={styles.image}
              priority
            />
          )}
        </div>
      </div>

      <div className={styles.bottom} data-viewer-ui>
        <button
          type="button"
          className={styles.navBtn}
          onClick={prevInViewer}
          disabled={viewer.index <= 0}
          aria-label="Previous project"
        >
          Previous
        </button>
        <span className={styles.counter} aria-live="polite">
          {formatCarouselIndex(viewer.index, projects.length)}
        </span>
        <button
          type="button"
          className={styles.navBtn}
          onClick={nextInViewer}
          disabled={viewer.index >= projects.length - 1}
          aria-label="Next project"
        >
          Next
        </button>
      </div>
    </div>
  );
}
