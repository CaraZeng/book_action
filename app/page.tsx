"use client";

import { SidebarInset } from "@/components/ui/sidebar";
import { PageHeader } from "@/components/layout/PageHeader";
import { LearningRoadmap } from "@/components/features/learning/LearningRoadmap";
import { useLearning } from "@/lib/contexts/LearningContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { completedLessonIds } = useLearning();

  return (
    <SidebarInset className="flex flex-col h-screen overflow-hidden">
      <PageHeader title="Language Learning Path" />
      
      <main className="flex-1 overflow-y-auto">
        <div className="bg-gradient-to-b from-blue-50 to-white min-h-full">
          <div className="container mx-auto py-8 px-4">
            <div className="max-w-2xl mx-auto">
              <LearningRoadmap 
                onStartLesson={(title, id) => router.push(`/lesson/${id}/reading`)}
                onStartModule={(id, title) => router.push(`/module/${id}`)}
                completedLessonIds={completedLessonIds}
              />
            </div>
          </div>
        </div>
      </main>
    </SidebarInset>
  );
}