import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Milk } from "lucide-react";
import { SHOP, telUrl } from "@/lib/shop";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-border bg-milk/90 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-5 py-4">
        <a href="#top" className="flex items-center gap-2 font-display text-lg tracking-tight">
          <span className="flex size-8 items-center justify-center rounded-full bg-leaf text-primary-foreground">
            <Milk className="size-4" />
          </span>
          {SHOP.name}
        </a>
        <nav className="ml-auto hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          {[
            ["Purity", "#purity"],
            ["Pre-Order", "#preorder"],
            ["Find Us", "#map"],
          ].map(([label, href]) => (
            <a key={href} href={href} className="transition-colors hover:text-leaf">
              {label}
            </a>
          ))}
        </nav>
        <Button asChild variant="leaf" size="pill" className="ml-auto md:ml-0">
          <a href={telUrl}>
            <Phone /> Call Now
          </a>
        </Button>
      </div>
    </header>
  );
}
