"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Home, Calculator, Info, SlidersHorizontal, Menu, X, Pickaxe } from "lucide-react";

const navItems = [
  { href: "/",           label: "Home",         icon: Home },
  { href: "/calculator", label: "Calculator",   icon: Calculator },
  { href: "/info",       label: "Item Info",    icon: Info },
  { href: "/custom",     label: "Custom Price", icon: SlidersHorizontal },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: "all 0.3s ease",
          background: scrolled
            ? "rgba(8,12,16,0.92)"
            : "rgba(8,12,16,0.6)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: scrolled
            ? "1px solid rgba(48,54,61,0.9)"
            : "1px solid rgba(48,54,61,0.4)",
          boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.4)" : "none",
        }}
      >
        <div
          style={{
            maxWidth: "100rem",
            margin: "0 auto",
            padding: "0 24px",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "linear-gradient(135deg, rgba(57,211,83,0.25), rgba(88,166,255,0.18))",
                border: "1px solid rgba(57,211,83,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Pickaxe size={18} style={{ color: "var(--accent-green)" }} />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: 16,
                  color: "var(--text-primary)",
                  lineHeight: 1,
                }}
              >
                RPCalc
              </div>
              <div
                style={{
                  fontSize: 9,
                  color: "var(--text-muted)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  lineHeight: 1,
                  marginTop: 2,
                }}
              >
                IME RP · Mining
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden-mobile"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              background: "rgba(13,17,23,0.8)",
              border: "1px solid var(--border-subtle)",
              borderRadius: 999,
              padding: "4px",
            }}
          >
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "7px 14px",
                    borderRadius: 999,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    fontWeight: active ? 600 : 400,
                    color: active ? "var(--accent-green)" : "var(--text-secondary)",
                    textDecoration: "none",
                    background: active ? "rgba(57,211,83,0.1)" : "transparent",
                    border: active ? "1px solid rgba(57,211,83,0.25)" : "1px solid transparent",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-primary)";
                      (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.04)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)";
                      (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                    }
                  }}
                >
                  <Icon size={13} strokeWidth={active ? 2.5 : 1.8} />
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a
              href="https://github.com/aw4e/mlrpcrafting"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden-mobile"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "7px 14px",
                border: "1px solid var(--border-subtle)",
                borderRadius: 8,
                color: "var(--text-secondary)",
                textDecoration: "none",
                fontSize: 12,
                fontFamily: "'JetBrains Mono', monospace",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-primary)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border-strong)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border-subtle)";
              }}
            >
              <svg width="13" height="13" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
              GitHub
            </a>

            {/* Mobile hamburger */}
            <button
              className="show-mobile"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                width: 36,
                height: 36,
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-subtle)",
                borderRadius: 8,
                color: "var(--text-secondary)",
                cursor: "pointer",
              }}
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            style={{
              borderTop: "1px solid var(--border-subtle)",
              padding: "12px 24px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 14px",
                    borderRadius: 8,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 13,
                    color: active ? "var(--accent-green)" : "var(--text-secondary)",
                    textDecoration: "none",
                    background: active ? "rgba(57,211,83,0.08)" : "transparent",
                    border: `1px solid ${active ? "rgba(57,211,83,0.2)" : "transparent"}`,
                    transition: "all 0.15s",
                  }}
                >
                  <Icon size={15} strokeWidth={active ? 2.5 : 1.8} />
                  {label}
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Spacer */}
      <div style={{ height: 64 }} />
    </>
  );
}
