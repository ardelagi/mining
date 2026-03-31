"use client";

import { useState, useMemo, useEffect } from "react";
import BackgroundGrid from "@/app/components/backgroundGrid";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import miningData from "@/data/mining.json";
import { MiningData } from "@/types";
import {
  Search, Filter, TrendingUp, Package, Gem, DollarSign,
  Calculator, ChevronUp, ChevronDown, SlidersHorizontal,
} from "lucide-react";

type Tier = "topPriority" | "recommended" | "lowProfit" | "none";
type TierFilter = "all" | Tier;

const fmt = (n: string) => n.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
const fmtUSD = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);

const BASE = ["gold_ring","silver_ring","gold_chain","silver_chain","gold_earring","silver_earring"];
const isBase = (n: string) => BASE.includes(n);

export default function InfoPage() {
  const [data, setData] = useState<MiningData>(miningData as MiningData);
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("all");
  const [tier, setTier] = useState<TierFilter>("all");
  const [sort, setSort] = useState<"desc" | "asc">("desc");

  useEffect(() => {
    const saved = localStorage.getItem("customPrices");
    if (saved) setData(JSON.parse(saved));
  }, []);

  const allItems = useMemo(() => ({ ...data.tambang, ...data.perhiasan }), [data]);

  const calcCost = (req?: Record<string, number>): number => {
    if (!req) return 0;
    let cost = 0;
    for (const [item, qty] of Object.entries(req)) {
      const d = allItems[item];
      if (!d) continue;
      const sub =
        d.require && Object.keys(d.require).length > 0
          ? calcCost(d.require)
          : d.price;
      cost += (sub || d.price) * qty;
    }
    return cost;
  };

  const items = useMemo(() => {
    return Object.entries(allItems).map(([name, d]) => {
      const cost = calcCost(d.require);
      const profit = d.price - cost;
      const margin = cost > 0 ? (profit / cost) * 100 : 0;

      let category = "raw";
      if (Object.keys(data.tambang).includes(name)) {
        if (name.includes("ingot")) category = "ingots";
        else if (["diamond","ruby","sapphire","emerald"].some((g) => name.includes(g)))
          category = "gems";
        else category = "raw";
      } else {
        if (isBase(name)) category = "base";
        else if (name.includes("ring")) category = "rings";
        else if (name.includes("earring")) category = "earrings";
        else category = "necklaces";
      }

      const hasReq = Object.keys(d.require ?? {}).length > 0;
      let t: Tier = "none";
      if (!isBase(name) && hasReq) {
        if (margin >= 50) t = "topPriority";
        else if (margin >= 25) t = "recommended";
        else if (margin > 0) t = "lowProfit";
      }

      return { name, displayName: fmt(name), price: d.price, require: d.require, cost, profit, margin, category, hasReq, tier: t };
    });
  }, [allItems]);

  const filtered = useMemo(() => {
    let list = items;
    if (search) list = list.filter((i) => i.displayName.toLowerCase().includes(search.toLowerCase()));
    if (cat !== "all") list = list.filter((i) => i.category === cat);
    if (tier !== "all") list = list.filter((i) => i.tier === tier);
    return [...list].sort((a, b) => sort === "desc" ? b.margin - a.margin : a.margin - b.margin);
  }, [items, search, cat, tier, sort]);

  const tierBadge = (t: Tier) => {
    if (t === "topPriority") return <span className="tag tag-green">🔥 Prioritas Utama</span>;
    if (t === "recommended") return <span className="tag tag-blue">✓ Direkomendasikan</span>;
    if (t === "lowProfit")   return <span className="tag tag-orange">⚡ Profit Rendah</span>;
    return null;
  };

  const profitColor = (profit: number, margin: number, name: string) => {
    if (isBase(name)) return "var(--accent-blue)";
    if (profit <= 0) return "var(--accent-red)";
    if (margin >= 50) return "var(--accent-green)";
    if (margin >= 25) return "var(--accent-blue)";
    return "var(--accent-orange)";
  };

  const cats = [
    { key: "all",       label: "Semua" },
    { key: "raw",       label: "Raw" },
    { key: "ingots",    label: "Ingots" },
    { key: "gems",      label: "Gems" },
    { key: "base",      label: "Base" },
    { key: "rings",     label: "Rings" },
    { key: "earrings",  label: "Earrings" },
    { key: "necklaces", label: "Necklaces" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)" }}>
      <BackgroundGrid />
      <Navbar />

      <header className="relative z-10" style={{ paddingTop: 40, paddingBottom: 16, textAlign: "center" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--accent-green)",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            ◆ Database ◆
          </span>
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(28px, 4vw, 44px)",
              margin: "8px 0 10px",
              color: "var(--text-primary)",
            }}
          >
            Item Info &amp;{" "}
            <span
              style={{
                backgroundImage: "linear-gradient(90deg, var(--accent-green), var(--accent-blue))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Harga
            </span>
          </h1>
          <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
            Daftar lengkap semua item, requirement, dan analisis profit
          </p>
        </div>
      </header>

      <main className="relative z-10" style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 24px 64px" }}>
        {/* Controls */}
        <div className="card" style={{ padding: "16px 20px", marginBottom: 20 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gap: 10,
              marginBottom: 14,
            }}
          >
            {/* Search */}
            <div style={{ position: "relative" }}>
              <Search
                size={14}
                style={{
                  position: "absolute",
                  left: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                }}
              />
              <input
                className="input-base"
                type="text"
                placeholder="Cari item..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: "100%", padding: "9px 12px 9px 32px", fontSize: 13 }}
              />
            </div>
            {/* Cat */}
            <div style={{ position: "relative" }}>
              <select className="styled" value={cat} onChange={(e) => setCat(e.target.value)}>
                {cats.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
              </select>
              <Filter
                size={13}
                style={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                  color: "var(--text-muted)",
                }}
              />
            </div>
            {/* Tier */}
            <div style={{ position: "relative" }}>
              <select
                className="styled"
                value={tier}
                onChange={(e) => setTier(e.target.value as TierFilter)}
              >
                <option value="all">Semua Tier</option>
                <option value="topPriority">Prioritas Utama</option>
                <option value="recommended">Direkomendasikan</option>
                <option value="lowProfit">Profit Rendah</option>
              </select>
              <SlidersHorizontal
                size={13}
                style={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                  color: "var(--text-muted)",
                }}
              />
            </div>
            {/* Sort */}
            <button
              className="btn-ghost"
              onClick={() => setSort((s) => (s === "desc" ? "asc" : "desc"))}
              style={{ justifyContent: "space-between" }}
            >
              <span>Margin: {sort === "desc" ? "Tinggi → Rendah" : "Rendah → Tinggi"}</span>
              {sort === "desc" ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {[
              { label: "Total Item",       val: filtered.length,                                          color: "var(--accent-blue)" },
              { label: "Profitable",        val: filtered.filter((i) => !isBase(i.name) && i.profit > 0).length, color: "var(--accent-green)" },
              { label: "Base Components",   val: filtered.filter((i) => isBase(i.name)).length,            color: "var(--accent-blue)" },
              { label: "Raw Material",      val: filtered.filter((i) => !i.hasReq).length,                 color: "var(--accent-orange)" },
            ].map((s) => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: 20,
                    color: s.color,
                  }}
                >
                  {s.val}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 14,
            }}
          >
            {filtered.map((item) => (
              <div
                key={item.name}
                className="card"
                style={{
                  borderColor:
                    item.tier === "topPriority"
                      ? "rgba(57,211,83,0.25)"
                      : item.tier === "recommended"
                      ? "rgba(88,166,255,0.2)"
                      : "var(--border-subtle)",
                  overflow: "hidden",
                  transition: "border-color 0.2s, transform 0.15s, box-shadow 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                }}
              >
                {/* Card header */}
                <div
                  style={{
                    padding: "14px 16px",
                    borderBottom: "1px solid var(--border-subtle)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: 8,
                      marginBottom: 8,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 700,
                        fontSize: 15,
                        color: "var(--text-primary)",
                        lineHeight: 1.2,
                      }}
                    >
                      {item.displayName}
                    </span>
                    <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                      {item.hasReq && (
                        <Calculator size={13} style={{ color: "var(--text-muted)" }} />
                      )}
                      {item.margin >= 25 && !isBase(item.name) && (
                        <TrendingUp size={13} style={{ color: "var(--accent-green)" }} />
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 800,
                        fontSize: 20,
                        color: "var(--accent-green)",
                      }}
                    >
                      {fmtUSD(item.price)}
                    </span>
                    {item.profit !== 0 && (
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: profitColor(item.profit, item.margin, item.name),
                        }}
                      >
                        {item.profit > 0 ? "+" : ""}{fmtUSD(item.profit)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Requirements */}
                {item.hasReq ? (
                  <div
                    style={{
                      padding: "12px 16px",
                      background: "rgba(255,255,255,0.02)",
                      borderBottom: "1px solid var(--border-subtle)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 10,
                        color: "var(--text-muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        marginBottom: 8,
                      }}
                    >
                      Requirements
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      {Object.entries(item.require ?? {}).map(([r, q]) => (
                        <div
                          key={r}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: 12,
                            color: "var(--text-secondary)",
                          }}
                        >
                          <span>{fmt(r)}</span>
                          <span style={{ color: "var(--text-muted)" }}>×{q}</span>
                        </div>
                      ))}
                    </div>
                    {item.cost > 0 && (
                      <div
                        style={{
                          marginTop: 10,
                          paddingTop: 8,
                          borderTop: "1px solid var(--border-subtle)",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Total Cost</span>
                        <span style={{ fontSize: 13, color: "var(--accent-orange)", fontWeight: 600 }}>
                          {fmtUSD(item.cost)}
                        </span>
                      </div>
                    )}
                    {item.margin > 0 && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginTop: 4,
                        }}
                      >
                        <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Margin</span>
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: profitColor(item.profit, item.margin, item.name),
                          }}
                        >
                          {item.margin.toFixed(1)}%
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    style={{
                      padding: "10px 16px",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      borderBottom: "1px solid var(--border-subtle)",
                    }}
                  >
                    <Package size={12} style={{ color: "var(--accent-orange)" }} />
                    <span
                      style={{
                        fontSize: 11,
                        color: "var(--accent-orange)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      Raw Material
                    </span>
                  </div>
                )}

                {/* Footer / badge */}
                <div style={{ padding: "10px 16px" }}>
                  {isBase(item.name) ? (
                    <span className="tag tag-blue">
                      <Package size={10} /> Base Component
                    </span>
                  ) : item.hasReq ? (
                    tierBadge(item.tier) ?? (
                      <span className="tag tag-muted" style={{ fontSize: 9 }}>
                        ❌ Tidak Profitable
                      </span>
                    )
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Search size={40} style={{ color: "var(--text-muted)" }} />
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16 }}>
              Tidak ada item ditemukan
            </span>
            <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>
              Coba ubah filter atau kata kunci pencarian
            </span>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
