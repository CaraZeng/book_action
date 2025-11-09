"use client";

import { useState } from "react";
import { AppSidebar } from "./components/AppSidebar";
import { LearningRoadmap } from "./components/LearningRoadmap";
import { PracticeLesson } from "./components/PracticeLesson";
import { MedalsPage } from "./components/MedalsPage";
import { SidebarProvider } from "./components/ui/sidebar";

export default function App() {
  const [currentPage, setCurrentPage] = useState("learn");
  const [completedLessonIds, setCompletedLessonIds] = useState<number[]>([]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const handleStartLesson = (lessonTitle: string, lessonId: number) => {
    console.log(`Starting lesson: ${lessonTitle} (ID: ${lessonId})`);
    // 这里可以添加开始课程的逻辑
    // 例如：导航到课程页面，或打开课程对话框
  };

  const handleCompleteLesson = (lessonId: number) => {
    setCompletedLessonIds((prev) => [...prev, lessonId]);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar onNavigate={handleNavigate} currentPage={currentPage} />
        
        <main className="flex-1 overflow-auto">
          {currentPage === "learn" && (
            <LearningRoadmap
              onStartLesson={handleStartLesson}
              completedLessonIds={completedLessonIds}
            />
          )}
          {currentPage === "practice" && <PracticeLesson />}
          {currentPage === "medals" && <MedalsPage />}
        </main>
      </div>
    </SidebarProvider>
  );
}