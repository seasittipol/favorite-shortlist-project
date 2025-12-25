"use client";

import ResortPage from "@/features/resorts/components/ResortPage";
import { ResortProvider } from "@/features/resorts/hook/useResort";

export default function ResortsPage() {
  return (
    <ResortProvider>
      <ResortPage />
    </ResortProvider>
  );
}
