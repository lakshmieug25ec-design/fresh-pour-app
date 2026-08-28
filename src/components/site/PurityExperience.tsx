import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

const CLAIMS = ["100% Milk", "No Added Water", "No Mixtures", "Nothing Else"];

export function PurityExperience() {
  const ref = useRef<HTMLDivElement>(null);
  const [fill, setFill] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height + window.innerHeight;
      const progress = (window.innerHeight - rect.top) / total;
      setFill(Math.min(1, Math.max(0, (progress - 0.15) / 0.6)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const active = Math.min(CLAIMS.length, Math.floor(fill * (CLAIMS.length + 0.4)));

  return (
    <section id="purity" ref={ref} className="bg-cream/60 py-20 md:py-28">
      <div className="mx-auto grid max-w-5xl items-center gap-14 px-5 md:grid-cols-2">
        <Reveal className="flex justify-center">
          <div className="relative">
            {/* Jug */}
            <svg
              width="240"
              height="320"
              viewBox="0 0 240 320"
              role="img"
              aria-label={`Milk jug filling to ${Math.round(fill * 100)} percent pure milk`}
              className="drop-shadow-[0_24px_50px_oklch(0.35_0.05_145/0.25)]"
            >
              <defs>
                <clipPath id="jugClip">
                  <path d="M56 60 h128 a14 14 0 0 1 14 14 v186 a30 30 0 0 1 -30 30 H72 a30 30 0 0 1 -30 -30 V74 a14 14 0 0 1 14 -14 z" />
                </clipPath>
              </defs>
              <rect x="42" y="40" width="156" height="26" rx="13" className="fill-milk stroke-border" />
              <path
                d="M56 60 h128 a14 14 0 0 1 14 14 v186 a30 30 0 0 1 -30 30 H72 a30 30 0 0 1 -30 -30 V74 a14 14 0 0 1 14 -14 z"
                className="fill-milk/40 stroke-border"
                strokeWidth="2"
              />
              <g clipPath="url(#jugClip)">
                <rect
                  x="0"
                  y={290 - fill * 230}
                  width="240"
                  height="320"
                  className="fill-milk"
                  style={{ transition: "y 0.35s ease-out" }}
                />
                <rect
                  x="0"
                  y={290 - fill * 230}
                  width="240"
                  height="10"
                  className="fill-leaf-soft/60"
                  style={{ transition: "y 0.35s ease-out" }}
                />
              </g>
              <path
                d="M56 60 h128 a14 14 0 0 1 14 14 v186 a30 30 0 0 1 -30 30 H72 a30 30 0 0 1 -30 -30 V74 a14 14 0 0 1 14 -14 z"
                fill="none"
                className="stroke-leaf/30"
                strokeWidth="3"
              />
            </svg>
            <span className="absolute -right-2 bottom-6 rounded-full bg-leaf px-3 py-1 text-xs font-medium text-primary-foreground tabular-nums">
              {Math.round(fill * 100)}% pure
            </span>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="text-xs tracking-[0.24em] text-leaf uppercase">The purity test</p>
            <h2 className="mt-4 text-3xl md:text-5xl">Watch what goes in.</h2>
          </Reveal>
          <ul className="mt-8 space-y-4">
            {CLAIMS.map((claim, i) => (
              <li
                key={claim}
                className="flex items-center gap-4 transition-all duration-500"
                style={{
                  opacity: i < active ? 1 : 0.28,
                  transform: i < active ? "none" : "translateX(-10px)",
                }}
              >
                <span className="flex size-8 items-center justify-center rounded-full border border-leaf-soft bg-milk text-xs font-semibold text-leaf">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-xl md:text-2xl">{claim}</span>
              </li>
            ))}
          </ul>
          <p
            className="mt-10 font-display text-3xl text-leaf transition-all duration-700 md:text-4xl"
            style={{ opacity: fill > 0.92 ? 1 : 0.15 }}
          >
            JUST PURE MILK.
          </p>
        </div>
      </div>
    </section>
  );
}
