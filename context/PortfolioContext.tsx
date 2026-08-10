"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Project } from "@/data/projects";
import { seriesOne, seriesTwo } from "@/data/projects";

type SeriesKey = "one" | "two";

type ViewerState = {
  open: boolean;
  series: SeriesKey;
  index: number;
  sourceEl: HTMLElement | null;
};

type PortfolioContextValue = {
  viewer: ViewerState;
  cursorActive: boolean;
  setCursorActive: (active: boolean) => void;
  openViewer: (
    series: SeriesKey,
    index: number,
    sourceEl?: HTMLElement | null
  ) => void;
  closeViewer: () => void;
  nextInViewer: () => void;
  prevInViewer: () => void;
  getSeriesProjects: (series: SeriesKey) => Project[];
  getActiveProject: () => Project | null;
  lastTriggerRef: React.MutableRefObject<HTMLElement | null>;
};

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

const SERIES_MAP = {
  one: seriesOne,
  two: seriesTwo,
} as const;

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [viewer, setViewer] = useState<ViewerState>({
    open: false,
    series: "one",
    index: 0,
    sourceEl: null,
  });
  const [cursorActive, setCursorActive] = useState(false);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const getSeriesProjects = useCallback((series: SeriesKey) => {
    return SERIES_MAP[series];
  }, []);

  const openViewer = useCallback(
    (series: SeriesKey, index: number, sourceEl?: HTMLElement | null) => {
      if (sourceEl) lastTriggerRef.current = sourceEl;
      setViewer({
        open: true,
        series,
        index,
        sourceEl: sourceEl ?? null,
      });
    },
    []
  );

  const closeViewer = useCallback(() => {
    setViewer((prev) => ({ ...prev, open: false, sourceEl: null }));
  }, []);

  const nextInViewer = useCallback(() => {
    setViewer((prev) => {
      const projects = SERIES_MAP[prev.series];
      if (prev.index >= projects.length - 1) return prev;
      return { ...prev, index: prev.index + 1, sourceEl: null };
    });
  }, []);

  const prevInViewer = useCallback(() => {
    setViewer((prev) => {
      if (prev.index <= 0) return prev;
      return { ...prev, index: prev.index - 1, sourceEl: null };
    });
  }, []);

  const getActiveProject = useCallback(() => {
    const projects = SERIES_MAP[viewer.series];
    return projects[viewer.index] ?? null;
  }, [viewer.index, viewer.series]);

  const value = useMemo(
    () => ({
      viewer,
      cursorActive,
      setCursorActive,
      openViewer,
      closeViewer,
      nextInViewer,
      prevInViewer,
      getSeriesProjects,
      getActiveProject,
      lastTriggerRef,
    }),
    [
      viewer,
      cursorActive,
      openViewer,
      closeViewer,
      nextInViewer,
      prevInViewer,
      getSeriesProjects,
      getActiveProject,
    ]
  );

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    throw new Error("usePortfolio must be used within PortfolioProvider");
  }
  return ctx;
}
