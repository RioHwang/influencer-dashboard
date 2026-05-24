"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useBrandAnalysis } from "@/lib/brand-context";
import OnboardingForm from "./OnboardingForm";
import AnalysisLoader from "./AnalysisLoader";
import AnalysisReport from "./AnalysisReport";
import RecommendationTable from "./RecommendationTable";

const STEPS = [
  { n: 1, label: "브랜드 입력" },
  { n: 2, label: "AI 분석" },
  { n: 3, label: "인플루언서 추천" },
];

function StepIndicator({ current }: { current: number }) {
  return (
    <ol className="mb-10 flex flex-wrap items-center gap-2 sm:gap-0">
      {STEPS.map((step, i) => {
        const done = current > step.n;
        const active = current === step.n;
        return (
          <li key={step.n} className="flex items-center">
            <div
              className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-neon-green/15 text-neon-green ring-1 ring-neon-green/40"
                  : done
                    ? "text-electric-blue"
                    : "text-zinc-600"
              }`}
            >
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                  active
                    ? "bg-gradient-to-br from-neon-green to-electric-blue text-zinc-900"
                    : done
                      ? "bg-electric-blue/20 text-electric-blue"
                      : "bg-zinc-800 text-zinc-500"
                }`}
              >
                {done ? "✓" : step.n}
              </span>
              <span className="hidden sm:inline">{step.label}</span>
            </div>
            {i < STEPS.length - 1 ? (
              <div
                className={`mx-2 hidden h-px w-8 sm:block md:w-16 ${
                  current > step.n ? "bg-electric-blue/50" : "bg-zinc-800"
                }`}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

export default function BetaOnboardingFlow() {
  const { status, analysis, selectedIds, resetFlow } = useBrandAnalysis();
  const reportRef = useRef<HTMLDivElement>(null);

  const currentStep =
    status === "complete" ? 3 : status === "loading" ? 2 : 1;

  useEffect(() => {
    if (status === "complete" && reportRef.current) {
      reportRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [status]);

  return (
    <div className="p-6 pb-24 md:p-8">
      <header className="mb-6">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-neon-green/30 bg-neon-green/10 px-4 py-1.5 text-xs font-bold text-neon-green">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon-green" />
          조건부 무료 베타 · AI Micro-Influencer Matcher
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50">
          브랜드 분석 &amp; 인플루언서 매칭
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
          브랜드·매장 정보를 입력하고 분석을 시작하면, AI 타깃 리포트와 플랫폼별
          마이크로 인플루언서 20명 추천까지 한 화면에서 데모할 수 있습니다.
        </p>
      </header>

      <StepIndicator current={currentStep} />

      <section aria-labelledby="step1-heading">
        <h2 id="step1-heading" className="mb-4 text-sm font-semibold text-zinc-500">
          Step 1 · 온보딩
        </h2>
        <OnboardingForm />
      </section>

      {status === "loading" ? (
        <div className="mt-8">
          <AnalysisLoader />
        </div>
      ) : null}

      {status === "complete" && analysis ? (
        <>
          <div ref={reportRef} className="mt-10">
            <AnalysisReport analysis={analysis} />
          </div>
          <div className="mt-12">
            <RecommendationTable />
          </div>
        </>
      ) : null}

      {status === "complete" ? (
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-surface-border bg-surface px-5 py-4">
          <p className="text-sm text-zinc-400">
            데모를 처음부터 다시 보시려면{" "}
            <button
              type="button"
              onClick={resetFlow}
              className="font-semibold text-electric-blue hover:underline"
            >
              새 분석 시작
            </button>
            을 누르세요.
          </p>
          {selectedIds.size > 0 ? (
            <Link
              href="/selected"
              className="rounded-lg bg-gradient-to-r from-neon-green to-electric-blue px-5 py-2.5 text-sm font-bold text-zinc-900"
            >
              선택 {selectedIds.size}명 일괄 제안 (데모) →
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
