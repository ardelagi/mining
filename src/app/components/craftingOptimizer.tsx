"use client";

import {
  Inventory,
  OptimizationResult,
  OptimizedStep,
  RequirementInfo,
  MiningData,
} from "@/types";
import { useEffect, useState, useCallback } from "react";
import miningData from "@/data/mining.json";
import {
  Zap,
  Package,
  BarChart3,
  Clock,
  DollarSign,
  CheckCheck,
  RotateCcw,
  ChevronDown,
  Layers,
  Gem,
  Circle,
  CheckCircle2,
  CircleX,
  TrendingUp,
  Coins,
  AlertCircle,
  ShoppingBag,
} from "lucide-react";

/* ── Constants ─────────────────────────────────────────────── */

const CATEGORIES = {
  "Raw Materials": {
    icon: Package,
    items: [
      "copper_ore","iron_ore","gold_ore","silver_ore","alluminium_ore",
      "coal","uncut_sapphire","uncut_diamond","uncut_ruby","uncut_emerald",
    ],
  },
  Ingots: {
    icon: Layers,
    items: [
      "copper_ingot","iron_ingot","gold_ingot","silver_ingot","alluminium_ingot",
      "steel_ingot","sapphire","diamond","ruby","emerald",
    ],
  },
  Rings: {
    icon: Circle,
    items: [
      "gold_ring","silver_ring","emerald_ring","ruby_ring","sapphire_ring",
      "diamond_ring_silver","emerald_ring_silver","ruby_ring_silver","sapphire_ring_silver",
    ],
  },
  Earrings: {
    icon: Gem,
    items: [
      "gold_earring","silver_earring","diamond_earring","ruby_earring",
      "sapphire_earring","emerald_earring","diamond_earring_silver",
      "ruby_earring_silver","sapphire_earring_silver","emerald_earring_silver",
    ],
  },
  Necklaces: {
    icon: Coins,
    items: [
      "gold_chain","silver_chain","ruby_necklace","sapphire_necklace",
      "emerald_necklace","diamond_necklace_silver","ruby_necklace_silver",
      "emerald_necklace_silver","sapphire_necklace_silver",
    ],
  },
} as const;

type CatKey = keyof typeof CATEGORIES;

const fmt = (n: string) =>
  n.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

const fmtUSD = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);

const createEmpty = (): Inventory =>
  Object.values(CATEGORIES)
    .flatMap((c) => c.items)
    .reduce((acc, k) => ({ ...acc, [k]: 0 }), {});

/* ── Component ─────────────────────────────────────────────── */

