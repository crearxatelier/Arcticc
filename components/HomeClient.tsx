"use client";

import { Hero } from "@/components/Hero";
import { WorkSection } from "@/components/WorkSection";
import { ApproachSection } from "@/components/ApproachSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { ProjectViewer } from "@/components/ProjectViewer";
import { CursorLabel } from "@/components/CursorLabel";
import { usePortfolio } from "@/context/PortfolioContext";

export function HomeClient({ children }: { children?: React.ReactNode }) {
  const { cursorActive } = usePortfolio();

  return (
    <>
      <main>
        <Hero />
        <WorkSection />
        {children}
        <ApproachSection />
        <AboutSection />
        <ContactSection />
      </main>
      <ProjectViewer />
      <CursorLabel active={cursorActive} />
    </>
  );
}
