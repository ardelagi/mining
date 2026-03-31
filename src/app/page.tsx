"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import BackgroundGrid from "@/app/components/backgroundGrid";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import {
  Calculator,
  TrendingUp,
  Gem,
  Clock,
  ChevronRight,
  Pickaxe,
  BarChart3,
  SlidersHorizontal,
  Zap,
  Package,
  Star,
  ArrowRight,
} from "lucide-react";

/* ── Animated counter ── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const step = to / 40;
    let cur = 0;
    const t = setInterval(() => {
      cur += step;
      if (cur >= to) { setVal(to); clearInterval(t); } else { setVal(Math.floor(cur)); }
    }, 30);
    return () => clearInterval(t);
  }, [to]);
  return <>{val.toLocaleString()}{suffix}</>;
}

/* ── Feature card data ── */
const features = [
  {
    icon: Zap,
    color: "var(--accent-green)",
    bg: "rgba(57,211,83,0.08)",
    border: "rgba(57,211,83,0.2)",
    title: "Crafting Optimizer",
    desc: "Input inventory kamu, sistem otomatis hitung kombinasi crafting paling profitable. Didukung algoritma greedy dengan dependency chain.",
    badge: "Core Feature",
    badgeClass: "tag-green",
  },
  {
    icon: BarChart3,
    color: "var(--accent-blue)",
    bg: "rgba(88,166,255,0.08)",
    border: "rgba(88,166,255,0.2)",
    title: "Item Info & Analisis",
    desc: "Database lengkap semua item mining & perhiasan. Lihat requirement, cost, profit margin, dan rekomendasi prioritas crafting.",
    badge: "Database",
    badgeClass: "tag-blue",
  },
  {
    icon: SlidersHorizontal,
    color: "var(--accent-purple)",
    bg: "rgba(188,140,255,0.08)",
    border: "rgba(188,140,255,0.2)",
    title: "Custom Price",
    desc: "Sesuaikan harga setiap item sesuai kondisi market server kamu. Kalkulasi jadi makin akurat dan relevan.",
    badge: "Personalized",
    badgeClass: "tag-muted",
  },
  {
    icon: Clock,
    color: "var(--accent-gold)",
    bg: "rgba(212,160,23,0.08)",
    border: "rgba(212,160,23,0.2)",
    title: "Time Estimation",
    desc: "Estimasi waktu produksi untuk setiap langkah crafting. Rencanakan sesi mining kamu dengan lebih efisien.",
    badge: "Planning",
    badgeClass: "tag-gold",
  },
];

const stats = [
  { label: "Item dalam Database", value: 45, suffix: "+" },
  { label: "Kategori Crafting", value: 5, suffix: "" },
  { label: "Kalkulasi Akurat", value: 100, suffix: "%" },
  { label: "Gratis Selamanya", value: 0, suffix: "Rp", prefix: true },
];

const steps = [
  {
    num: "01",
    title: "Input Inventory",
    desc: "Masukkan jumlah ore, ingot, dan material yang kamu punya ke dalam inventory calculator.",
    icon: Package,
  },
  {
    num: "02",
    title: "Jalankan Optimizer",
    desc: "Klik 'Hitung Optimasi' dan biarkan algoritma bekerja mencari kombinasi crafting terbaik.",
    icon: Zap,
  },
  {
    num: "03",
    title: "Ikuti Langkah",
    desc: "Ikuti production steps yang dihasilkan, tandai setiap step yang sudah selesai.",
    icon: TrendingUp,
  },
  {
    num: "04",
    title: "Maksimalkan Profit",
    desc: "Jual item yang sudah di-craft dan raih profit maksimal dari setiap sesi mining!",
    icon: Gem,
  },
];

