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
  mockAnalyzeBrand,
  type BrandAnalysisResult,
  type MicroInfluencer,
} from "@/lib/mock-data";

type AnalysisStatus = "idle" | "loading" | "complete";

interface BrandContextValue {
  status: AnalysisStatus;
  analysis: BrandAnalysisResult | null;
  selectedIds: Set<string>;
  runAnalysis: (instagramId: string) => Promise<void>;
  toggleSelect: (id: string) => void;
  clearSelection: () => void;
  getSelectedInfluencers: (pool: MicroInfluencer[]) => MicroInfluencer[];
}

const BrandContext = createContext<BrandContextValue | null>(null);

export function BrandAnalysisProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AnalysisStatus>("idle");
  const [analysis, setAnalysis] = useState<BrandAnalysisResult | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const runAnalysis = useCallback(async (instagramId: string) => {
    if (!instagramId.trim()) return;
    setStatus("loading");
    setAnalysis(null);
    const result = await mockAnalyzeBrand(instagramId);
    setAnalysis(result);
    setStatus("complete");
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

  const getSelectedInfluencers = useCallback(
    (pool: MicroInfluencer[]) => pool.filter((i) => selectedIds.has(i.id)),
    [selectedIds]
  );

  const value = useMemo(
    () => ({
      status,
      analysis,
      selectedIds,
      runAnalysis,
      toggleSelect,
      clearSelection,
      getSelectedInfluencers,
    }),
    [
      status,
      analysis,
      selectedIds,
      runAnalysis,
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
