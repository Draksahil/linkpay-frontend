"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

interface LineChartProps {
  data: { label: string; value: number }[];
  height?: number;
  color?: string;
  formatValue?: (v: number) => string;
  className?: string;
}

/**
 * Minimal dependency-free line chart. Deliberately not pulling in a charting
 * library for a handful of dashboard sparklines — keeps the bundle small and
 * the visual fully custom to LinkPay's tokens.
 */
export function LineChart({ data, height = 220, color = "#6D3FEE", formatValue, className }: LineChartProps) {
  const id = useId();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const width = 600;
  const padding = 24;
  const max = Math.max(...data.map((d) => d.value), 1);
  const min = Math.min(...data.map((d) => d.value), 0);
  const range = max - min || 1;

  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1 || 1)) * (width - padding * 2);
    const y = height - padding - ((d.value - min) / range) * (height - padding * 2);
    return { x, y, ...d };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1]?.x ?? 0} ${height - padding} L ${points[0]?.x ?? 0} ${height - padding} Z`;

  return (
    <div className={cn("relative w-full", className)}>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" preserveAspectRatio="none" style={{ height }}>
        <defs>
          <linearGradient id={`fill-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.28" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1={padding} x2={width - padding} y1={padding + f * (height - padding * 2)} y2={padding + f * (height - padding * 2)} stroke="currentColor" strokeOpacity="0.06" strokeWidth="1" />
        ))}
        <path d={areaPath} fill={`url(#fill-${id})`} />
        <path d={linePath} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p, i) => (
          <g key={i}>
            <rect
              x={p.x - (width / points.length) / 2}
              y={0}
              width={width / points.length}
              height={height}
              fill="transparent"
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
            />
            {hoverIndex === i && (
              <>
                <line x1={p.x} x2={p.x} y1={padding} y2={height - padding} stroke={color} strokeOpacity="0.25" strokeDasharray="3 3" />
                <circle cx={p.x} cy={p.y} r="4.5" fill={color} stroke="white" strokeWidth="2" />
              </>
            )}
          </g>
        ))}
      </svg>
      {hoverIndex !== null && points[hoverIndex] && (
        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-lg bg-ink-950 px-2.5 py-1.5 text-xs font-medium text-white shadow-soft"
          style={{ left: `${(points[hoverIndex].x / width) * 100}%`, top: `${(points[hoverIndex].y / height) * 100}%` }}
        >
          <div className="font-mono tabular-nums">{formatValue ? formatValue(points[hoverIndex].value) : points[hoverIndex].value}</div>
          <div className="text-white/60">{points[hoverIndex].label}</div>
        </div>
      )}
    </div>
  );
}

export function BarChart({ data, height = 180, color = "#6D3FEE" }: { data: { label: string; value: number }[]; height?: number; color?: string }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex items-end gap-2" style={{ height }}>
      {data.map((d, i) => (
        <div key={i} className="group flex flex-1 flex-col items-center gap-2">
          <div className="relative flex w-full flex-1 items-end">
            <div
              className="w-full rounded-t-md transition-all group-hover:opacity-80"
              style={{ height: `${(d.value / max) * 100}%`, backgroundColor: color, minHeight: 4 }}
            />
          </div>
          <span className="text-[10px] font-medium text-ink-400">{d.label}</span>
        </div>
      ))}
    </div>
  );
}