export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)", position: "relative" }}>
      <BackgroundGrid />
      <Navbar />

      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          zIndex: 10,
          paddingTop: 80,
          paddingBottom: 100,
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        {/* Glow blob behind hero */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 400,
            background:
              "radial-gradient(ellipse, rgba(57,211,83,0.07) 0%, rgba(88,166,255,0.05) 40%, transparent 70%)",
            pointerEvents: "none",
            filter: "blur(40px)",
          }}
        />

        <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 24px", position: "relative" }}>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 16px",
              border: "1px solid rgba(57,211,83,0.3)",
              borderRadius: 999,
              background: "rgba(57,211,83,0.06)",
              marginBottom: 28,
              animation: "fade-up 0.4s ease both",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--accent-green)",
                display: "inline-block",
                animation: "pulse-dot 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontSize: 11,
                fontFamily: "'JetBrains Mono', monospace",
                color: "var(--accent-green)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              IME RP · Mining & Crafting Tool
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(36px, 6vw, 68px)",
              lineHeight: 1.08,
              color: "var(--text-primary)",
              margin: "0 0 20px",
              animation: "fade-up 0.5s 0.1s ease both",
              opacity: 0,
            }}
          >
            Maximize Your{" "}
            <span
              style={{
                backgroundImage:
                  "linear-gradient(90deg, var(--accent-green) 0%, var(--accent-blue) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Mining Profit
            </span>
          </h1>

          {/* Sub */}
          <p
            style={{
              fontSize: "clamp(14px, 2vw, 17px)",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              maxWidth: 580,
              margin: "0 auto 36px",
              animation: "fade-up 0.5s 0.2s ease both",
              opacity: 0,
            }}
          >
            Kalkulasi strategi crafting paling optimal untuk server IMERP. Input inventory kamu,
            dan sistem akan otomatis menemukan kombinasi terbaik untuk profit maksimal.
          </p>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              flexWrap: "wrap",
              animation: "fade-up 0.5s 0.3s ease both",
              opacity: 0,
            }}
          >
            <Link
              href="/calculator"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "13px 28px",
                background: "var(--accent-green)",
                color: "#000",
                border: "none",
                borderRadius: 10,
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: 15,
                cursor: "pointer",
                textDecoration: "none",
                transition: "all 0.15s ease",
                boxShadow: "0 0 0 rgba(57,211,83,0)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "#4ae868";
                el.style.boxShadow = "0 0 28px rgba(57,211,83,0.4)";
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "var(--accent-green)";
                el.style.boxShadow = "0 0 0 rgba(57,211,83,0)";
                el.style.transform = "translateY(0)";
              }}
            >
              <Calculator size={16} />
              Mulai Kalkulasi
              <ChevronRight size={14} />
            </Link>

            <Link
              href="/info"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "13px 28px",
                background: "transparent",
                color: "var(--text-secondary)",
                border: "1px solid var(--border-default)",
                borderRadius: 10,
                fontFamily: "'Syne', sans-serif",
                fontWeight: 600,
                fontSize: 15,
                cursor: "pointer",
                textDecoration: "none",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = "var(--text-primary)";
                el.style.borderColor = "var(--border-strong)";
                el.style.background = "rgba(255,255,255,0.03)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = "var(--text-secondary)";
                el.style.borderColor = "var(--border-default)";
                el.style.background = "transparent";
              }}
            >
              <Gem size={16} />
              Lihat Item Info
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section
        style={{
          position: "relative",
          zIndex: 10,
          padding: "0 24px 80px",
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
          }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                padding: "24px 20px",
                background: "var(--bg-surface)",
                border: "1px solid var(--border-subtle)",
                borderRadius: 14,
                textAlign: "center",
                transition: "border-color 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-strong)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-subtle)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: 32,
                  color: "var(--accent-green)",
                  lineHeight: 1,
                  marginBottom: 6,
                }}
              >
                {s.prefix ? s.suffix : ""}
                <Counter to={s.value} suffix={s.prefix ? "" : s.suffix} />
              </div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.06em", fontFamily: "'JetBrains Mono', monospace" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section
        style={{
          position: "relative",
          zIndex: 10,
          padding: "0 24px 100px",
        }}
      >
        <div style={{ maxWidth: "100rem", margin: "0 auto" }}>
          {/* Section header */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span
              style={{
                fontSize: 10,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--accent-blue)",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              ◆ Fitur Unggulan
            </span>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(24px, 4vw, 38px)",
                color: "var(--text-primary)",
                margin: "10px 0 12px",
              }}
            >
              Semua yang Kamu Butuhkan
            </h2>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", maxWidth: 480, margin: "0 auto" }}>
              Toolkit lengkap untuk optimasi mining & crafting di server IMERP
            </p>
          </div>

          {/* Feature grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 18,
            }}
          >
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  style={{
                    padding: "28px 24px",
                    background: "var(--bg-surface)",
                    border: `1px solid ${f.border}`,
                    borderRadius: 16,
                    transition: "all 0.2s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(0,0,0,0.35)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: f.bg,
                      border: `1px solid ${f.border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 18,
                    }}
                  >
                    <Icon size={22} style={{ color: f.color }} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <h3
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 700,
                        fontSize: 16,
                        color: "var(--text-primary)",
                        margin: 0,
                      }}
                    >
                      {f.title}
                    </h3>
                    <span className={`tag ${f.badgeClass}`} style={{ fontSize: 9 }}>
                      {f.badge}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.65, margin: 0 }}>
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section
        style={{
          position: "relative",
          zIndex: 10,
          padding: "0 24px 100px",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span
              style={{
                fontSize: 10,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--accent-green)",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              ◆ Cara Penggunaan
            </span>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(24px, 4vw, 38px)",
                color: "var(--text-primary)",
                margin: "10px 0 12px",
              }}
            >
              Cara Kerja RPCalc
            </h2>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", maxWidth: 400, margin: "0 auto" }}>
              4 langkah sederhana untuk memaksimalkan hasil crafting kamu
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 16,
            }}
          >
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  style={{
                    display: "flex",
                    gap: 20,
                    padding: "24px",
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: 14,
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(57,211,83,0.3)";
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(57,211,83,0.03)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-subtle)";
                    (e.currentTarget as HTMLDivElement).style.background = "var(--bg-surface)";
                  }}
                >
                  {/* Step number */}
                  <div style={{ flexShrink: 0 }}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: "var(--bg-elevated)",
                        border: "1px solid var(--border-subtle)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                      }}
                    >
                      <Icon size={20} style={{ color: "var(--accent-green)" }} />
                      <span
                        style={{
                          position: "absolute",
                          top: -6,
                          right: -6,
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          background: "var(--bg-base)",
                          border: "1px solid rgba(57,211,83,0.5)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 9,
                          fontFamily: "'JetBrains Mono', monospace",
                          fontWeight: 700,
                          color: "var(--accent-green)",
                        }}
                      >
                        {i + 1}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 10,
                        color: "var(--text-muted)",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        marginBottom: 4,
                      }}
                    >
                      Step {step.num}
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 700,
                        fontSize: 15,
                        color: "var(--text-primary)",
                        margin: "0 0 6px",
                      }}
                    >
                      {step.title}
                    </h3>
                    <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section
        style={{
          position: "relative",
          zIndex: 10,
          padding: "0 24px 100px",
        }}
      >
        <div
          style={{
            maxWidth: 860,
            margin: "0 auto",
            padding: "56px 48px",
            background: "linear-gradient(135deg, rgba(57,211,83,0.08) 0%, rgba(88,166,255,0.06) 100%)",
            border: "1px solid rgba(57,211,83,0.2)",
            borderRadius: 20,
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative corner glows */}
          <div
            style={{
              position: "absolute",
              top: -40,
              left: -40,
              width: 180,
              height: 180,
              borderRadius: "50%",
              background: "rgba(57,211,83,0.06)",
              filter: "blur(40px)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -40,
              right: -40,
              width: 180,
              height: 180,
              borderRadius: "50%",
              background: "rgba(88,166,255,0.06)",
              filter: "blur(40px)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative" }}>
            <div style={{ fontSize: 36, marginBottom: 16 }}>⛏️</div>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(22px, 4vw, 36px)",
                color: "var(--text-primary)",
                margin: "0 0 14px",
              }}
            >
              Siap Optimalkan Crafting Kamu?
            </h2>
            <p
              style={{
                fontSize: 14,
                color: "var(--text-secondary)",
                maxWidth: 440,
                margin: "0 auto 32px",
                lineHeight: 1.7,
              }}
            >
              Mulai sekarang — gratis, tanpa daftar, langsung pakai. Cukup input inventory dan lihat magic-nya.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
              <Link
                href="/calculator"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "13px 32px",
                  background: "var(--accent-green)",
                  color: "#000",
                  border: "none",
                  borderRadius: 10,
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: "pointer",
                  textDecoration: "none",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "#4ae868";
                  el.style.boxShadow = "0 0 28px rgba(57,211,83,0.4)";
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "var(--accent-green)";
                  el.style.boxShadow = "none";
                  el.style.transform = "translateY(0)";
                }}
              >
                <Pickaxe size={16} />
                Buka Calculator
                <ArrowRight size={14} />
              </Link>
            </div>

            <div
              style={{
                marginTop: 28,
                display: "flex",
                justifyContent: "center",
                gap: 24,
                flexWrap: "wrap",
              }}
            >
              {["✓ Gratis", "✓ Tanpa Login", "✓ Open Source", "✓ Always Updated"].map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: 12,
                    color: "var(--text-muted)",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
