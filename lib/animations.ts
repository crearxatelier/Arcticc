import { gsap } from "gsap";
import { prefersReducedMotion } from "@/lib/utils";

export const EASE = {
  editorial: "power2.out",
  soft: "power3.out",
  inOut: "power2.inOut",
} as const;

export const DURATION = {
  fast: 0.35,
  medium: 0.55,
  carousel: 0.65,
  viewer: 0.75,
  hero: 1.8,
} as const;

export function revealLines(
  elements: gsap.TweenTarget,
  options?: gsap.TweenVars
) {
  const reduced = prefersReducedMotion();
  return gsap.fromTo(
    elements,
    {
      yPercent: reduced ? 0 : 110,
      opacity: reduced ? 1 : 0,
    },
    {
      yPercent: 0,
      opacity: 1,
      duration: reduced ? 0.01 : DURATION.medium,
      ease: EASE.soft,
      stagger: reduced ? 0 : 0.08,
      ...options,
    }
  );
}

export function revealClip(
  element: gsap.TweenTarget,
  options?: gsap.TweenVars
) {
  const reduced = prefersReducedMotion();
  return gsap.fromTo(
    element,
    {
      clipPath: reduced ? "inset(0% 0% 0% 0%)" : "inset(12% 8% 12% 8%)",
      scale: reduced ? 1 : 1.06,
      opacity: reduced ? 1 : 0,
    },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      scale: 1,
      opacity: 1,
      duration: reduced ? 0.01 : 0.9,
      ease: EASE.soft,
      ...options,
    }
  );
}
