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

  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const dragRef = useRef({
    active: false,
    moved: false,
    startX: 0,
    startOffset: 0,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
    pointerId: -1,
  });
  const animRef = useRef<gsap.core.Tween | null>(null);
  const reduced = useRef(false);
  const suppressClickRef = useRef(false);
  const indexRef = useRef(0);

  indexRef.current = index;

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
        const inner = slide.querySelector(`.${styles.slideInner}`) as HTMLElement | null;
        const target = inner ?? slide;
        const distance = i - active;
        const scale = getNeighborScale(distance);
        const opacity = getNeighborOpacity(distance);
        const y = distance === 0 ? 0 : 8;

        if (immediate || reduced.current) {
          gsap.set(target, { scale, opacity, y });
        } else {
          gsap.to(target, {
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
        const progress =
          projects.length <= 1 ? 1 : active / (projects.length - 1);
        gsap.to(progressRef.current, {
          scaleX: Math.max(progress, 0.08),
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
    const stage = stageRef.current;
    const sync = () => goTo(indexRef.current, false);

    const raf = requestAnimationFrame(() => {
      goTo(0, false);
    });

    window.addEventListener("resize", sync);
    const ro = stage ? new ResizeObserver(sync) : null;
    if (stage && ro) ro.observe(stage);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", sync);
      ro?.disconnect();
    };
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
    const target = e.target as HTMLElement;
    if (target.closest("button") && !target.closest(`.${styles.slideButton}`)) {
      return;
    }

    animRef.current?.kill();
    dragRef.current = {
      active: true,
      moved: false,
      startX: e.clientX,
      startOffset: xRef.current,
      lastX: e.clientX,
      lastTime: performance.now(),
      velocity: 0,
      pointerId: e.pointerId,
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    if (!drag.active) return;

    const delta = e.clientX - drag.startX;
    if (!drag.moved && Math.abs(delta) < 8) return;

    if (!drag.moved) {
      drag.moved = true;
      stageRef.current?.setPointerCapture(e.pointerId);
    }

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

    const stage = stageRef.current;
    if (drag.moved) {
      stage?.releasePointerCapture(e.pointerId);
    }

    if (!drag.moved) {
      // Pure click — leave navigation to the slide button handler
      return;
    }

    suppressClickRef.current = true;
    window.setTimeout(() => {
      suppressClickRef.current = false;
    }, 80);

    const width = getSlideWidth() || 1;
    const delta = e.clientX - drag.startX;
    const velocity = drag.velocity;
    let next = index;

    if (Math.abs(velocity) > 0.65 || Math.abs(delta) > width * 0.18) {
      next = delta < 0 || velocity < -0.65 ? index + 1 : index - 1;
    } else if (stage) {
      const center = stage.getBoundingClientRect().width / 2;
      next = Math.round((center - xRef.current - width / 2) / width);
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

      <div className={styles.bleed}>
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
                    if (suppressClickRef.current) return;
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
