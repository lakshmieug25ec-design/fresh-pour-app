import { useMemo, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Phone } from "lucide-react";
import { toast } from "sonner";
import { SHOP, telUrl, whatsappUrl } from "@/lib/shop";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

const QUANTITIES = ["250 ml", "500 ml", "1 L", "2 L", "Custom"] as const;
const MODES = ["Pickup", "Delivery"] as const;

type Quantity = (typeof QUANTITIES)[number];
type Mode = (typeof MODES)[number];

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200",
        active
          ? "border-leaf bg-leaf text-primary-foreground shadow-[var(--shadow-soft)]"
          : "border-border bg-milk text-foreground hover:-translate-y-0.5 hover:border-leaf-soft",
      )}
    >
      {children}
    </button>
  );
}

export function PreOrder() {
  const [quantity, setQuantity] = useState<Quantity>("1 L");
  const [customQty, setCustomQty] = useState("");
  const [mode, setMode] = useState<Mode>("Pickup");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const finalQty = quantity === "Custom" ? customQty.trim() : quantity;

  const message = useMemo(() => {
    const lines = [
      "*New Milk Pre-Order*",
      "",
      `🥛 Quantity: ${finalQty || "—"}`,
      `🚚 ${mode}`,
      `📅 Date: ${date || "—"}`,
      `⏰ Time: ${time || "—"}`,
      `👤 Name: ${name || "—"}`,
      `📱 Mobile: ${mobile || "—"}`,
    ];
    if (mode === "Delivery") lines.push(`📍 Address: ${address || "—"}`);
    if (notes.trim()) lines.push(`📝 Notes: ${notes.trim()}`);
    lines.push("", "100% PURE MILK. NOTHING ELSE.");
    return lines.join("\n");
  }, [finalQty, mode, date, time, name, mobile, address, notes]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!finalQty) return toast.error("Please choose a quantity.");
    if (!date || !time) return toast.error("Please pick a date and time.");
    if (!name.trim()) return toast.error("Please enter your name.");
    if (!/^\d{10}$/.test(mobile.trim())) return toast.error("Enter a valid 10-digit mobile number.");
    if (mode === "Delivery" && !address.trim())
      return toast.error("Please add a delivery address.");

    toast.success("Opening WhatsApp with your order…");
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="preorder" className="grain-cream py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <p className="text-xs tracking-[0.24em] text-leaf uppercase">Pre-order</p>
          <h2 className="mt-4 text-3xl md:text-5xl">Reserve your milk.</h2>
          <p className="mt-4 max-w-sm text-muted-foreground">
            Fill in your order and we'll send it straight to our WhatsApp. We confirm every order
            personally before it's prepared.
          </p>
          <div className="mt-8 rounded-2xl border border-leaf-soft bg-milk p-5">
            <p className="text-sm text-muted-foreground">Prefer to talk?</p>
            <Button asChild variant="cream" size="pill" className="mt-3">
              <a href={telUrl}>
                <Phone /> Call {SHOP.phone}
              </a>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <form onSubmit={submit} className="surface-card space-y-7 p-6 md:p-8">
            <fieldset>
              <legend className="text-sm font-medium">Quantity</legend>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {QUANTITIES.map((q) => (
                  <Chip key={q} active={quantity === q} onClick={() => setQuantity(q)}>
                    {q}
                  </Chip>
                ))}
              </div>
              {quantity === "Custom" && (
                <Input
                  className="mt-3 h-11 rounded-xl"
                  placeholder="e.g. 3.5 litres"
                  value={customQty}
                  onChange={(e) => setCustomQty(e.target.value)}
                  aria-label="Custom quantity"
                />
              )}
            </fieldset>

            <fieldset>
              <legend className="text-sm font-medium">Pickup or Delivery</legend>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {MODES.map((m) => (
                  <Chip key={m} active={mode === m} onClick={() => setMode(m)}>
                    {m}
                  </Chip>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  className="h-11 rounded-xl"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  className="h-11 rounded-xl"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Your name</Label>
                <Input
                  id="name"
                  className="h-11 rounded-xl"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile number</Label>
                <Input
                  id="mobile"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  className="h-11 rounded-xl"
                  placeholder="10-digit mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                />
              </div>
            </div>

            {mode === "Delivery" && (
              <div className="space-y-2">
                <Label htmlFor="address">Delivery address</Label>
                <Textarea
                  id="address"
                  rows={3}
                  className="rounded-xl"
                  placeholder="House / street / landmark, area"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea
                id="notes"
                rows={2}
                className="rounded-xl"
                placeholder="Anything we should know?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <Button type="submit" variant="whatsapp" size="pillLg" className="w-full">
              <MessageCircle /> Send order on WhatsApp
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Opens WhatsApp with your order details pre-filled.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
