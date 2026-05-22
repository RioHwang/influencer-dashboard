"use client";

import Link from "next/link";
import { useState } from "react";
import { useBrandAnalysis } from "@/lib/brand-context";

export default function BrandAnalysisHome() {
  const { status, analysis, runAnalysis } = useBrandAnalysis();
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runAnalysis(input);
  };

  return (
    <div className="p-8">
      <header className="mb-10">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-neon-green/30 bg-neon-green/10 px-4 py-1.5 text-xs font-bold text-neon-green">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon-green" />
          AI Micro-Influencer Matcher
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50">
          브랜드 계정 분석 및 추천
        </h1>
        <p className="mt-2 max-w-xl text-sm text-zinc-400">
          인스타그램 브랜드 계정을 입력하면 AI가 피드·타깃·무드를 분석하고, 맞는
          마이크로 인플루언서를 자동 추천합니다.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="relative overflow-hidden rounded-2xl border border-surface-border bg-surface p-6 shadow-[0_0_40px_-12px_rgba(57,255,136,0.15)]"
      >
        <label
          htmlFor="brand-ig"
          className="mb-2 block text-sm font-medium text-zinc-300"
        >
          브랜드 인스타그램 계정 아이디
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
              @
            </span>
            <input
              id="brand-ig"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="your_brand_official"
              disabled={status === "loading"}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900/80 py-4 pr-4 pl-9 text-zinc-100 placeholder:text-zinc-600 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue focus:outline-none disabled:opacity-60"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading" || !input.trim()}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-neon-green to-electric-blue px-8 py-4 font-bold text-zinc-900 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "loading" ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-900/30 border-t-zinc-900" />
                분석 중...
              </>
            ) : (
              <>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
                AI 분석 요청
              </>
            )}
          </button>
        </div>
      </form>

      {status === "loading" && (
        <div className="scan-line relative mt-8 overflow-hidden rounded-2xl border border-electric-blue/30 bg-surface p-8">
          <div className="ai-shimmer absolute inset-0" />
          <div className="relative flex flex-col items-center gap-4 text-center">
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-2 w-2 animate-bounce rounded-full bg-neon-green"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
            <p className="text-lg font-semibold text-zinc-100">
              AI가 브랜드 계정의 피드, 타깃 고객, 무드를 분석 중입니다...
            </p>
            <p className="text-sm text-zinc-500">
              @
              {input.replace(/^@/, "")} · 콘텐츠 톤앤매너 · 오디언스 시그널 스캔
            </p>
            <div className="mt-2 h-1.5 w-full max-w-md overflow-hidden rounded-full bg-zinc-800">
              <div className="h-full w-2/3 animate-pulse rounded-full bg-gradient-to-r from-neon-green to-electric-blue" />
            </div>
          </div>
        </div>
      )}

      {status === "complete" && analysis && (
        <div className="mt-8 space-y-6">
          <div className="rounded-2xl border border-neon-green/25 bg-gradient-to-br from-neon-green/5 to-electric-blue/5 p-6 ring-1 ring-neon-green/20">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-zinc-50">
                브랜드 페르소나 요약
              </h2>
              <span className="rounded-full border border-electric-blue/30 bg-electric-blue/10 px-3 py-1 text-xs font-semibold text-electric-blue">
                @{analysis.instagramId}
              </span>
            </div>
            <p className="mb-6 leading-relaxed text-zinc-300">
              {analysis.persona.summary}
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-surface-border bg-zinc-900/50 p-4">
                <p className="text-xs font-medium text-zinc-500">타깃 고객</p>
                <p className="mt-1 font-semibold text-neon-green">
                  {analysis.persona.target}
                </p>
              </div>
              <div className="rounded-xl border border-surface-border bg-zinc-900/50 p-4">
                <p className="text-xs font-medium text-zinc-500">브랜드 무드</p>
                <p className="mt-1 font-semibold text-electric-blue">
                  {analysis.persona.mood}
                </p>
              </div>
              <div className="rounded-xl border border-surface-border bg-zinc-900/50 p-4">
                <p className="text-xs font-medium text-zinc-500">핵심 키워드</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {analysis.persona.keywords.map((kw) => (
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
          </div>

          <Link
            href="/influencers"
            className="inline-flex items-center gap-2 rounded-xl border border-neon-green/40 bg-neon-green/10 px-6 py-3 text-sm font-bold text-neon-green transition-colors hover:bg-neon-green/20"
          >
            AI 추천 마이크로 인플루언서 20명 보기
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}
