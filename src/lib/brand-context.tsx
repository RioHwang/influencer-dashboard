"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  getAllRecommendations,
  mockAnalyzeBrand,
  type BrandAnalysisResult,
  type BrandInput,
  type MicroInfluencer,
} from "@/lib/mock-data";

type AnalysisStatus = "idle" | "loading" | "complete";

const EMPTY_INPUT: BrandInput = {
  brandName: "",
  homepageUrl: "",
  storeInfo: "",
  instagramId: "",
  youtubeId: "",
  tiktokId: "",
};

interface BrandContextValue {
  status: AnalysisStatus;
  brandInput: BrandInput;
  analysis: BrandAnalysisResult | null;
  selectedIds: Set<string>;
  setBrandInput: (patch: Partial<BrandInput>) => void;
  runAnalysis: () => Promise<void>;
  resetFlow: () => void;
  toggleSelect: (id: string) => void;
  clearSelection: () => void;
  getSelectedInfluencers: () => MicroInfluencer[];
}

const BrandContext = createContext<BrandContextValue | null>(null);

export function BrandAnalysisProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AnalysisStatus>("idle");
  const [brandInput, setBrandInputState] = useState<BrandInput>(EMPTY_INPUT);
  const [analysis, setAnalysis] = useState<BrandAnalysisResult | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const setBrandInput = useCallback((patch: Partial<BrandInput>) => {
    setBrandInputState((prev) => ({ ...prev, ...patch }));
  }, []);

  const runAnalysis = useCallback(async () => {
    const trimmed: BrandInput = {
      brandName: brandInput.brandName.trim(),
      homepageUrl: brandInput.homepageUrl.trim(),
      storeInfo: brandInput.storeInfo.trim(),
      instagramId: brandInput.instagramId.trim().replace(/^@/, ""),
      youtubeId: brandInput.youtubeId.trim().replace(/^@/, ""),
      tiktokId: brandInput.tiktokId.trim().replace(/^@/, ""),
    };

    if (!trimmed.brandName) return;
    const hasChannel =
      trimmed.instagramId || trimmed.youtubeId || trimmed.tiktokId;
    if (!hasChannel) return;

    setStatus("loading");
    setAnalysis(null);
    setSelectedIds(new Set());

    const result = await mockAnalyzeBrand(trimmed);
    setBrandInputState(trimmed);
    setAnalysis(result);
    setStatus("complete");
  }, [brandInput]);

  const resetFlow = useCallback(() => {
    setStatus("idle");
    setAnalysis(null);
    setSelectedIds(new Set());
  }, []);

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const clearSelection = useCallback(() => setSelectedIds(new Set()), []);

  const getSelectedInfluencers = useCallback(() => {
    const pool = getAllRecommendations(analysis?.persona ?? null);
    return pool.filter((i) => selectedIds.has(i.id));
  }, [analysis?.persona, selectedIds]);

  const value = useMemo(
    () => ({
      status,
      brandInput,
      analysis,
      selectedIds,
      setBrandInput,
      runAnalysis,
      resetFlow,
      toggleSelect,
      clearSelection,
      getSelectedInfluencers,
    }),
    [
      status,
      brandInput,
      analysis,
      selectedIds,
      setBrandInput,
      runAnalysis,
      resetFlow,
      toggleSelect,
      clearSelection,
      getSelectedInfluencers,
    ]
  );

  return (
    <BrandContext.Provider value={value}>{children}</BrandContext.Provider>
  );
}

export function useBrandAnalysis() {
  const ctx = useContext(BrandContext);
  if (!ctx) {
    throw new Error("useBrandAnalysis must be used within BrandAnalysisProvider");
  }
  return ctx;
}
