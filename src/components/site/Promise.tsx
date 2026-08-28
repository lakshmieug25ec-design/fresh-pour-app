import { Droplets, ShieldCheck, Sunrise } from "lucide-react";
import pour from "@/assets/pour.jpg";
import { Reveal } from "./Reveal";

const POINTS = [
  {
    icon: Droplets,
    title: "One product only",
    body: "No curd, no ghee, no sweets. Milk is all we handle, so nothing gets mixed.",
  },
  {
    icon: ShieldCheck,
    title: "No added water",
    body: "We never dilute. What leaves our shop is exactly what came from the udder.",
  },
  {
    icon: Sunrise,
    title: "Fresh every morning",
    body: "Pre-order the night before and collect it fresh, or have it delivered to your door.",
  },
];

export function PromiseSection() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="max-w-2xl">
          <p className="text-xs tracking-[0.24em] text-leaf uppercase">Our promise</p>
          <h2 className="mt-4 text-3xl text-balance-tight md:text-5xl">
            Honest milk, sold the simple way.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <ul className="grid gap-4">
            {POINTS.map(({ icon: Icon, title, body }, i) => (
              <Reveal as="li" key={title} delay={i * 90}>
                <div className="surface-card group flex gap-5 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent text-leaf transition-colors group-hover:bg-leaf group-hover:text-primary-foreground">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-xl">{title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={120} className="overflow-hidden rounded-[2rem] border border-border shadow-[var(--shadow-soft)]">
            <img
              src={pour}
              alt="Fresh milk being poured into a clean glass"
              loading="lazy"
              width={1200}
              height={900}
              className="h-full min-h-[280px] w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
