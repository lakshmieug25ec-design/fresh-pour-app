import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Milk } from "lucide-react";
import heroMilk from "@/assets/hero-milk.jpg";
import { SHOP, telUrl, whatsappUrl } from "@/lib/shop";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section className="relative overflow-hidden grain-cream pt-28 pb-16 md:pt-36 md:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-28 h-96 w-96 rounded-full bg-leaf-soft/50 blur-3xl"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-[1.05fr_0.95fr] md:gap-14">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-leaf-soft bg-milk px-4 py-1.5 text-xs font-medium tracking-[0.18em] text-leaf uppercase">
              <Milk className="size-3.5" /> {SHOP.locality}
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 text-[2.6rem] leading-[0.98] text-balance-tight sm:text-6xl md:text-[4.2rem]">
              100% PURE MILK.
              <span className="block text-leaf">NOTHING ELSE.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
              We sell one thing, and we sell it honestly — fresh milk. No mixtures, no milk
              products, no intentionally added water. Pre-order today, pick it up or have it
              delivered.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild variant="leaf" size="pillLg">
                <a href="#preorder">
                  <Milk /> Pre-Order Milk
                </a>
              </Button>
              <Button asChild variant="whatsapp" size="pillLg">
                <a
                  href={whatsappUrl("Hi! I'd like to order pure milk.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle /> WhatsApp
                </a>
              </Button>
              <Button asChild variant="cream" size="pillLg">
                <a href={telUrl}>
                  <Phone /> Call {SHOP.phone}
                </a>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <dl className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-border pt-6">
              {[
                ["100%", "Pure milk"],
                ["0%", "Added water"],
                ["1", "Product only"],
              ].map(([k, v]) => (
                <div key={v}>
                  <dt className="font-display text-2xl text-leaf">{k}</dt>
                  <dd className="text-xs tracking-wide text-muted-foreground uppercase">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={120} className="relative">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-border shadow-[var(--shadow-lift)]">
            <img
              src={heroMilk}
              alt="A glass bottle of fresh pure milk on cream linen"
              width={1280}
              height={1600}
              className="h-[420px] w-full object-cover md:h-[560px]"
            />
          </div>
          <div className="animate-float-soft absolute -bottom-6 left-4 rounded-2xl border border-border bg-milk px-5 py-4 shadow-[var(--shadow-soft)] md:left-auto md:-right-6">
            <p className="font-display text-lg text-ink">Just pure milk.</p>
            <p className="text-xs text-muted-foreground">Nothing added. Nothing taken away.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
