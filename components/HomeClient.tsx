"use client";

import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { WorkSection } from "@/components/WorkSection";
import { ApproachSection } from "@/components/ApproachSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { SiteFooter } from "@/components/SiteFooter";
import { ProjectViewer } from "@/components/ProjectViewer";
import { CursorLabel } from "@/components/CursorLabel";
import { usePortfolio } from "@/context/PortfolioContext";

export function HomeClient() {
  const { cursorActive } = usePortfolio();

  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <WorkSection />
        <ApproachSection />
        <AboutSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <ProjectViewer />
      <CursorLabel active={cursorActive} />
    </>
  );
}
