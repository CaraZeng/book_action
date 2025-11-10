"use client";

import { SidebarInset } from "@/components/ui/sidebar";
import { PageHeader } from "@/components/layout/PageHeader";
import { MedalsPage } from "@/components/features/achievements/MedalsPage";

export default function Medals() {
  return (
    <SidebarInset className="flex flex-col h-screen overflow-hidden">
      <PageHeader title="Medals & Achievements" />
      
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-2xl mx-auto">
            <MedalsPage />
          </div>
        </div>
      </main>
    </SidebarInset>
  );
}