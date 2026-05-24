"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import RecommendationTable from "@/components/beta/RecommendationTable";
import { useBrandAnalysis } from "@/lib/brand-context";

export default function InfluencersPage() {
  const router = useRouter();
  const { status, analysis } = useBrandAnalysis();

  useEffect(() => {
    if (status === "idle") {
      router.replace("/");
    }
  }, [status, router]);

  if (status !== "complete" || !analysis) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-8 text-center">
        <h2 className="text-xl font-bold text-zinc-100">
          먼저 브랜드 분석을 완료해 주세요
        </h2>
        <p className="mt-2 max-w-md text-sm text-zinc-500">
          홈 화면에서 브랜드 정보를 입력하고 분석을 시작하면 추천 리스트를 볼 수
          있습니다.
        </p>
        <Link
          href="/"
          className="mt-6 rounded-xl bg-gradient-to-r from-neon-green to-electric-blue px-6 py-3 text-sm font-bold text-zinc-900"
        >
          베타 데모 시작하기
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8">
      <RecommendationTable />
    </div>
  );
}
