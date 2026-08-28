export const SHOP = {
  name: "Pure Milk",
  tagline: "100% PURE MILK. NOTHING ELSE.",
  phone: "9025699096",
  phoneIntl: "919025699096",
  locality: "Melapalayam, Tirunelveli, Tamil Nadu",
  /** Approximate centre of the Melapalayam locality — used only to frame the map. */
  center: { lat: 8.6928, lng: 77.7167 },
} as const;

export const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  SHOP.locality,
)}`;

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  SHOP.locality,
)}`;

export const telUrl = `tel:${SHOP.phone}`;

export function whatsappUrl(message: string) {
  return `https://wa.me/${SHOP.phoneIntl}?text=${encodeURIComponent(message)}`;
}
