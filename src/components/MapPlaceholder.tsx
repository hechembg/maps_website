type Props = {
  gov: "Manouba" | "Ariana";
  year: string;
  method: string;
};

const methodColors: Record<string, [string, string, string, string]> = {
  "Random Forest": ["#1e3a8a", "#3b82f6", "#22c55e", "#f59e0b"],
  "Support Vector Machine": ["#0f766e", "#14b8a6", "#a3e635", "#facc15"],
  "Maximum de Vraisemblance": ["#7c2d12", "#ea580c", "#fbbf24", "#84cc16"],
  "Extension urbaine": ["#111827", "#374151", "#9ca3af", "#ef4444"],
};

export function MapPlaceholder({ gov, year, method }: Props) {
  const palette = methodColors[method] ?? ["#1e3a8a", "#3b82f6", "#22c55e", "#f59e0b"];
  const seed = `${gov}-${year}-${method}`;
  // deterministic pseudo-random regions
  const cells: { x: number; y: number; c: string }[] = [];
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 24; x++) {
      h = (h * 1103515245 + 12345) & 0x7fffffff;
      // create a blob-like distribution: center bias
      const dx = (x - 12) / 12;
      const dy = (y - 8) / 8;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d > 0.95) continue;
      const idx = (h >> 8) % palette.length;
      cells.push({ x, y, c: palette[idx] });
    }
  }
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border bg-card shadow-sm">
      <svg viewBox="0 0 240 160" className="h-full w-full">
        <rect width="240" height="160" fill="#f3f6fa" />
        {cells.map((c, i) => (
          <rect key={i} x={c.x * 10} y={c.y * 10} width="10" height="10" fill={c.c} opacity="0.85" />
        ))}
        <rect x="0" y="0" width="240" height="160" fill="none" stroke="#0f172a" strokeOpacity="0.08" />
      </svg>
      <div className="absolute left-3 top-3 rounded-md bg-background/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-foreground shadow-sm">
        {gov} · {year}
      </div>
      <div className="absolute bottom-3 right-3 rounded-md bg-primary/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground shadow-sm">
        {method}
      </div>
      <div className="absolute bottom-3 left-3 flex items-center gap-1">
        {palette.map((p, i) => (
          <span key={i} className="h-3 w-3 rounded-sm border border-white/60" style={{ background: p }} />
        ))}
      </div>
    </div>
  );
}
