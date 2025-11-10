"use client";

import { SidebarInset } from "@/components/ui/sidebar";
import { ReadingLesson } from "@/components/features/lessons/ReadingLesson";
import { useRouter, useParams } from "next/navigation";
import { module1Data, getConcept } from "@/lib/data/modules";

export default function ReadingPage() {
  const router = useRouter();
  const params = useParams();
  const lessonId = parseInt(params.id as string);

  // 根据 lessonId 获取对应的 concept
  const concept = getConcept(module1Data, lessonId);

  if (!concept) {
    return (
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        <main className="flex-1 flex items-center justify-center">
          <p className="text-red-500">Lesson not found</p>
        </main>
      </SidebarInset>
    );
  }

  const handleExit = () => {
    router.push("/");
  };

  const handleNext = () => {
    router.push(`/lesson/${lessonId}/practice`);
  };

  return (
    <SidebarInset className="flex flex-col h-screen overflow-hidden">
      <main className="flex-1 overflow-y-auto">
        <ReadingLesson 
          concept={concept}
          onExit={handleExit}
          onNext={handleNext}
        />
      </main>
    </SidebarInset>
  );
}