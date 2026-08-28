import { Milk, MessageCircle, Phone, MapPin } from "lucide-react";
import { SHOP, telUrl, whatsappUrl } from "@/lib/shop";

const items = [
  { label: "Pre-Order", icon: Milk, href: "#preorder" },
  {
    label: "WhatsApp",
    icon: MessageCircle,
    href: whatsappUrl("Hi! I'd like to order pure milk."),
    external: true,
  },
  { label: "Call", icon: Phone, href: telUrl },
  { label: "Map", icon: MapPin, href: "#map" },
];

export function StickyBar() {
  return (
    <nav
      aria-label={`Quick actions for ${SHOP.name}`}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-milk/95 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid grid-cols-4">
        {items.map(({ label, icon: Icon, href, external }) => (
          <li key={label}>
            <a
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="flex flex-col items-center gap-1 py-3 text-[0.7rem] font-medium text-foreground transition-colors active:bg-accent"
            >
              <Icon className="size-5 text-leaf" aria-hidden />
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
