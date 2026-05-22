"use client";

import Link from "next/link";
import {
  formatFollowers,
  getMatchScoreColor,
  getRecommendedInfluencers,
} from "@/lib/mock-data";
import { useBrandAnalysis } from "@/lib/brand-context";

function MatchScoreBadge({ score }: { score: number }) {
  return (
    <span className={`text-lg font-bold ${getMatchScoreColor(score)}`}>
      {score}%
    </span>
  );
}

export default function InfluencersPage() {
  const { analysis, status, selectedIds, toggleSelect } = useBrandAnalysis();
  const recommendations = getRecommendedInfluencers(analysis?.persona ?? null);

  if (status !== "complete" || !analysis) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-8 text-center">
        <div className="mb-4 rounded-full border border-electric-blue/30 bg-electric-blue/10 p-4">
          <svg className="h-8 w-8 text-electric-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-zinc-100">
          먼저 브랜드 계정 분석을 완료해 주세요
        </h2>
        <p className="mt-2 max-w-md text-sm text-zinc-500">
          AI가 브랜드 페르소나를 파악한 뒤, 5,000~30,000 팔로워 마이크로
          인플루언서를 매칭 점수 순으로 추천합니다.
        </p>
        <Link
          href="/"
          className="mt-6 rounded-xl bg-gradient-to-r from-neon-green to-electric-blue px-6 py-3 text-sm font-bold text-zinc-900"
        >
          계정 분석 시작하기
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8">
      <header className="mb-8">
        <div className="mb-2 text-sm font-medium text-electric-blue">
          @{analysis.instagramId} · AI 매칭 완료
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-50">
          마이크로 인플루언서 매칭 추천
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          {analysis.persona.target} · {analysis.persona.mood} — 팔로워 5K~30K ·
          총 {recommendations.length}명 추천
        </p>
      </header>

      <div className="custom-scrollbar overflow-hidden overflow-x-auto rounded-2xl border border-surface-border bg-surface">
        <table className="w-full min-w-[960px] text-left text-sm">
          <thead>
            <tr className="border-b border-surface-border bg-zinc-900/80 text-zinc-400">
              <th className="px-5 py-3.5 font-medium">인플루언서</th>
              <th className="px-5 py-3.5 font-medium">팔로워</th>
              <th className="px-5 py-3.5 font-medium">카테고리</th>
              <th className="px-5 py-3.5 font-medium">AI 매칭</th>
              <th className="px-5 py-3.5 font-medium">ER</th>
              <th className="px-5 py-3.5 text-center font-medium">
                캠페인 제안
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border">
            {recommendations.map((inf) => {
              const selected = selectedIds.has(inf.id);
              return (
                <tr
                  key={inf.id}
                  className={`transition-colors hover:bg-zinc-800/40 ${selected ? "bg-neon-green/5" : ""}`}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr ${inf.avatarGradient} text-sm font-bold text-white shadow-lg`}
                      >
                        {inf.displayName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-zinc-100">
                          {inf.displayName}
                        </p>
                        <p className="text-xs text-zinc-500">{inf.handle}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-medium text-zinc-300">
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
                          ? "font-medium text-neon-green"
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
                      className={`inline-flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
                        selected
                          ? "border-neon-green/50 bg-neon-green/10 text-neon-green"
                          : "border-zinc-700 bg-zinc-900/60 hover:border-neon-green/50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleSelect(inf.id)}
                        className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-neon-green focus:ring-neon-green/30"
                      />
                      캠페인 제안하기
                    </label>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selectedIds.size > 0 && (
        <div className="mt-6 flex items-center justify-between rounded-xl border border-neon-green/30 bg-neon-green/5 px-5 py-4">
          <p className="text-sm text-zinc-300">
            <span className="font-bold text-neon-green">{selectedIds.size}명</span>
            이 브랜디드 콘텐츠 제안 대기 중입니다
          </p>
          <Link
            href="/selected"
            className="rounded-lg bg-neon-green px-4 py-2 text-sm font-bold text-zinc-900"
          >
            선택 목록 관리 →
          </Link>
        </div>
      )}
    </div>
  );
}
