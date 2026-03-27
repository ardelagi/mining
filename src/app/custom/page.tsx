"use client";

import { useState, useEffect } from "react";
import miningData from "@/data/mining.json";
import { MiningData } from "@/types";
import Navigation from "@/app/components/navigation";
import BackgroundGrid from "@/app/components/backgroundGrid";
import { RotateCcw, Save, SlidersHorizontal, Pickaxe, Gem } from "lucide-react";

const fmt = (n: string) => n.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

export default function CustomPricePage() {
  const [data, setData] = useState<MiningData>(miningData as MiningData);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const s = localStorage.getItem("customPrices");
    if (s) setData(JSON.parse(s));
  }, []);

  const update = (cat: "tambang" | "perhiasan", item: string, val: number) => {
    const next = { ...data, [cat]: { ...data[cat], [item]: { ...data[cat][item], price: val } } };
    setData(next);
  };

  const save = () => {
    localStorage.setItem("customPrices", JSON.stringify(data));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const reset = () => {
    localStorage.removeItem("customPrices");
    setData(miningData as MiningData);
  };

  const Section = ({
    title, cat, icon: Icon, accentColor,
  }: { title: string; cat: "tambang" | "perhiasan"; icon: React.ElementType; accentColor: string }) => (
    <div className="card" style={{ overflow: "hidden", marginBottom: 20 }}>
      <div
        style={{
          padding: "14px 20px", borderBottom: "1px solid var(--border-subtle)",
          display: "flex", alignItems: "center", gap: 10,
          background: "var(--bg-elevated)",
        }}
      >
        <Icon size={16} style={{ color: accentColor }} />
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: "var(--text-primary)" }}>
          {title}
        </span>
        <span className="tag tag-muted" style={{ marginLeft: "auto" }}>
          {Object.keys(data[cat]).length} items
        </span>
      </div>
      <div style={{ padding: "16px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 10 }}>
          {Object.entries(data[cat]).map(([name, item]) => (
            <div
              key={name}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                gap: 12, padding: "10px 14px",
                background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-md)",
                transition: "border-color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-default)"}
              onMouseLeave={(e) => (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-subtle)"}
            >
              <span style={{ fontSize: 13, color: "var(--text-secondary)", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {fmt(name)}
              </span>
              <div style={{ position: "relative", flexShrink: 0 }}>
                <span
                  style={{
                    position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)",
                    fontSize: 11, color: "var(--text-muted)", pointerEvents: "none",
                  }}
                >
                  $
                </span>
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) => update(cat, name, Number(e.target.value))}
                  style={{
                    width: 90, paddingLeft: 20, paddingRight: 8, paddingTop: 6, paddingBottom: 6,
                    background: "var(--bg-base)",
                    border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-sm)",
                    color: "var(--text-primary)",
                    fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 13,
                    textAlign: "right", outline: "none",
                    transition: "border-color 0.15s",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent-green-dim)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-subtle)")}
                  min={0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)" }}>
      <BackgroundGrid />

      <header className="relative z-10" style={{ paddingTop: 36, paddingBottom: 12, textAlign: "center" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent-green)", fontFamily: "'JetBrains Mono', monospace" }}>
            ◆ Config ◆
          </span>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 44px)", margin: "6px 0 6px", color: "var(--text-primary)" }}>
            Custom{" "}
            <span style={{ backgroundImage: "linear-gradient(90deg, var(--accent-green), var(--accent-blue))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Item Price
            </span>
          </h1>
          <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
            Sesuaikan harga item untuk kalkulasi yang lebih akurat
          </p>
        </div>
      </header>

      <Navigation />

      <main className="relative z-10" style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 24px 64px" }}>

        {/* Action bar */}
        <div
          className="card"
          style={{
            padding: "12px 20px", marginBottom: 24,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: 12, flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <SlidersHorizontal size={14} style={{ color: "var(--text-muted)" }} />
            <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>
              Perubahan tersimpan di browser — berlaku saat optimasi dijalankan
            </span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn-ghost" onClick={reset}>
              <RotateCcw size={12} /> Reset Default
            </button>
            <button
              className="btn-primary"
              onClick={save}
              style={saved ? { background: "var(--accent-green)" } : {}}
            >
              <Save size={13} />
              {saved ? "Tersimpan!" : "Simpan"}
            </button>
          </div>
        </div>

        <Section title="Tambang (Mining)" cat="tambang" icon={Pickaxe} accentColor="var(--accent-green)" />
        <Section title="Perhiasan (Jewelry)" cat="perhiasan" icon={Gem} accentColor="var(--accent-blue)" />

      </main>

      <footer className="relative z-10" style={{ borderTop: "1px solid var(--border-subtle)", padding: "20px 24px", textAlign: "center" }}>
        <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
          © 2025 IMERPCrafting · Made for IME RP Community · by{" "}
          <a href="https://github.com/aw4e" style={{ color: "var(--accent-green)", textDecoration: "none" }}>aw4e</a>
        </span>
      </footer>
    </div>
  );
}
