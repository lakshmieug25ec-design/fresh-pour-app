import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { PurityExperience } from "@/components/site/PurityExperience";
import { PromiseSection } from "@/components/site/Promise";
import { PreOrder } from "@/components/site/PreOrder";
import { MapSection } from "@/components/site/MapSection";
import { Footer } from "@/components/site/Footer";
import { StickyBar } from "@/components/site/StickyBar";
import { SHOP } from "@/lib/shop";

const TITLE = "100% Pure Milk | Fresh Milk in Melapalayam, Tirunelveli";
const DESCRIPTION =
  "100% pure milk in Melapalayam, Tirunelveli — no mixtures, no added water. Pre-order fresh milk for pickup or delivery on WhatsApp, or call 9025699096.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Pure Milk",
          description: DESCRIPTION,
          telephone: `+91${SHOP.phone}`,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Melapalayam",
            addressRegion: "Tamil Nadu",
            addressCountry: "IN",
          },
          areaServed: SHOP.locality,
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <div id="top" className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <PurityExperience />
        <PromiseSection />
        <PreOrder />
        <MapSection />
      </main>
      <Footer />
      <StickyBar />
    </div>
  );
}
