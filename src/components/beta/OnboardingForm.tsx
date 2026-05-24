"use client";

import { useBrandAnalysis } from "@/lib/brand-context";

function Field({
  id,
  label,
  hint,
  required,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-zinc-300">
        {label}
        {required ? <span className="ml-1 text-neon-green">*</span> : null}
      </label>
      {hint ? <p className="mb-2 text-xs text-zinc-500">{hint}</p> : null}
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue focus:outline-none disabled:opacity-60";

export default function OnboardingForm() {
  const { brandInput, setBrandInput, runAnalysis, status } = useBrandAnalysis();
  const disabled = status === "loading";

  const hasChannel =
    brandInput.instagramId.trim() ||
    brandInput.youtubeId.trim() ||
    brandInput.tiktokId.trim();
  const canSubmit = brandInput.brandName.trim() && hasChannel && !disabled;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void runAnalysis();
      }}
      className="relative overflow-hidden rounded-2xl border border-surface-border bg-surface p-6 shadow-[0_0_40px_-12px_rgba(57,255,136,0.12)]"
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-neon-green/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-electric-blue/5 blur-3xl" />

      <div className="relative grid gap-5 md:grid-cols-2">
        <Field id="brandName" label="브랜드명" required>
          <input
            id="brandName"
            type="text"
            value={brandInput.brandName}
            onChange={(e) => setBrandInput({ brandName: e.target.value })}
            placeholder="예: 라온 스킨케어"
            disabled={disabled}
            className={inputClass}
          />
        </Field>

        <Field id="homepageUrl" label="홈페이지 URL">
          <input
            id="homepageUrl"
            type="url"
            value={brandInput.homepageUrl}
            onChange={(e) => setBrandInput({ homepageUrl: e.target.value })}
            placeholder="https://your-brand.com"
            disabled={disabled}
            className={inputClass}
          />
        </Field>

        <div className="md:col-span-2">
          <Field
            id="storeInfo"
            label="매장 정보"
            hint="위치, 업종, 시그니처 메뉴·상품 등 AI가 참고할 정보를 입력하세요."
          >
            <textarea
              id="storeInfo"
              rows={3}
              value={brandInput.storeInfo}
              onChange={(e) => setBrandInput({ storeInfo: e.target.value })}
              placeholder="예: 서울 성수동 · 클린 뷰티 플래그십 · 저자극 스킨케어 전문"
              disabled={disabled}
              className={`${inputClass} resize-none`}
            />
          </Field>
        </div>

        <Field id="instagramId" label="인스타그램 계정 ID">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">@</span>
            <input
              id="instagramId"
              type="text"
              value={brandInput.instagramId}
              onChange={(e) => setBrandInput({ instagramId: e.target.value })}
              placeholder="brand_official"
              disabled={disabled}
              className={`${inputClass} pl-9`}
            />
          </div>
        </Field>

        <Field id="youtubeId" label="유튜브 채널 ID">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">@</span>
            <input
              id="youtubeId"
              type="text"
              value={brandInput.youtubeId}
              onChange={(e) => setBrandInput({ youtubeId: e.target.value })}
              placeholder="brand_channel"
              disabled={disabled}
              className={`${inputClass} pl-9`}
            />
          </div>
        </Field>

        <div className="md:col-span-2">
          <Field id="tiktokId" label="틱톡 계정 ID">
            <div className="relative max-w-md">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">@</span>
              <input
                id="tiktokId"
                type="text"
                value={brandInput.tiktokId}
                onChange={(e) => setBrandInput({ tiktokId: e.target.value })}
                placeholder="brand.tiktok"
                disabled={disabled}
                className={`${inputClass} pl-9`}
              />
            </div>
          </Field>
        </div>
      </div>

      <div className="relative mt-6 flex flex-col gap-3 border-t border-surface-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-zinc-500">
          <span className="text-neon-green">*</span> 브랜드명 + SNS 계정 1개 이상 필수 · 베타는
          Mock AI 시뮬레이션입니다
        </p>
        <button
          type="submit"
          disabled={!canSubmit}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-neon-green to-electric-blue px-10 py-4 font-bold text-zinc-900 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          </svg>
          분석 시작
        </button>
      </div>
    </form>
  );
}
