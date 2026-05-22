"use client";

import Link from "next/link";
import {
  formatFollowers,
  getRecommendedInfluencers,
  getMatchScoreColor,
} from "@/lib/mock-data";
import { useBrandAnalysis } from "@/lib/brand-context";

export default function SelectedInfluencersPage() {
  const { selectedIds, toggleSelect, clearSelection, analysis } =
    useBrandAnalysis();
  const pool = getRecommendedInfluencers(analysis?.persona ?? null);
  const selected = pool.filter((i) => selectedIds.has(i.id));

  return (
    <div className="p-8">
      <header className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-50">
            선택한 인플루언서 관리
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            브랜디드 콘텐츠 계약 제안 대기 · 협업 상태를 관리합니다
          </p>
        </div>
        {selected.length > 0 && (
          <button
            type="button"
            onClick={clearSelection}
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
          >
            전체 해제
          </button>
        )}
      </header>

      {selected.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-700 bg-surface px-8 py-16 text-center">
          <p className="text-zinc-400">아직 선택된 인플루언서가 없습니다.</p>
          <Link
            href="/influencers"
            className="mt-4 inline-block text-sm font-semibold text-electric-blue hover:underline"
          >
            AI 추천 리스트에서 캠페인 제안하기 →
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {selected.map((inf) => (
            <article
              key={inf.id}
              className="flex items-center justify-between rounded-2xl border border-surface-border bg-surface px-5 py-4 ring-1 ring-neon-green/10"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr ${inf.avatarGradient} font-bold text-white`}
                >
                  {inf.displayName.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-zinc-100">
                    {inf.displayName}{" "}
                    <span className="text-zinc-500">{inf.handle}</span>
                  </p>
                  <p className="mt-0.5 text-xs text-zinc-500">
                    {inf.category} · {formatFollowers(inf.followers)} · ER{" "}
                    {inf.engagementRate}%
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`text-sm font-bold ${getMatchScoreColor(inf.matchScore)}`}
                >
                  매칭 {inf.matchScore}%
                </span>
                <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
                  제안 대기
                </span>
                <button
                  type="button"
                  onClick={() => toggleSelect(inf.id)}
                  className="rounded-lg border border-zinc-600 px-3 py-1.5 text-xs text-zinc-400 hover:text-zinc-200"
                >
                  제거
                </button>
              </div>
            </article>
          ))}
          <button
            type="button"
            className="mt-4 w-full rounded-xl bg-gradient-to-r from-neon-green to-electric-blue py-4 text-center font-bold text-zinc-900"
          >
            선택 {selected.length}명 일괄 캠페인 제안 발송 (데모)
          </button>
        </div>
      )}
    </div>
  );
}
