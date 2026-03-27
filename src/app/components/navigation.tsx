"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Info, SlidersHorizontal } from "lucide-react";

const navItems = [
  { href: "/",       label: "Optimizer",    icon: Home },
  { href: "/info",   label: "Item Info",    icon: Info },
  { href: "/custom", label: "Custom Price", icon: SlidersHorizontal },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="relative z-10 flex justify-center py-3">
      <div
        className="flex items-center gap-1 p-1"
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "999px",
        }}
      >
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} className={`nav-link${active ? " active" : ""}`}>
              <Icon size={14} strokeWidth={active ? 2.5 : 1.8} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
