export interface BrandPersona {
  target: string;
  mood: string;
  keywords: string[];
  summary: string;
}

export interface BrandAnalysisResult {
  instagramId: string;
  persona: BrandPersona;
  analyzedAt: string;
}

export interface MicroInfluencer {
  id: string;
  handle: string;
  displayName: string;
  followers: number;
  category: string;
  engagementRate: number;
  matchScore: number;
  avatarGradient: string;
}

const PERSONA_PRESETS: Record<string, BrandPersona> = {
  default: {
    target: "20대~초기 30대 여성",
    mood: "미니멀리즘 · 클린 뷰티",
    keywords: ["스킨케어", "데일리 루틴", "성분 안심", "자연광 촬영"],
    summary:
      "피드 톤은 화이트·베이지 기반의 정제된 비주얼이며, 제품 리뷰와 루틴 콘텐츠 비중이 높습니다. 팔로워 반응은 '성분', '민감성', '촉촉함' 키워드에 집중되어 마이크로 뷰티·웰니스 크리에이터와의 브랜디드 협업 적합도가 높습니다.",
  },
  fitness: {
    target: "20대~30대 헬스·웰니스 관심층",
    mood: "에너지틱 · 액티브 라이프",
    keywords: ["홈트", "단백질", "러닝", "회복 케어"],
    summary:
      "운동 전후 루틴과 바디케어 콘텐츠가 주력이며, 제품 노출은 실사용 장면 중심입니다. 팔로워 참여는 챌린지·인증샷 유형에서 강해 피트니스 마이크로 인플루언서 매칭에 최적화된 계정입니다.",
  },
  fashion: {
    target: "20대 여성 · 미니멀 패션 관심층",
    mood: "모던 캐주얼 · 데일리 OOTD",
    keywords: ["데일리룩", "가성비", "코디", "신상 리뷰"],
    summary:
      "OOTD·쇼핑 하울 비중이 높고 톤은 저채도 필터의 통일감이 특징입니다. 댓글에서 사이즈·소재 문의가 많아 패션·라이프스타일 마이크로 크리에이터와의 협업 전환이 기대됩니다.",
  },
};

