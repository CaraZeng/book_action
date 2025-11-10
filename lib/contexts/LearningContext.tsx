"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface LearningContextType {
  completedLessonIds: number[];
  completeLesson: (lessonId: number) => void;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export function LearningProvider({ children }: { children: ReactNode }) {
  const [completedLessonIds, setCompletedLessonIds] = useState<number[]>([1, 2]);

  const completeLesson = (lessonId: number) => {
    setCompletedLessonIds(prev => {
      if (!prev.includes(lessonId)) {
        return [...prev, lessonId];
      }
      return prev;
    });
  };

  return (
    <LearningContext.Provider value={{ completedLessonIds, completeLesson }}>
      {children}
    </LearningContext.Provider>
  );
}

export function useLearning() {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within LearningProvider');
  }
  return context;
}