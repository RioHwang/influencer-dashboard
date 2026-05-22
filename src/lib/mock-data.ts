export type CampaignStatus = "진행 중" | "예정" | "완료" | "일시중지";

export interface Campaign {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  budget: number;
  status: CampaignStatus;
}

export interface Influencer {
  id: string;
  name: string;
  followers: number;
  category: string;
  engagementRate: number;
}

export interface MonthlyPerformance {
  month: string;
  reach: number;
  spend: number;
}

export const campaigns: Campaign[] = [
  {
    id: "1",
    name: "2026 봄 스킨케어 런칭",
    startDate: "2026-03-01",
    endDate: "2026-05-31",
    budget: 45_000_000,
    status: "진행 중",
  },
  {
    id: "2",
    name: "여름 선크림 체험단",
    startDate: "2026-05-15",
    endDate: "2026-07-15",
    budget: 28_000_000,
    status: "진행 중",
  },
  {
    id: "3",
    name: "K-뷰티 글로벌 인지도",
    startDate: "2026-06-01",
    endDate: "2026-08-31",
    budget: 62_000_000,
    status: "예정",
  },
  {
    id: "4",
    name: "블랙프라이데이 프로모션",
    startDate: "2025-11-01",
    endDate: "2025-11-30",
    budget: 35_000_000,
    status: "완료",
  },
  {
    id: "5",
    name: "신제품 언박싱 시리즈",
    startDate: "2026-02-01",
    endDate: "2026-04-30",
    budget: 18_500_000,
    status: "일시중지",
  },
];

export const influencers: Influencer[] = [
  {
    id: "1",
    name: "김하늘",
    followers: 842_000,
    category: "뷰티",
    engagementRate: 4.8,
  },
  {
    id: "2",
    name: "박지민",
    followers: 1_250_000,
    category: "라이프스타일",
    engagementRate: 3.2,
  },
  {
    id: "3",
    name: "이서연",
    followers: 520_000,
    category: "패션",
    engagementRate: 5.6,
  },
  {
    id: "4",
    name: "최민수",
    followers: 2_100_000,
    category: "푸드",
    engagementRate: 2.9,
  },
  {
    id: "5",
    name: "정유나",
    followers: 680_000,
    category: "뷰티",
    engagementRate: 6.1,
  },
  {
    id: "6",
    name: "한도윤",
    followers: 390_000,
    category: "테크",
    engagementRate: 4.2,
  },
  {
    id: "7",
    name: "오수진",
    followers: 1_580_000,
    category: "여행",
    engagementRate: 3.7,
  },
];

export const monthlyPerformance: MonthlyPerformance[] = [
  { month: "1월", reach: 1_200_000, spend: 8_500_000 },
  { month: "2월", reach: 1_450_000, spend: 9_200_000 },
  { month: "3월", reach: 1_680_000, spend: 11_000_000 },
  { month: "4월", reach: 1_920_000, spend: 12_500_000 },
  { month: "5월", reach: 2_150_000, spend: 14_200_000 },
  { month: "6월", reach: 1_780_000, spend: 10_800_000 },
];

export function getActiveCampaigns(): Campaign[] {
  return campaigns.filter((c) => c.status === "진행 중");
}

export function getDashboardSummary() {
  const activeCampaigns = getActiveCampaigns();
  const totalBudget = campaigns
    .filter((c) => c.status === "진행 중" || c.status === "예정")
    .reduce((sum, c) => sum + c.budget, 0);
  const totalReach = monthlyPerformance.reduce((sum, m) => sum + m.reach, 0);

  return {
    activeCampaignCount: activeCampaigns.length,
    totalBudget,
    totalReach,
  };
}

export function formatCurrency(amount: number): string {
  if (amount >= 100_000_000) {
    return `${(amount / 100_000_000).toFixed(1)}억원`;
  }
  if (amount >= 10_000) {
    return `${Math.round(amount / 10_000).toLocaleString("ko-KR")}만원`;
  }
  return `${amount.toLocaleString("ko-KR")}원`;
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(0)}K`;
  }
  return num.toLocaleString("ko-KR");
}

export function formatFollowers(count: number): string {
  return count.toLocaleString("ko-KR");
}

export function formatPeriod(start: string, end: string): string {
  const fmt = (d: string) => {
    const [y, m, day] = d.split("-");
    return `${y}.${m}.${day}`;
  };
  return `${fmt(start)} ~ ${fmt(end)}`;
}

export const statusStyles: Record<CampaignStatus, string> = {
  "진행 중": "bg-emerald-500/15 text-emerald-400 ring-emerald-500/30",
  예정: "bg-sky-500/15 text-sky-400 ring-sky-500/30",
  완료: "bg-zinc-500/15 text-zinc-400 ring-zinc-500/30",
  일시중지: "bg-amber-500/15 text-amber-400 ring-amber-500/30",
};
