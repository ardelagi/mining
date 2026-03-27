"use client";

import { useEffect, useState } from "react";
import { FloatingIcon } from "@/types";

const ICONS = ["◆", "◇", "⬡", "⬟", "▲", "△", "✦", "✧"];
const COLORS = [
  "rgba(57,211,83,0.12)",
  "rgba(88,166,255,0.1)",
  "rgba(188,140,255,0.1)",
  "rgba(212,160,23,0.1)",
  "rgba(240,136,62,0.08)",
];

export default function BackgroundGrid() {
  const [icons, setIcons] = useState<FloatingIcon[]>([]);

  useEffect(() => {
    const list: FloatingIcon[] = Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: Math.random() * 0.6 + 0.4,
      rotation: Math.random() * 360,
      animationDelay: Math.random() * 10,
      animationDuration: Math.random() * 18 + 12,
      iconType: Math.floor(Math.random() * ICONS.length),
    }));
    setIcons(list);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base grid */}
      <div className="absolute inset-0 grid-bg" />

      {/* Radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 20% 30%, rgba(57,211,83,0.04) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 80% 70%, rgba(88,166,255,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Floating symbols */}
      {icons.map((icon) => (
        <div
          key={icon.id}
          className="floating-icon absolute select-none"
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
            fontSize: `${icon.scale * 20}px`,
            color: COLORS[icon.iconType % COLORS.length],
            "--dur": `${icon.animationDuration}s`,
            "--delay": `${icon.animationDelay}s`,
          } as React.CSSProperties}
        >
          {ICONS[icon.iconType]}
        </div>
      ))}

      {/* Top/bottom vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8,12,16,0.6) 0%, transparent 15%, transparent 85%, rgba(8,12,16,0.7) 100%)",
        }}
      />
    </div>
  );
}
