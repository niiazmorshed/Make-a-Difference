// Deterministic placeholder thumbnail for posts that don't have an image URL.
// We use a CSS gradient + the category initial so cards still feel intentional.

const PALETTES = [
  ["#0ea5e9", "#6366f1"],
  ["#10b981", "#0ea5e9"],
  ["#f59e0b", "#ef4444"],
  ["#8b5cf6", "#ec4899"],
  ["#14b8a6", "#22c55e"],
  ["#f97316", "#eab308"],
  ["#0284c7", "#7c3aed"],
];

const hash = (str = "") => {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
};

export const placeholderGradient = (seed = "") => {
  const [from, to] = PALETTES[hash(seed) % PALETTES.length];
  return `linear-gradient(135deg, ${from} 0%, ${to} 100%)`;
};

export const placeholderLabel = (category = "Volunteer") => {
  const trimmed = category.trim();
  if (!trimmed) return "MAD";
  const words = trimmed.split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
};
