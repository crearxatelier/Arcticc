import { PortfolioProvider } from "@/context/PortfolioContext";
import { HomeClient } from "@/components/HomeClient";

export default function Home() {
  return (
    <PortfolioProvider>
      <HomeClient />
    </PortfolioProvider>
  );
}
