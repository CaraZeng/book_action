"use client";

import { useState, useEffect, useRef } from "react";
import { SidebarProvider, SidebarInset } from "./components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import { LearningRoadmap } from "./components/LearningRoadmap";
import { MedalsPage } from "./components/MedalsPage";
import { ModuleIntro } from "./components/ModuleIntro";
import { ReadingLesson } from "./components/ReadingLesson";
import { PracticeLesson } from "./components/PracticeLesson";
import { UnlockLesson } from "./components/UnlockLesson";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("learn");
  const [selectedModule, setSelectedModule] = useState<{ id: number; title: string } | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<{ title: string; id: number } | null>(null);
  const [lessonStep, setLessonStep] = useState<"module-intro" | "reading" | "practice" | "unlock">("module-intro");
  const [completedLessonIds, setCompletedLessonIds] = useState<number[]>([1, 2]);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [currentPage]);

  // 点击模块 - 显示 Module Intro
  const handleStartModule = (moduleId: number, moduleTitle: string) => {
    setSelectedModule({ id: moduleId, title: moduleTitle });
    setLessonStep("module-intro");
    setCurrentPage("module-intro");
  };

  // 从 Module Intro 开始第一个 Lesson
  const handleStartFirstLesson = (lessonTitle: string, lessonId: number) => {
    setSelectedLesson({ title: lessonTitle, id: lessonId });
    setLessonStep("reading");
    setCurrentPage("lesson");
  };

  // 点击 Lesson（已解锁的）
  const handleStartLesson = (lessonTitle: string, lessonId: number) => {
    setSelectedLesson({ title: lessonTitle, id: lessonId });
    setLessonStep("reading");
    setCurrentPage("lesson");
  };

  const handleExitLesson = () => {
    setSelectedLesson(null);
    setLessonStep("reading");
    setCurrentPage("learn");
  };

  const handleExitModuleIntro = () => {
    setSelectedModule(null);
    setCurrentPage("learn");
  };

  const handleNextFromReading = () => {
    setLessonStep("practice");
  };

  const handleNextFromPractice = () => {
    setLessonStep("unlock");
  };

  const handleUnlockNextLesson = () => {
    if (selectedLesson) {
      setCompletedLessonIds(prev => [...prev, selectedLesson.id]);
    }
    setSelectedLesson(null);
    setLessonStep("reading");
    setCurrentPage("learn");
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar onNavigate={setCurrentPage} currentPage={currentPage} />
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        {currentPage !== "lesson" && currentPage !== "module-intro" && (
          <header className="flex items-center gap-3 border-b bg-white/70 px-6 py-4 backdrop-blur flex-shrink-0 z-10">
            <h1 className="text-center">Language Learning Path</h1>
          </header>
        )}
        
        <main ref={mainRef} className="flex-1 overflow-y-auto">
          {/* Learning Roadmap */}
          {currentPage === "learn" && (
            <div className="bg-gradient-to-b from-blue-50 to-white min-h-full">
              <div className="container mx-auto py-8 px-4">
                <div className="max-w-2xl mx-auto">
                  <LearningRoadmap 
                    onStartLesson={handleStartLesson}
                    onStartModule={handleStartModule}
                    completedLessonIds={completedLessonIds}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Module Intro Page */}
          {currentPage === "module-intro" && selectedModule && (
            <ModuleIntro
              moduleTitle={selectedModule.title}
              context={`Welcome to ${selectedModule.title}!

In this module, you'll explore the essential skills for effective communication and setting healthy boundaries in relationships.

Communication is more than just words - it's about understanding, empathy, and connection. You'll learn how to express yourself clearly while truly listening to others.

Setting boundaries is an act of self-respect and care. You'll discover how to protect your time, energy, and emotional well-being while maintaining strong relationships.

Through real-world scenarios and interactive practice, you'll develop the confidence to navigate challenging conversations and create healthier, more fulfilling connections.

Let's begin this transformative journey together!`}
              mediaUrl="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&q=80"
              mediaType="image"
              onStart={() => {
                // TODO: Get first lesson of this module
                handleStartFirstLesson("Active Listening", 10);
              }}
              onExit={handleExitModuleIntro}
            />
          )}

          {/* Medals Page */}
          {currentPage === "medals" && <MedalsPage />}

          {/* Lesson Pages */}
          {currentPage === "lesson" && selectedLesson && (
            <>
              {lessonStep === "reading" && (
                <ReadingLesson 
                  lessonTitle={selectedLesson.title}
                  onExit={handleExitLesson}
                  onNext={handleNextFromReading}
                />
              )}
              {lessonStep === "practice" && (
                <PracticeLesson 
                  lessonTitle={selectedLesson.title}
                  onExit={handleExitLesson}
                  onNext={handleNextFromPractice}
                />
              )}
              {lessonStep === "unlock" && (
                <UnlockLesson 
                  lessonTitle={selectedLesson.title}
                  onUnlock={handleUnlockNextLesson}
                />
              )}
            </>
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}