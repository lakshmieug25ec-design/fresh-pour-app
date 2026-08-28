import { Phone, MessageCircle, MapPin } from "lucide-react";
import { SHOP, telUrl, whatsappUrl, mapsSearchUrl } from "@/lib/shop";

export function Footer() {
  return (
    <footer className="border-t border-border bg-cream/70 pt-14 pb-28 md:pb-14">
      <div className="mx-auto max-w-6xl px-5">
        <p className="font-display text-2xl text-balance-tight md:text-4xl">
          100% PURE MILK. <span className="text-leaf">NOTHING ELSE.</span>
        </p>
        <div className="mt-8 flex flex-wrap gap-6 text-sm text-muted-foreground">
          <a href={telUrl} className="flex items-center gap-2 transition-colors hover:text-leaf">
            <Phone className="size-4" /> {SHOP.phone}
          </a>
          <a
            href={whatsappUrl("Hi! I'd like to order pure milk.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-colors hover:text-leaf"
          >
            <MessageCircle className="size-4" /> WhatsApp
          </a>
          <a
            href={mapsSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-colors hover:text-leaf"
          >
            <MapPin className="size-4" /> {SHOP.locality}
          </a>
        </div>
        <p className="mt-10 border-t border-border pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {SHOP.name}, {SHOP.locality}.
        </p>
      </div>
    </footer>
  );
}
