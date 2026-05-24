"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  formatFollowers,
  getMatchScoreColor,
  getRecommendationsByPlatform,
  PLATFORM_LABELS,
  type Platform,
} from "@/lib/mock-data";
import { useBrandAnalysis } from "@/lib/brand-context";

const TABS: { id: Platform; label: string; icon: string }[] = [
  { id: "instagram", label: "Instagram", icon: "📸" },
  { id: "youtube", label: "YouTube", icon: "▶️" },
  { id: "tiktok", label: "TikTok", icon: "🎵" },
];

function MatchScoreBadge({ score }: { score: number }) {
  return (
    <span className={`text-lg font-bold tabular-nums ${getMatchScoreColor(score)}`}>
      {score}%
    </span>
  );
}

export default function RecommendationTable() {
  const { analysis, selectedIds, toggleSelect } = useBrandAnalysis();
  const [activeTab, setActiveTab] = useState<Platform>("instagram");

  const recommendations = useMemo(
    () => getRecommendationsByPlatform(activeTab, analysis?.persona ?? null),
    [activeTab, analysis?.persona]
  );

  const audienceLabel =
    activeTab === "youtube" ? "구독자" : "팔로워";

  const tabSelectedCount = recommendations.filter((r) =>
    selectedIds.has(r.id)
  ).length;

  if (!analysis) return null;

  return (
    <section id="recommendations" className="scroll-mt-8 space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-neon-green">
            Step 3 · 추천 대시보드
          </p>
          <h2 className="mt-1 text-2xl font-bold text-zinc-50">
            AI 마이크로 인플루언서 추천
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            {analysis.persona.target} · 플랫폼별 상위 20명 · 5K~30K {audienceLabel}
          </p>
        </div>
        {selectedIds.size > 0 ? (
          <Link
            href="/selected"
            className="rounded-xl border border-neon-green/40 bg-neon-green/10 px-5 py-2.5 text-sm font-bold text-neon-green transition-colors hover:bg-neon-green/20"
          >
            선택 {selectedIds.size}명 관리 →
          </Link>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2 rounded-xl border border-surface-border bg-zinc-900/50 p-1.5">
        {TABS.map((tab) => {
          const count = getRecommendationsByPlatform(tab.id, analysis.persona).length;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-1 min-w-[120px] items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
                active
                  ? "bg-gradient-to-r from-neon-green/20 to-electric-blue/20 text-zinc-50 ring-1 ring-neon-green/40"
                  : "text-zinc-500 hover:bg-zinc-800/60 hover:text-zinc-300"
              }`}
            >
              <span>{tab.icon}</span>
              {PLATFORM_LABELS[tab.id]}
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  active ? "bg-neon-green/20 text-neon-green" : "bg-zinc-800 text-zinc-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {tabSelectedCount > 0 ? (
        <p className="text-sm text-zinc-400">
          <span className="font-bold text-neon-green">{tabSelectedCount}명</span>{" "}
          {PLATFORM_LABELS[activeTab]} 제안 대기 중
        </p>
      ) : null}

      <div className="custom-scrollbar overflow-hidden overflow-x-auto rounded-2xl border border-surface-border bg-surface shadow-[0_0_60px_-20px_rgba(0,212,255,0.15)]">
        <table className="w-full min-w-[880px] text-left text-sm">
          <thead>
            <tr className="border-b border-surface-border bg-zinc-900/90 text-zinc-400">
              <th className="px-5 py-3.5 font-medium">프로필</th>
              <th className="px-5 py-3.5 font-medium">{audienceLabel}</th>
              <th className="px-5 py-3.5 font-medium">카테고리</th>
              <th className="px-5 py-3.5 font-medium">AI 매칭도</th>
              <th className="px-5 py-3.5 font-medium">참여율</th>
              <th className="px-5 py-3.5 text-center font-medium">제안하기</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border">
            {recommendations.map((inf, rowIndex) => {
              const selected = selectedIds.has(inf.id);
              return (
                <tr
                  key={inf.id}
                  className={`transition-colors hover:bg-zinc-800/50 ${
                    selected ? "bg-neon-green/[0.06]" : rowIndex % 2 === 0 ? "bg-zinc-900/20" : ""
                  }`}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr ${inf.avatarGradient} text-sm font-bold text-white shadow-lg ring-2 ring-zinc-800`}
                      >
                        {inf.displayName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-zinc-100">{inf.displayName}</p>
                        <p className="text-xs text-zinc-500">{inf.handle}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-medium tabular-nums text-zinc-300">
                    {formatFollowers(inf.followers)}
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex rounded-md border border-zinc-700 bg-zinc-800/80 px-2.5 py-1 text-xs font-medium text-zinc-300">
                      {inf.category}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <MatchScoreBadge score={inf.matchScore} />
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={
                        inf.engagementRate >= 6
                          ? "font-semibold text-neon-green"
                          : inf.engagementRate >= 5
                            ? "font-medium text-electric-blue"
                            : "text-zinc-400"
                      }
                    >
                      {inf.engagementRate.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <label
                      className={`inline-flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition-all ${
                        selected
                          ? "border-neon-green/50 bg-neon-green/10 text-neon-green shadow-[0_0_20px_-8px_rgba(57,255,136,0.5)]"
                          : "border-zinc-700 bg-zinc-900/60 text-zinc-400 hover:border-neon-green/40 hover:text-zinc-200"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleSelect(inf.id)}
                        className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-neon-green focus:ring-neon-green/30"
                      />
                      제안하기
                    </label>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
