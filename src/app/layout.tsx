import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { BrandAnalysisProvider } from "@/lib/brand-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "InfluenceHub | AI 마이크로 인플루언서 매칭",
  description: "브랜드 인스타그램 계정 분석 기반 AI 마이크로 인플루언서 자동 매칭",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="antialiased" suppressHydrationWarning>
      <body className="min-h-full bg-background text-zinc-100">
        <BrandAnalysisProvider>
          <div className="flex min-h-screen">
            <Navbar />
            <main className="ml-64 flex-1">{children}</main>
          </div>
        </BrandAnalysisProvider>
      </body>
    </html>
  );
}