export const microInfluencers: MicroInfluencer[] = [
  { id: "m1", handle: "@mini.beauty_jiyu", displayName: "지유", followers: 12_400, category: "뷰티", engagementRate: 6.8, matchScore: 98, avatarGradient: "from-pink-400 to-rose-500" },
  { id: "m2", handle: "@clean.skin_mio", displayName: "미오", followers: 8_600, category: "뷰티", engagementRate: 7.2, matchScore: 97, avatarGradient: "from-rose-300 to-pink-400" },
  { id: "m3", handle: "@velvet_lip", displayName: "벨벳립", followers: 14_600, category: "뷰티", engagementRate: 6.3, matchScore: 96, avatarGradient: "from-fuchsia-400 to-purple-500" },
  { id: "m4", handle: "@tea_and_toner", displayName: "티앤토너", followers: 7_400, category: "뷰티", engagementRate: 7.8, matchScore: 98, avatarGradient: "from-emerald-300 to-teal-400" },
  { id: "m5", handle: "@studio_nail_art", displayName: "네일아트소연", followers: 10_500, category: "뷰티", engagementRate: 5.9, matchScore: 94, avatarGradient: "from-violet-400 to-pink-400" },
  { id: "m6", handle: "@mom_beauty_diary", displayName: "맘뷰티일기", followers: 6_200, category: "뷰티", engagementRate: 8.1, matchScore: 95, avatarGradient: "from-amber-300 to-orange-400" },
  { id: "m7", handle: "@sora_fit_daily", displayName: "소라핏", followers: 18_200, category: "헬스/피트니스", engagementRate: 5.4, matchScore: 96, avatarGradient: "from-cyan-400 to-blue-500" },
  { id: "m8", handle: "@yoga_with_jia", displayName: "지아요가", followers: 15_300, category: "헬스/피트니스", engagementRate: 5.8, matchScore: 93, avatarGradient: "from-teal-400 to-emerald-500" },
  { id: "m9", handle: "@pilates_yeon", displayName: "연필라", followers: 22_100, category: "헬스/피트니스", engagementRate: 5.1, matchScore: 94, avatarGradient: "from-sky-400 to-indigo-500" },
  { id: "m10", handle: "@run_slow_min", displayName: "민조깅", followers: 19_700, category: "헬스/피트니스", engagementRate: 5.6, matchScore: 92, avatarGradient: "from-blue-400 to-cyan-500" },
  { id: "m11", handle: "@stretch_good_morning", displayName: "굿모닝스트레치", followers: 23_600, category: "헬스/피트니스", engagementRate: 4.8, matchScore: 91, avatarGradient: "from-lime-400 to-green-500" },
  { id: "m12", handle: "@fresh_salad_bowl", displayName: "샐러드보울", followers: 13_200, category: "헬스/피트니스", engagementRate: 5.2, matchScore: 90, avatarGradient: "from-green-400 to-emerald-500" },
  { id: "m13", handle: "@ootd_haneul", displayName: "하늘옷장", followers: 24_800, category: "패션", engagementRate: 4.9, matchScore: 94, avatarGradient: "from-slate-400 to-zinc-500" },
  { id: "m14", handle: "@daily_ribbon", displayName: "리본", followers: 28_400, category: "패션", engagementRate: 4.5, matchScore: 95, avatarGradient: "from-indigo-400 to-violet-500" },
  { id: "m15", handle: "@mono_closet", displayName: "모노클로젯", followers: 26_300, category: "패션", engagementRate: 4.1, matchScore: 93, avatarGradient: "from-gray-400 to-slate-600" },
  { id: "m16", handle: "@denim_days", displayName: "데님데이즈", followers: 29_100, category: "패션", engagementRate: 3.9, matchScore: 92, avatarGradient: "from-blue-500 to-indigo-600" },
  { id: "m17", handle: "@cafe_beige", displayName: "베이지카페", followers: 21_500, category: "라이프스타일", engagementRate: 4.2, matchScore: 91, avatarGradient: "from-amber-400 to-yellow-500" },
  { id: "m18", handle: "@home_cozy_lee", displayName: "이코지", followers: 9_800, category: "라이프스타일", engagementRate: 6.5, matchScore: 90, avatarGradient: "from-orange-300 to-amber-400" },
  { id: "m19", handle: "@weekend_travel_k", displayName: "주말여행K", followers: 17_900, category: "라이프스타일", engagementRate: 4.7, matchScore: 89, avatarGradient: "from-cyan-300 to-blue-400" },
  { id: "m20", handle: "@mens_groom_k", displayName: "케이그루밍", followers: 11_200, category: "뷰티/남성", engagementRate: 6.1, matchScore: 88, avatarGradient: "from-slate-500 to-zinc-700" },
];

export function resolvePersona(instagramId: string): BrandPersona {
  const id = instagramId.toLowerCase().replace("@", "");
  if (id.includes("fit") || id.includes("gym") || id.includes("sport")) {
    return PERSONA_PRESETS.fitness;
  }
  if (id.includes("fashion") || id.includes("wear") || id.includes("ootd")) {
    return PERSONA_PRESETS.fashion;
  }
  return PERSONA_PRESETS.default;
}

export function mockAnalyzeBrand(instagramId: string): Promise<BrandAnalysisResult> {
  const cleaned = instagramId.trim().replace(/^@/, "");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        instagramId: cleaned,
        persona: resolvePersona(cleaned),
        analyzedAt: new Date().toISOString(),
      });
    }, 2800);
  });
}

export function getRecommendedInfluencers(
  _persona?: BrandPersona | null
): MicroInfluencer[] {
  return [...microInfluencers]
    .filter((i) => i.followers >= 5_000 && i.followers <= 30_000)
    .sort((a, b) => b.matchScore - a.matchScore);
}

export function formatFollowers(count: number): string {
  return count.toLocaleString("ko-KR");
}

export function getMatchScoreColor(score: number): string {
  if (score >= 96) return "text-neon-green";
  if (score >= 92) return "text-electric-blue";
  return "text-zinc-400";
}