export default function CraftingOptimizer() {
  const [mData, setMData] = useState<MiningData>(miningData as MiningData);
  const [inventory, setInventory] = useState<Inventory>(createEmpty());
  const [result, setResult] = useState<OptimizationResult["data"] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<CatKey>("Raw Materials");
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [catOpen, setCatOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("customPrices");
    if (saved) setMData(JSON.parse(saved));
  }, []);

  const allItems = { ...mData.tambang, ...mData.perhiasan };

  const totalItems = Object.values(inventory).reduce((s, v) => s + v, 0);

  const getPrice = (k: string) => allItems[k]?.price ?? 0;

  const handleChange = useCallback((k: string, val: string) => {
    const n = parseInt(val.replace(/\D/g, "")) || 0;
    setInventory((p) => ({ ...p, [k]: Math.max(0, n) }));
  }, []);

  const handleOptimize = async () => {
    setLoading(true);
    setError(null);
    setCompleted(new Set());
    try {
      const cp = JSON.parse(localStorage.getItem("customPrices") || "{}");
      const res = await fetch("/api/optimizecrafting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inventory, customPrices: cp }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: OptimizationResult = await res.json();
      if (!data.success) throw new Error(data.error || "Unknown error");
      setResult(data.data ?? null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const toggleDone = (i: number) =>
    setCompleted((p) => {
      const s = new Set(p);
      s.has(i) ? s.delete(i) : s.add(i);
      return s;
    });

  const tierOf = (v: number, steps: OptimizedStep[]) => {
    if (!steps.length) return "mid";
    const vals = steps.map((s) => s.value).sort((a, b) => b - a);
    const p25 = vals[Math.floor(vals.length * 0.25)] ?? 0;
    const p75 = vals[Math.floor(vals.length * 0.75)] ?? 0;
    if (v >= p25) return "high";
    if (v <= p75) return "low";
    return "mid";
  };

  const tierStyle = {
    high: { bar: "var(--accent-green)",  val: "var(--accent-green)",  tag: "tag-green" },
    mid:  { bar: "var(--accent-blue)",   val: "var(--accent-blue)",   tag: "tag-blue" },
    low:  { bar: "var(--accent-orange)", val: "var(--accent-orange)", tag: "tag-orange" },
  };

  const CurIcon = CATEGORIES[activeTab].icon;

  return (
    <div style={{ fontFamily: "'JetBrains Mono', monospace" }}>

      {/* ── Top bar ── */}
      <div
        className="card mb-6 p-4"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Logo area */}
          <div
            style={{
              width: 44, height: 44, borderRadius: "var(--radius-md)",
              background: "linear-gradient(135deg, rgba(57,211,83,0.2), rgba(88,166,255,0.15))",
              border: "1px solid rgba(57,211,83,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22,
            }}
          >
            ⛏
          </div>
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: "var(--text-primary)" }}>
              Crafting Optimizer
            </div>
            <div style={{ fontSize: 11, color: "var(--text-secondary)", letterSpacing: "0.05em" }}>
              IMERP · Mining &amp; Crafting Calculator
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {totalItems > 0 && (
            <span className="tag tag-blue">{totalItems.toLocaleString()} items</span>
          )}
          <button
            className="btn-primary"
            onClick={handleOptimize}
            disabled={loading || totalItems === 0}
          >
            {loading ? (
              <>
                <span className="spin" style={{ display: "inline-block", width: 14, height: 14, border: "2px solid rgba(0,0,0,0.3)", borderTop: "2px solid #000", borderRadius: "50%" }} />
                Menghitung...
              </>
            ) : (
              <>
                <Zap size={14} strokeWidth={2.5} />
                Hitung Optimasi
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,2fr) minmax(0,3fr)", gap: 20 }}>

        {/* Left: Inventory */}
        <div className="card" style={{ overflow: "hidden" }}>
          {/* Header */}
          <div
            style={{
              padding: "14px 20px",
              borderBottom: "1px solid var(--border-subtle)",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Package size={15} style={{ color: "var(--accent-blue)" }} />
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14 }}>Inventory</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {totalItems > 0 && (
                <button
                  className="btn-danger"
                  onClick={() => setInventory(createEmpty())}
                  style={{ padding: "4px 10px", fontSize: 11 }}
                >
                  <RotateCcw size={11} /> Clear
                </button>
              )}
            </div>
          </div>

          {/* Category tabs — mobile dropdown / desktop list */}
          <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border-subtle)" }}>
            {/* Mobile: dropdown */}
            <div className="lg:hidden">
              <button
                onClick={() => setCatOpen(!catOpen)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "8px 12px",
                  background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-sm)", color: "var(--text-primary)", cursor: "pointer",
                  fontSize: 13,
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <CurIcon size={13} style={{ color: "var(--accent-green)" }} />
                  {activeTab}
                </span>
                <ChevronDown size={13} style={{ transform: catOpen ? "rotate(180deg)" : "none", transition: "transform 0.15s" }} />
              </button>
              {catOpen && (
                <div style={{
                  marginTop: 4, background: "var(--bg-elevated)",
                  border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-sm)",
                  overflow: "hidden",
                }}>
                  {(Object.keys(CATEGORIES) as CatKey[]).map((cat) => {
                    const Icon = CATEGORIES[cat].icon;
                    return (
                      <button
                        key={cat}
                        onClick={() => { setActiveTab(cat); setCatOpen(false); }}
                        style={{
                          width: "100%", display: "flex", alignItems: "center", gap: 8,
                          padding: "8px 12px", background: cat === activeTab ? "rgba(57,211,83,0.08)" : "transparent",
                          color: cat === activeTab ? "var(--accent-green)" : "var(--text-secondary)",
                          border: "none", cursor: "pointer", fontSize: 13, textAlign: "left",
                        }}
                      >
                        <Icon size={13} /> {cat}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Desktop: horizontal scroll tabs */}
            <div className="hidden lg:flex" style={{ gap: 4, overflowX: "auto" }}>
              {(Object.keys(CATEGORIES) as CatKey[]).map((cat) => {
                const Icon = CATEGORIES[cat].icon;
                return (
                  <button
                    key={cat}
                    className={`cat-tab${cat === activeTab ? " active" : ""}`}
                    onClick={() => setActiveTab(cat)}
                  >
                    <Icon size={12} />
                    <span style={{ fontSize: 12 }}>{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Items grid */}
          <div style={{ padding: "16px", overflowY: "auto", maxHeight: 600 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
              {CATEGORIES[activeTab].items.map((item) => {
                const price = getPrice(item);
                const val = inventory[item] ?? 0;
                return (
                  <div key={item} className="inv-card">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={val === 0 ? "" : val.toLocaleString()}
                      onChange={(e) => handleChange(item, e.target.value)}
                      placeholder="0"
                    />
                    <div className="item-name">{fmt(item)}</div>
                    <div style={{ textAlign: "center" }}>
                      {price > 0 ? (
                        <span className="tag tag-green" style={{ fontSize: 9 }}>${price}/unit</span>
                      ) : (
                        <span className="tag tag-muted" style={{ fontSize: 9 }}>raw</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Results */}
        <div className="card" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div
            style={{
              padding: "14px 20px",
              borderBottom: "1px solid var(--border-subtle)",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <BarChart3 size={15} style={{ color: "var(--accent-green)" }} />
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14 }}>Hasil Optimasi</span>
            </div>
            {completed.size > 0 && (
              <button
                className="btn-ghost"
                onClick={() => { setCompleted(new Set()); handleOptimize(); }}
              >
                <RotateCcw size={11} /> Reset Progress
              </button>
            )}
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>

            {/* Error */}
            {error && (
              <div
                className="animate-in"
                style={{
                  marginBottom: 16, padding: "12px 16px",
                  background: "rgba(248,81,73,0.08)", border: "1px solid rgba(248,81,73,0.3)",
                  borderRadius: "var(--radius-md)", display: "flex", gap: 10, alignItems: "flex-start",
                }}
              >
                <AlertCircle size={16} style={{ color: "var(--accent-red)", flexShrink: 0, marginTop: 1 }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 12, color: "var(--accent-red)", marginBottom: 2 }}>Error</div>
                  <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{error}</div>
                </div>
              </div>
            )}

            {result ? (
              <div className="animate-in" style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                {/* Summary */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                  <div className="summary-card" style={{ background: "rgba(57,211,83,0.06)", borderColor: "rgba(57,211,83,0.2)" }}>
                    <span className="label">Net Profit</span>
                    <span className="value" style={{ color: "var(--accent-green)", fontSize: 18 }}>
                      {fmtUSD(result.summary.totalProfit)}
                    </span>
                  </div>
                  <div className="summary-card" style={{ background: "rgba(88,166,255,0.06)", borderColor: "rgba(88,166,255,0.2)" }}>
                    <span className="label">Total Jual</span>
                    <span className="value" style={{ color: "var(--accent-blue)", fontSize: 18 }}>
                      {fmtUSD(result.summary.totalSellValue)}
                    </span>
                  </div>
                  <div className="summary-card" style={{ background: "rgba(212,160,23,0.06)", borderColor: "rgba(212,160,23,0.2)" }}>
                    <span className="label">Waktu</span>
                    <span className="value" style={{ color: "var(--accent-gold)", fontSize: 18 }}>
                      {result.summary.totalTimeFormatted}
                    </span>
                  </div>
                </div>

                {/* Production steps */}
                {result.productionSteps.length > 0 && (
                  <div>
                    {/* Section header */}
                    <div
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        marginBottom: 10,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <TrendingUp size={13} style={{ color: "var(--accent-green)" }} />
                        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13 }}>
                          Langkah Produksi
                        </span>
                        <span className="tag tag-muted">{result.productionSteps.length}</span>
                      </div>
                      {/* Legend */}
                      <div style={{ display: "flex", gap: 8 }}>
                        {(["high","mid","low"] as const).map((t) => (
                          <span key={t} style={{ fontSize: 10, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4 }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: tierStyle[t].bar, display: "inline-block" }} />
                            {t === "high" ? "Tinggi" : t === "mid" ? "Sedang" : "Rendah"}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 440, overflowY: "auto" }}>
                      {result.productionSteps.map((step, idx) => {
                        const tier = tierOf(step.value, result.productionSteps) as "high"|"mid"|"low";
                        const ts = tierStyle[tier];
                        const done = completed.has(idx);
                        return (
                          <div
                            key={idx}
                            className={`step-card tier-${tier}${done ? " completed" : ""}`}
                            style={{ "--bar": ts.bar } as React.CSSProperties}
                          >
                            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                              {/* Left */}
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                                  <span
                                    style={{
                                      fontFamily: "'Syne', sans-serif",
                                      fontWeight: 700,
                                      fontSize: 14,
                                      color: done ? "var(--text-muted)" : "var(--text-primary)",
                                      textDecoration: done ? "line-through" : "none",
                                    }}
                                  >
                                    {step.displayName}
                                  </span>
                                  <span className="tag tag-muted">×{step.quantity.toLocaleString()}</span>
                                </div>

                                {/* Requirements */}
                                {step.requirements.length > 0 && (
                                  <div
                                    style={{
                                      fontSize: 11, color: "var(--text-secondary)",
                                      background: "var(--bg-base)", padding: "6px 10px",
                                      borderRadius: "var(--radius-sm)", marginBottom: 8,
                                      border: "1px solid var(--border-subtle)",
                                    }}
                                  >
                                    <span style={{ color: "var(--text-muted)", marginRight: 6 }}>requires:</span>
                                    {step.requirements.map((r: RequirementInfo, ri: number) => (
                                      <span key={r.item}>
                                        {ri > 0 && <span style={{ color: "var(--text-muted)" }}>, </span>}
                                        <span style={{ color: "var(--text-primary)" }}>{r.displayName}</span>
                                        <span style={{ color: "var(--text-muted)" }}>×{r.quantity.toLocaleString()}</span>
                                      </span>
                                    ))}
                                  </div>
                                )}

                                {/* Meta row */}
                                <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                                  <span style={{ fontSize: 11, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4 }}>
                                    <Clock size={10} /> {step.timeFormatted}
                                  </span>
                                  {step.opportunityCost && step.opportunityCost > 0 && (
                                    <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
                                      cost: <span style={{ color: "var(--accent-orange)" }}>{fmtUSD(step.opportunityCost)}</span>
                                    </span>
                                  )}
                                  {step.profitMargin && step.profitMargin > 0 && (
                                    <span className={`tag ${ts.tag}`} style={{ fontSize: 9 }}>
                                      +{step.profitMargin.toFixed(1)}% margin
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Right */}
                              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, flexShrink: 0 }}>
                                <span
                                  style={{
                                    fontFamily: "'Syne', sans-serif",
                                    fontWeight: 800,
                                    fontSize: 16,
                                    color: ts.val,
                                  }}
                                >
                                  {fmtUSD(step.value)}
                                </span>
                                <button
                                  className={`check-btn${done ? " checked" : ""}`}
                                  onClick={() => toggleDone(idx)}
                                  title={done ? "Unmark" : "Mark done"}
                                >
                                  {done ? <CheckCircle2 size={14} /> : <Circle size={14} />}
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Sellable items */}
                {result.sellableItems.length > 0 && (
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                      <ShoppingBag size={13} style={{ color: "var(--accent-green)" }} />
                      <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13 }}>
                        Item Siap Jual
                      </span>
                      <span className="tag tag-muted">{result.sellableItems.length}</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 200, overflowY: "auto" }}>
                      {result.sellableItems.map((item, i) => (
                        <div key={i} className="sell-row">
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <CheckCheck size={12} style={{ color: "var(--accent-green)" }} />
                            <span style={{ fontSize: 13, color: "var(--text-primary)" }}>
                              {item.name}
                            </span>
                            <span className="tag tag-muted" style={{ fontSize: 9 }}>×{item.quantity}</span>
                          </div>
                          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: "var(--accent-green)" }}>
                            {fmtUSD(item.value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Empty state */
              <div className="empty-state">
                <div
                  style={{
                    width: 64, height: 64, borderRadius: "50%",
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border-subtle)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 28, marginBottom: 8,
                  }}
                >
                  ⛏
                </div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: "var(--text-primary)" }}>
                  Siap Optimasi
                </div>
                <div style={{ fontSize: 13, color: "var(--text-secondary)", maxWidth: 300, lineHeight: 1.6 }}>
                  Masukkan jumlah item di inventory lalu klik &ldquo;Hitung Optimasi&rdquo; untuk hasil terbaik
                </div>
                {totalItems === 0 && (
                  <span className="tag tag-muted" style={{ marginTop: 4 }}>
                    Inventory kosong
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
