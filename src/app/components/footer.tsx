"use client";

import Link from "next/link";
import { Pickaxe, Github, ExternalLink } from "lucide-react";

const links = [
  { label: "Home",         href: "/" },
  { label: "Calculator",   href: "/calculator" },
  { label: "Item Info",    href: "/info" },
  { label: "Custom Price", href: "/custom" },
];

export default function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        zIndex: 10,
        borderTop: "1px solid var(--border-subtle)",
        background: "rgba(8,12,16,0.95)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        style={{
          maxWidth: "100rem",
          margin: "0 auto",
          padding: "40px 24px 28px",
        }}
      >
        {/* Top section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 40,
            marginBottom: 32,
            flexWrap: "wrap",
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: "linear-gradient(135deg, rgba(57,211,83,0.2), rgba(88,166,255,0.15))",
                  border: "1px solid rgba(57,211,83,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Pickaxe size={15} style={{ color: "var(--accent-green)" }} />
              </div>
              <span
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: 15,
                  color: "var(--text-primary)",
                }}
              >
                RPCalc
              </span>
            </div>
            <p
              style={{
                fontSize: 12,
                color: "var(--text-muted)",
                lineHeight: 1.7,
                maxWidth: 220,
              }}
            >
              Tool optimasi crafting &amp; mining untuk komunitas IME RP. Hitung strategi terbaik, efisiensi maksimal.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div
              style={{
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "var(--text-muted)",
                marginBottom: 14,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              Navigasi
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{
                    fontSize: 13,
                    color: "var(--text-secondary)",
                    textDecoration: "none",
                    fontFamily: "'JetBrains Mono', monospace",
                    transition: "color 0.15s",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = "var(--accent-green)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)")
                  }
                >
                  <span
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      background: "var(--accent-green-dim)",
                      flexShrink: 0,
                    }}
                  />
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* About / Credits */}
          <div>
            <div
              style={{
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "var(--text-muted)",
                marginBottom: 14,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              Credits
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a
                href="https://github.com/aw4e"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 13,
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  fontFamily: "'JetBrains Mono', monospace",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = "var(--accent-green)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)")
                }
              >
                <Github size={13} />
                Created by aw4e
              </a>
              <a
                href="https://github.com/aw4e/mlrpcrafting"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 13,
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  fontFamily: "'JetBrains Mono', monospace",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = "var(--accent-blue)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)")
                }
              >
                <ExternalLink size={13} />
                Open Source · GitHub
              </a>
              <div
                style={{
                  marginTop: 4,
                  padding: "8px 12px",
                  background: "rgba(57,211,83,0.06)",
                  border: "1px solid rgba(57,211,83,0.15)",
                  borderRadius: 8,
                  fontSize: 11,
                  color: "var(--text-muted)",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                Made for{" "}
                <span style={{ color: "var(--accent-green)", fontWeight: 600 }}>IME RP</span>{" "}
                Community
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            borderTop: "1px solid var(--border-subtle)",
            paddingTop: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>
            © 2025 IMERPCrafting · All rights reserved
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
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
            <span style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>
              Online · v0.1.0
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
