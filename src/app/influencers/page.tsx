import { influencers, formatFollowers } from "@/lib/mock-data";

function EngagementBadge({ rate }: { rate: number }) {
  const color =
    rate >= 5
      ? "text-emerald-400"
      : rate >= 3.5
        ? "text-sky-400"
        : "text-zinc-400";

  return <span className={`font-medium ${color}`}>{rate.toFixed(1)}%</span>;
}

export default function InfluencersPage() {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-50">
          인플루언서
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          협업 인플루언서 풀과 참여율(ER)을 관리합니다
        </p>
      </header>

      <div className="overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/50">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-800/80 bg-zinc-900/80">
              <th className="px-5 py-3.5 font-medium text-zinc-400">이름</th>
              <th className="px-5 py-3.5 font-medium text-zinc-400">
                팔로워 수
              </th>
              <th className="px-5 py-3.5 font-medium text-zinc-400">
                주력 카테고리
              </th>
              <th className="px-5 py-3.5 text-right font-medium text-zinc-400">
                참여율 (ER)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            {influencers.map((influencer) => (
              <tr
                key={influencer.id}
                className="transition-colors hover:bg-zinc-800/30"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-600/20 text-sm font-semibold text-violet-300">
                      {influencer.name.charAt(0)}
                    </div>
                    <span className="font-medium text-zinc-100">
                      {influencer.name}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4 text-zinc-300">
                  {formatFollowers(influencer.followers)}
                </td>
                <td className="px-5 py-4">
                  <span className="inline-flex rounded-md bg-zinc-800/80 px-2.5 py-1 text-xs font-medium text-zinc-300 ring-1 ring-zinc-700/50">
                    {influencer.category}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <EngagementBadge rate={influencer.engagementRate} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-zinc-600">
        총 {influencers.length}명 · ER 5% 이상 우수 협업 후보
      </p>
    </div>
  );
}
