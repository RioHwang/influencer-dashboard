"use client";

import { useEffect, useState } from "react";
import { LOADING_STEPS } from "@/lib/mock-data";
import { useBrandAnalysis } from "@/lib/brand-context";

export default function AnalysisLoader() {
  const { brandInput } = useBrandAnalysis();
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(8);

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setStepIndex((i) => (i + 1) % LOADING_STEPS.length);
    }, 900);

    const progressTimer = setInterval(() => {
      setProgress((p) => (p >= 92 ? 92 : p + 4));
    }, 280);

    return () => {
      clearInterval(stepTimer);
      clearInterval(progressTimer);
    };
  }, []);

  return (
    <div className="scan-line relative overflow-hidden rounded-2xl border border-electric-blue/30 bg-surface p-10">
      <div className="ai-shimmer absolute inset-0" />

      <div className="relative flex flex-col items-center text-center">
        <div className="relative mb-8 flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-neon-green border-r-electric-blue" />
          <div
            className="absolute inset-2 animate-spin rounded-full border-2 border-transparent border-b-neon-green/60 border-l-electric-blue/60"
            style={{ animationDirection: "reverse", animationDuration: "1.4s" }}
          />
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-green/20 to-electric-blue/20 ring-1 ring-white/10">
            <svg className="h-7 w-7 text-neon-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
          </div>
        </div>

        <p className="text-xl font-bold text-zinc-50">AI 브랜드 타깃 분석 중</p>
        <p className="mt-2 text-sm text-zinc-400">
          <span className="font-semibold text-electric-blue">{brandInput.brandName}</span>
          {brandInput.instagramId ? (
            <> · @{brandInput.instagramId.replace(/^@/, "")}</>
          ) : null}
        </p>

        <p
          key={stepIndex}
          className="mt-6 min-h-[1.5rem] animate-pulse text-sm font-medium text-neon-green"
        >
          {LOADING_STEPS[stepIndex]}
        </p>

        <div className="mt-8 w-full max-w-lg">
          <div className="mb-2 flex justify-between text-xs text-zinc-500">
            <span>분석 진행률</span>
            <span className="font-mono text-electric-blue">{progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-neon-green via-electric-blue to-neon-green transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-8 flex gap-2">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="h-1.5 w-8 rounded-full bg-zinc-800"
              style={{
                background:
                  i <= stepIndex % 4
                    ? "linear-gradient(90deg, #39ff88, #00d4ff)"
                    : undefined,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
