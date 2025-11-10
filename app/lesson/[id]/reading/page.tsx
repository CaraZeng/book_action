"use client";

import { SidebarInset } from "@/components/ui/sidebar";
import { ReadingLesson } from "@/components/features/lessons/ReadingLesson";
import { useRouter, useParams } from "next/navigation";

export default function ReadingPage() {
  const router = useRouter();
  const params = useParams();
  const lessonId = params.id as string;

  // TODO: 从数据库获取课程标题
  const lessonTitle = "Active Listening";

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
          lessonTitle={lessonTitle}
          onExit={handleExit}
          onNext={handleNext}
        />
      </main>
    </SidebarInset>
  );
}