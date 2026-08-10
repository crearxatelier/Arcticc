"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { gsap } from "gsap";
import type { Project } from "@/data/projects";
import { formatCarouselIndex, formatPostLabel } from "@/data/projects";
import { DURATION, EASE } from "@/lib/animations";
import { getNeighborOpacity, getNeighborScale } from "@/lib/carousel";
import { clamp, cn, prefersReducedMotion } from "@/lib/utils";
import { usePortfolio } from "@/context/PortfolioContext";
import styles from "./CarouselSeries.module.css";

type SeriesKey = "one" | "two";

type CarouselSeriesProps = {
  seriesKey: SeriesKey;
  projects: Project[];
  label: string;
  support: string;
};

export function CarouselSeries({
  seriesKey,
  projects,
  label,
  support,
}: CarouselSeriesProps) {
  const id = useId();
  const { openViewer, setCursorActive } = usePortfolio();
  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const dragRef = useRef({
    active: false,
    startX: 0,
    startOffset: 0,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
  });
  const animRef = useRef<gsap.core.Tween | null>(null);
  const reduced = useRef(false);

  const getSlideWidth = useCallback(() => {
    const slide = slideRefs.current[0];
    if (!slide) return 0;
    return slide.getBoundingClientRect().width;
  }, []);

  const getCenteredOffset = useCallback(
    (i: number) => {
      const stage = stageRef.current;
      const width = getSlideWidth();
      if (!stage || !width) return 0;
      const stageWidth = stage.getBoundingClientRect().width;
      return stageWidth / 2 - (i * width + width / 2);
    },
    [getSlideWidth]
  );

  const applySlideStates = useCallback(
    (active: number, immediate = false) => {
      slideRefs.current.forEach((slide, i) => {
        if (!slide) return;
        const distance = i - active;
        const scale = getNeighborScale(distance);
        const opacity = getNeighborOpacity(distance);
        const y = distance === 0 ? 0 : 10;

        if (immediate || reduced.current) {
          gsap.set(slide, { scale, opacity, y });
        } else {
          gsap.to(slide, {
            scale,
            opacity,
            y,
            duration: DURATION.carousel,
            ease: EASE.editorial,
            overwrite: "auto",
          });
        }
      });

      if (progressRef.current) {
        const progress = projects.length <= 1 ? 1 : active / (projects.length - 1);
        gsap.to(progressRef.current, {
          scaleX: progress || 0.08,
          duration: reduced.current ? 0 : DURATION.carousel,
          ease: EASE.editorial,
        });
      }
    },
    [projects.length]
  );

  const goTo = useCallback(
    (nextIndex: number, animate = true) => {
      const clamped = clamp(nextIndex, 0, projects.length - 1);
      setIndex(clamped);
      const target = getCenteredOffset(clamped);
      animRef.current?.kill();

      if (!animate || reduced.current) {
        xRef.current = target;
        gsap.set(trackRef.current, { x: target });
        applySlideStates(clamped, true);
        return;
      }

      animRef.current = gsap.to(trackRef.current, {
        x: target,
        duration: DURATION.carousel,
        ease: EASE.editorial,
        onUpdate: () => {
          xRef.current = Number(gsap.getProperty(trackRef.current, "x")) || 0;
        },
        onComplete: () => {
          xRef.current = target;
        },
      });
      applySlideStates(clamped);
    },
    [applySlideStates, getCenteredOffset, projects.length]
  );

  useEffect(() => {
    reduced.current = prefersReducedMotion();
    const onResize = () => goTo(index, false);
    goTo(0, false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const onKey = (e: KeyboardEvent) => {
      if (!stage.contains(document.activeElement) && document.activeElement !== stage) {
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(index + 1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(index - 1);
      }
    };

    stage.addEventListener("keydown", onKey);
    return () => stage.removeEventListener("keydown", onKey);
  }, [goTo, index]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    const stage = stageRef.current;
    if (!stage) return;

    animRef.current?.kill();
    stage.setPointerCapture(e.pointerId);
    setDragging(true);
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startOffset: xRef.current,
      lastX: e.clientX,
      lastTime: performance.now(),
      velocity: 0,
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    if (!drag.active) return;

    const delta = e.clientX - drag.startX;
    const next = drag.startOffset + delta;
    xRef.current = next;
    gsap.set(trackRef.current, { x: next });

    const now = performance.now();
    const dt = now - drag.lastTime;
    if (dt > 0) {
      drag.velocity = ((e.clientX - drag.lastX) / dt) * 16;
      drag.lastX = e.clientX;
      drag.lastTime = now;
    }

    const width = getSlideWidth() || 1;
    const stage = stageRef.current;
    if (!stage) return;
    const center = stage.getBoundingClientRect().width / 2;
    const approx = Math.round((center - next - width / 2) / width);
    const liveIndex = clamp(approx, 0, projects.length - 1);
    applySlideStates(liveIndex, true);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    if (!drag.active) return;
    drag.active = false;
    setDragging(false);

    const stage = stageRef.current;
    stage?.releasePointerCapture(e.pointerId);

    const width = getSlideWidth() || 1;
    const delta = e.clientX - drag.startX;
    const velocity = drag.velocity;
    let next = index;

    if (Math.abs(velocity) > 0.65 || Math.abs(delta) > width * 0.18) {
      next = delta < 0 || velocity < -0.65 ? index + 1 : index - 1;
    } else {
      const stageEl = stageRef.current;
      if (stageEl) {
        const center = stageEl.getBoundingClientRect().width / 2;
        next = Math.round((center - xRef.current - width / 2) / width);
      }
    }

    goTo(next);
  };

  const onWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    e.preventDefault();
    if (Math.abs(e.deltaX) < 8) return;
    goTo(e.deltaX > 0 ? index + 1 : index - 1);
  };

  const active = projects[index];

  return (
    <section
      className={styles.series}
      aria-labelledby={`${id}-label`}
      data-series={seriesKey}
    >
      <div className="container">
        <div className={styles.intro}>
          <p id={`${id}-label`} className={styles.label}>
            {label}
          </p>
          <p className={styles.support}>{support}</p>
        </div>
      </div>

      <div
        ref={stageRef}
        className={styles.stage}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
      >
        <div ref={trackRef} className={styles.track}>
          {projects.map((project, i) => (
            <div
              key={project.id}
              className={styles.slide}
              ref={(el) => {
                slideRefs.current[i] = el;
              }}
              aria-hidden={i !== index}
            >
              <div
                className={cn(styles.slideInner)}
                data-carousel-art={`${seriesKey}-${project.id}`}
              >
                <button
                  type="button"
                  className={styles.slideButton}
                  aria-label={`View ${formatPostLabel(project.id)}`}
                  onMouseEnter={() => i === index && setCursorActive(true)}
                  onMouseLeave={() => setCursorActive(false)}
                  onFocus={() => i === index && setCursorActive(true)}
                  onBlur={() => setCursorActive(false)}
                  onClick={(e) => {
                    if (dragging) return;
                    if (i !== index) {
                      goTo(i);
                      return;
                    }
                    openViewer(seriesKey, i, e.currentTarget);
                  }}
                >
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    sizes="(max-width: 768px) 88vw, (max-width: 1200px) 58vw, 46rem"
                    className={styles.image}
                    priority={seriesKey === "one" && i < 2}
                    loading={seriesKey === "one" && i < 2 ? "eager" : "lazy"}
                    draggable={false}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        <div className={styles.meta}>
          <div className={styles.metaText}>
            <span className={styles.postLabel}>
              {active ? formatPostLabel(active.id) : ""}
            </span>
            <span className={styles.postType}>
              {active?.type ?? "Social Media Design"}
            </span>
          </div>

          <div className={styles.controls}>
            <span className={styles.counter} aria-live="polite">
              {formatCarouselIndex(index, projects.length)}
            </span>
            <button
              type="button"
              className={styles.navBtn}
              aria-label="Previous slide"
              disabled={index === 0}
              onClick={() => goTo(index - 1)}
            >
              ←
            </button>
            <button
              type="button"
              className={styles.navBtn}
              aria-label="Next slide"
              disabled={index === projects.length - 1}
              onClick={() => goTo(index + 1)}
            >
              →
            </button>
          </div>
        </div>

        <div className={styles.progress} aria-hidden="true">
          <div ref={progressRef} className={styles.progressBar} />
        </div>
      </div>
    </section>
  );
}
