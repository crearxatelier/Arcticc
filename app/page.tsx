import { PortfolioProvider } from "@/context/PortfolioContext";
import { HomeClient } from "@/components/HomeClient";
import { ShopSection } from "@/components/ShopSection";

export default function Home() {
  return (
    <PortfolioProvider>
      <HomeClient>
        <ShopSection />
      </HomeClient>
    </PortfolioProvider>
  );
}
