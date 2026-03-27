import CraftingOptimizer from "@/app/components/craftingOptimizer";
import BackgroundGrid from "@/app/components/backgroundGrid";
import Navigation from "@/app/components/navigation";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)", position: "relative" }}>
      <BackgroundGrid />

      <header className="relative z-10" style={{ paddingTop: 36, paddingBottom: 12 }}>
        <div style={{ maxWidth: "100rem", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <div style={{ marginBottom: 6, display: "inline-flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
                color: "var(--accent-green)", fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              ◆ IME RP ◆
            </span>
          </div>
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(32px, 5vw, 52px)",
              lineHeight: 1.1,
              color: "var(--text-primary)",
              margin: "0 0 8px",
            }}
          >
            Mining &amp; Crafting{" "}
            <span
              style={{
                backgroundImage: "linear-gradient(90deg, var(--accent-green), var(--accent-blue))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Optimizer
            </span>
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 0 }}>
            Kalkulasi strategi crafting paling optimal untuk server IMERP
          </p>
        </div>
      </header>

      <Navigation />

      <main className="relative z-10" style={{ paddingBottom: 64 }}>
        <div style={{ maxWidth: "100rem", margin: "0 auto", padding: "20px 24px 0" }}>
          <CraftingOptimizer />
        </div>
      </main>

      <footer
        className="relative z-10"
        style={{
          borderTop: "1px solid var(--border-subtle)",
          padding: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
          maxWidth: "100rem",
          margin: "0 auto",
        }}
      >
        <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
          © 2025 IMERPCrafting · Made for IME RP Community
        </span>
        <a
          href="https://github.com/aw4e/mlrpcrafting"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: 11, color: "var(--text-muted)", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}
        >
          <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
          </svg>
          by aw4e
        </a>
      </footer>
    </div>
  );
}
