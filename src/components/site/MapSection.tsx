import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, ExternalLink, LocateFixed } from "lucide-react";
import { SHOP, directionsUrl, mapsSearchUrl } from "@/lib/shop";
import { Reveal } from "./Reveal";
import { toast } from "sonner";

const D = 0.02;
const bbox = [SHOP.center.lng - D, SHOP.center.lat - D, SHOP.center.lng + D, SHOP.center.lat + D]
  .map((n) => n.toFixed(4))
  .join("%2C");

const embedSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${SHOP.center.lat}%2C${SHOP.center.lng}`;

export function MapSection() {
  const [locating, setLocating] = useState(false);

  const useMyLocation = () => {
    if (!("geolocation" in navigator)) {
      toast.error("Location isn't supported on this device.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        const { latitude, longitude } = pos.coords;
        window.open(
          `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${encodeURIComponent(SHOP.locality)}`,
          "_blank",
          "noopener,noreferrer",
        );
      },
      () => {
        setLocating(false);
        toast.error("Couldn't get your location. Please allow permission and try again.");
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  return (
    <section id="map" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="max-w-xl">
          <p className="text-xs tracking-[0.24em] text-leaf uppercase">Find us</p>
          <h2 className="mt-4 text-3xl md:text-5xl">We're in {SHOP.locality.split(",")[0]}.</h2>
          <p className="mt-4 text-muted-foreground">
            Serving {SHOP.locality}. Call or message us on WhatsApp for exact pickup directions
            before you set out.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-10 overflow-hidden surface-card">
          <iframe
            title={`Map of ${SHOP.locality}`}
            src={embedSrc}
            loading="lazy"
            className="h-[340px] w-full border-0 md:h-[440px]"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="flex flex-wrap items-center gap-3 border-t border-border bg-milk px-5 py-5">
            <span className="mr-auto flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4 text-leaf" /> {SHOP.locality}
            </span>
            <Button asChild variant="leaf" size="pill">
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
                <Navigation /> Get Directions
              </a>
            </Button>
            <Button asChild variant="cream" size="pill">
              <a href={mapsSearchUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink /> Open in Maps
              </a>
            </Button>
            <Button variant="quiet" size="pill" onClick={useMyLocation} disabled={locating}>
              <LocateFixed /> {locating ? "Locating…" : "Use My Location"}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
