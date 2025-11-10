"use client";

import { LessonLayout } from "@/components/layout/LessonLayout";
import { PracticeLesson } from "@/components/features/lessons/PracticeLesson";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";

export default function PracticePage() {
  const router = useRouter();
  const params = useParams();
  const lessonId = params.id as string;
  
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(3);
  const [isComplete, setIsComplete] = useState(false);

  const handleProgressChange = (current: number, total: number) => {
    setCurrentStep(current);
    setTotalSteps(total);
  };

  return (
    <LessonLayout
      title="Active Listening"
      subtitle="Practice Activity"
      currentStep={currentStep}
      totalSteps={totalSteps}
      onExit={() => router.push("/")}
      onNext={() => router.push(`/lesson/${lessonId}/unlock`)}
      showNextButton={isComplete}
      nextLabel="Complete Practice"
    >
      <PracticeLesson 
        lessonTitle="Active Listening"
        onProgressChange={handleProgressChange}
        onCompletionChange={setIsComplete}
      />
    </LessonLayout>
  );
}