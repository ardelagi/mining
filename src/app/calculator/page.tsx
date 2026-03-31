import CraftingOptimizer from "@/app/components/craftingOptimizer";
import BackgroundGrid from "@/app/components/backgroundGrid";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

export default function CalculatorPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)", position: "relative" }}>
      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10" style={{ paddingBottom: 64 }}>
        <div style={{ maxWidth: "100rem", margin: "0 auto", padding: "32px 24px 0" }}>
          {/* Page header */}
          <div style={{ marginBottom: 32, textAlign: "center" }}>
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--accent-green)",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              ◆ IME RP ◆
            </span>
            <h1
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(28px, 4vw, 44px)",
                lineHeight: 1.1,
                color: "var(--text-primary)",
                margin: "8px 0 10px",
              }}
            >
              Mining &amp; Crafting{" "}
              <span
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, var(--accent-green), var(--accent-blue))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Optimizer
              </span>
            </h1>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: 0 }}>
              Kalkulasi strategi crafting paling optimal untuk server IMERP
            </p>
          </div>

          <CraftingOptimizer />
        </div>
      </main>

      <Footer />
    </div>
  );
}
