"use client";

import type { BrandAnalysisResult } from "@/lib/mock-data";

const accentMap = {
  green: "border-neon-green/30 bg-neon-green/10 text-neon-green",
  blue: "border-electric-blue/30 bg-electric-blue/10 text-electric-blue",
  violet: "border-violet-400/30 bg-violet-400/10 text-violet-300",
};

export default function AnalysisReport({ analysis }: { analysis: BrandAnalysisResult }) {
  const { input, persona, insights } = analysis;
  const channels = [
    input.instagramId && { label: "Instagram", id: input.instagramId },
    input.youtubeId && { label: "YouTube", id: input.youtubeId },
    input.tiktokId && { label: "TikTok", id: input.tiktokId },
  ].filter(Boolean) as { label: string; id: string }[];

  return (
    <section className="beta-fade-in space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-electric-blue">
            Step 2 · AI 분석 리포트
          </p>
          <h2 className="mt-1 text-2xl font-bold text-zinc-50">
            {input.brandName} 타깃 분석 결과
          </h2>
        </div>
        <span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-1.5 text-xs font-bold text-amber-300">
          조건부 무료 베타
        </span>
      </div>

      <div className="rounded-2xl border border-neon-green/25 bg-gradient-to-br from-neon-green/5 via-surface to-electric-blue/5 p-6 ring-1 ring-neon-green/15">
        <p className="mb-4 text-xs font-medium text-zinc-500">브랜드 페르소나 요약</p>
        <p className="leading-relaxed text-zinc-300">{persona.summary}</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-surface-border bg-zinc-900/60 p-4">
            <p className="text-xs font-medium text-zinc-500">타깃 고객</p>
            <p className="mt-2 font-semibold text-neon-green">{persona.target}</p>
          </div>
          <div className="rounded-xl border border-surface-border bg-zinc-900/60 p-4">
            <p className="text-xs font-medium text-zinc-500">브랜드 무드</p>
            <p className="mt-2 font-semibold text-electric-blue">{persona.mood}</p>
          </div>
          <div className="rounded-xl border border-surface-border bg-zinc-900/60 p-4">
            <p className="text-xs font-medium text-zinc-500">핵심 키워드</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {persona.keywords.map((kw) => (
                <span
                  key={kw}
                  className="rounded-md bg-zinc-800 px-2 py-0.5 text-xs text-zinc-300"
                >
                  #{kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {input.storeInfo ? (
          <div className="mt-4 rounded-xl border border-surface-border bg-zinc-900/40 px-4 py-3 text-sm text-zinc-400">
            <span className="font-medium text-zinc-300">매장 정보 · </span>
            {input.storeInfo}
          </div>
        ) : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {insights.map((card) => (
          <div
            key={card.title}
            className="rounded-xl border border-surface-border bg-surface p-4 transition-colors hover:border-zinc-600"
          >
            <p className="text-xs text-zinc-500">{card.title}</p>
            <p
              className={`mt-2 text-2xl font-bold ${
                card.accent === "green"
                  ? "text-neon-green"
                  : card.accent === "blue"
                    ? "text-electric-blue"
                    : "text-violet-300"
              }`}
            >
              {card.value}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-zinc-500">{card.description}</p>
          </div>
        ))}
      </div>

      {channels.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {channels.map((ch) => (
            <span
              key={ch.label}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${accentMap.blue}`}
            >
              {ch.label}
              <span className="text-zinc-300">@{ch.id}</span>
            </span>
          ))}
          {input.homepageUrl ? (
            <span className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-900/60 px-3 py-1.5 text-xs text-zinc-400">
              {input.homepageUrl.replace(/^https?:\/\//, "")}
            </span>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
