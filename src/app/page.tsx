import {
  getDashboardSummary,
  monthlyPerformance,
  formatCurrency,
  formatNumber,
} from "@/lib/mock-data";

function SummaryCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub: string;
  accent: "violet" | "emerald" | "sky";
}) {
  const accentMap = {
    violet: "from-violet-600/20 to-violet-900/10 ring-violet-500/20",
    emerald: "from-emerald-600/20 to-emerald-900/10 ring-emerald-500/20",
    sky: "from-sky-600/20 to-sky-900/10 ring-sky-500/20",
  };

  return (
    <div
      className={`rounded-xl bg-gradient-to-br p-5 ring-1 ${accentMap[accent]}`}
    >
      <p className="text-sm font-medium text-zinc-400">{label}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-50">
        {value}
      </p>
      <p className="mt-1 text-xs text-zinc-500">{sub}</p>
    </div>
  );
}

function MonthlyBarChart() {
  const maxReach = Math.max(...monthlyPerformance.map((m) => m.reach));

  return (
    <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-zinc-100">월별 성과</h2>
          <p className="mt-0.5 text-sm text-zinc-500">도달률 기준 (2026년 상반기)</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-zinc-500">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-violet-500" />
            도달률
          </span>
        </div>
      </div>

      <div className="flex h-56 items-end justify-between gap-3 px-2">
        {monthlyPerformance.map((item) => {
          const heightPercent = Math.round((item.reach / maxReach) * 100);

          return (
            <div
              key={item.month}
              className="group flex flex-1 flex-col items-center gap-2"
            >
              <div className="relative flex h-48 w-full items-end justify-center">
                <div
                  className="w-full max-w-12 rounded-t-md bg-gradient-to-t from-violet-700 to-violet-400 transition-all duration-300 group-hover:from-violet-600 group-hover:to-violet-300"
                  style={{ height: `${heightPercent}%` }}
                  title={`${formatNumber(item.reach)} 도달`}
                />
              </div>
              <span className="text-xs font-medium text-zinc-400">
                {item.month}
              </span>
              <span className="text-[10px] text-zinc-600 group-hover:text-zinc-400">
                {formatNumber(item.reach)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const summary = getDashboardSummary();

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-50">
          대시보드
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          캠페인 성과와 핵심 지표를 한눈에 확인하세요
        </p>
      </header>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard
          label="진행 중인 캠페인"
          value={`${summary.activeCampaignCount}건`}
          sub="현재 집행 중"
          accent="violet"
        />
        <SummaryCard
          label="총 지출 예산"
          value={formatCurrency(summary.totalBudget)}
          sub="진행·예정 캠페인 합계"
          accent="emerald"
        />
        <SummaryCard
          label="총 도달률"
          value={formatNumber(summary.totalReach)}
          sub="상반기 누적 도달"
          accent="sky"
        />
      </div>

      <MonthlyBarChart />
    </div>
  );
}
