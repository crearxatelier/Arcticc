import type { Project } from "@/data/projects";

export type CarouselState = {
  index: number;
  offset: number;
  isDragging: boolean;
};

export function getNeighborOpacity(distance: number): number {
  if (distance === 0) return 1;
  if (Math.abs(distance) === 1) return 0.55;
  return 0.28;
}

export function getNeighborScale(distance: number): number {
  if (distance === 0) return 1;
  if (Math.abs(distance) === 1) return 0.88;
  return 0.8;
}

export function resolveActiveProject(
  projects: Project[],
  index: number
): Project | undefined {
  return projects[index];
}
