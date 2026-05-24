"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBrandAnalysis } from "@/lib/brand-context";

const navItems = [
  {
    href: "/",
    label: "베타 데모 (3단계)",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    match: (p: string) => p === "/" || p === "/influencers",
  },
  {
    href: "/selected",
    label: "선택한 인플루언서 관리",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    match: (p: string) => p === "/selected",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const { selectedIds } = useBrandAnalysis();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-surface-border bg-surface">
      <div className="flex h-16 items-center gap-3 border-b border-surface-border px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="pulse-ring flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-neon-green to-electric-blue text-sm font-bold text-zinc-900">
            AI
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-100">InfluenceHub</p>
            <p className="text-xs text-zinc-500">Micro Matcher</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive = item.match(pathname);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-neon-green/10 text-neon-green ring-1 ring-neon-green/30"
                  : "text-zinc-500 hover:bg-zinc-800/50 hover:text-zinc-200"
              }`}
            >
              {item.icon}
              <span className="flex-1">{item.label}</span>
              {item.href === "/selected" && selectedIds.size > 0 ? (
                <span className="rounded-full bg-electric-blue/20 px-2 py-0.5 text-xs font-bold text-electric-blue">
                  {selectedIds.size}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-surface-border p-4">
        <div className="rounded-lg border border-neon-green/20 bg-neon-green/5 px-3 py-3">
          <p className="text-xs font-medium text-neon-green">AI 매칭 엔진</p>
          <p className="mt-0.5 text-xs text-zinc-500">조건부 무료 베타 · Mock AI</p>
        </div>
      </div>
    </aside>
  );
}
