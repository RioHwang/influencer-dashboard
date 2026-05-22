import {
  getActiveCampaigns,
  formatCurrency,
  formatPeriod,
  statusStyles,
} from "@/lib/mock-data";

export default function CampaignsPage() {
  const activeCampaigns = getActiveCampaigns();

  return (
    <div className="p-8">
      <header className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-50">
            캠페인 관리
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            마케팅 캠페인을 등록하고 집행 현황을 관리합니다
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-500"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          새 캠페인 등록
        </button>
      </header>

      <div className="mb-4 flex items-center gap-2 text-sm text-zinc-500">
        <span className="font-medium text-zinc-300">
          집행 중 {activeCampaigns.length}건
        </span>
      </div>

      <div className="space-y-3">
        {activeCampaigns.length === 0 ? (
          <p className="rounded-xl border border-dashed border-zinc-800 px-5 py-12 text-center text-sm text-zinc-500">
            현재 집행 중인 캠페인이 없습니다. 새 캠페인을 등록해 보세요.
          </p>
        ) : null}
        {activeCampaigns.map((campaign) => (
          <article
            key={campaign.id}
            className="flex items-center justify-between rounded-xl border border-zinc-800/80 bg-zinc-900/50 px-5 py-4 transition-colors hover:border-zinc-700/80 hover:bg-zinc-900/80"
          >
            <div className="min-w-0 flex-1">
              <h2 className="truncate font-semibold text-zinc-100">
                {campaign.name}
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                {formatPeriod(campaign.startDate, campaign.endDate)}
              </p>
            </div>

            <div className="mx-8 hidden text-right sm:block">
              <p className="text-sm font-medium text-zinc-300">
                {formatCurrency(campaign.budget)}
              </p>
              <p className="text-xs text-zinc-600">예산</p>
            </div>

            <span
              className={`inline-flex shrink-0 items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles[campaign.status]}`}
            >
              {campaign.status}
            </span>
          </article>
        ))}
      </div>
    </div>
  );
}
